import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fileName, category, waybill } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const systemInstruction = 
      "You are the DFS OCR Compliance Auditor, an automated AI agent inspecting cargo clearance documents " +
      "uploaded to the DFS Operations Platform. Your job is to perform a simulated OCR audit of SADC trade forms.\n\n" +
      "You will receive a document's filename, category, and linked waybill.\n" +
      "GUIDELINES:\n" +
      "1. Determine if the document should pass inspection or be flagged.\n" +
      "2. You MUST FLAG the document if:\n" +
      "   - The filename contains keywords like 'mismatch', 'flagged', 'error', 'incomplete', 'pending', or 'failed'.\n" +
      "   - The category is 'Import Permit' and the waybill is 'DFS-202606-0002' (which is the Lusaka-Harare heavy machinery haul flagged for weight mismatch).\n" +
      "3. If flagged, generate a realistic, detailed discrepancy warning (e.g., weight mismatch between invoice and permit, missing consignee VAT, expired import license).\n" +
      "4. Otherwise, approve the document and generate a professional approval log confirming SADC exporters checks, value matching, and clean OCR scan.\n" +
      "5. MANDATORY: You must return a JSON response with exactly this format (do not include markdown wrapping or other text):\n" +
      "{\n" +
      "  \"status\": \"Approved\" | \"Flagged\" | \"Under Review\",\n" +
      "  \"statusText\": \"A detailed 1-2 sentence audit explanation. Final clearance remains subject to customs authority approval.\"\n" +
      "}\n" +
      "Make sure the 'statusText' always ends with the phrase 'Final clearance remains subject to customs authority approval.'";

    const promptText = 
      `Document Metadata to Audit:\n` +
      `- Filename: ${fileName}\n` +
      `- Category: ${category}\n` +
      `- Linked Waybill: ${waybill}\n`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: promptText }]
          }],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API call failed:", errText);
      return NextResponse.json(
        { status: "Under Review", statusText: "Awaiting manual customs agent validation. Final clearance remains subject to customs authority approval." }
      );
    }

    const data = await response.json();
    const replyJSON = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (replyJSON) {
      try {
        const parsed = JSON.parse(replyJSON);
        return NextResponse.json(parsed);
      } catch (e) {
        console.error("Failed to parse JSON reply from Gemini:", replyJSON);
      }
    }

    return NextResponse.json({
      status: "Approved",
      statusText: "OCR verification completed successfully. SADC concession valid. Final clearance remains subject to customs authority approval."
    });

  } catch (err: any) {
    console.error("Error in api/analyze-doc:", err);
    return NextResponse.json(
      { error: err.message || "An internal error occurred." },
      { status: 500 }
    );
  }
}
