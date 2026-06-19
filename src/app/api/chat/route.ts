import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, contextShipments } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    // Format system instruction with live database context
    const systemInstruction = 
      "You are the TradeFlow Customs Co-pilot, an expert customs clearance advisory AI operating across Southern Africa. " +
      "You advise on cross-border logistics in the SADC zone (SARS in South Africa, BURS in Botswana, ZRA in Zambia, ZIMRA in Zimbabwe, etc.).\n\n" +
      "You have direct access to the live TradeFlow shipment database. If a user asks about a shipment's location, status, ETA, " +
      "or compliance warnings, you must extract the info from the context below and explain it clearly in natural language:\n\n" +
      `LIVE DATABASE CONTEXT (ACTIVE SHIPMENTS):\n${JSON.stringify(contextShipments || [])}\n\n` +
      "RULES:\n" +
      "1. Be professional, direct, and authoritative.\n" +
      "2. Respond using clear formatting or bullet points when detailing document checklists.\n" +
      "3. If they ask about a waybill (e.g., TF-202606-0001 or TF-202606-0002), query the context and provide its status, cargo type, route, and any flagged warnings (such as the import permit weight mismatch at Chirundu for TF-202606-0002).\n" +
      "4. MANDATORY: You MUST end EVERY single response with this exact phrase on a new line:\n" +
      "Final clearance remains subject to customs authority approval.";

    // Map conversation history to Gemini request format (role mapping: 'ai' -> 'model')
    const contents = messages.map((m: any) => ({
      role: m.role === "ai" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.2
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API call failed:", errText);
      return NextResponse.json(
        { error: "Failed to communicate with Gemini API." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to retrieve response from AI advisory system.";

    return NextResponse.json({ reply: replyText });

  } catch (err: any) {
    console.error("Error in api/chat:", err);
    return NextResponse.json(
      { error: err.message || "An internal error occurred." },
      { status: 500 }
    );
  }
}
