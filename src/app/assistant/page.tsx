"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Upload, ShieldCheck, AlertCircle, Bot, CornerDownLeft, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "ai" | "user";
  content: string;
  isCustomsFlag?: boolean;
}

const SAMPLE_QUESTIONS = [
  "What documents are required for importation?",
  "What is a packing list?",
  "How long does customs clearance take?",
  "What documents are needed for transit cargo?",
];

const RESPONSE_MAP: Record<string, string> = {
  "what documents are required for importation?": 
    "To import goods into Southern African countries, you must provide a standard set of compliance documents to the relevant revenue authority (such as SARS in South Africa or BURS in Botswana):\n\n" +
    "1. **Commercial Invoice**: Detailing the seller, buyer, transaction value, and detailed goods description.\n" +
    "2. **Packing List**: Specifying the exact packing configurations, net/gross weights, and packaging marks.\n" +
    "3. **Bill of Lading / Air Waybill**: Proof of carriage and ownership transfer.\n" +
    "4. **Import Permit**: Required for controlled, agricultural, or regulated goods.\n" +
    "5. **Certificate of Origin**: Essential for claiming preferential tariff rates under trade agreements like SADC or AfCFTA.\n\n" +
    "Discrepancies between these documents (such as differing weights or values) are the #1 cause of border delays.\n\n" +
    "Final clearance remains subject to customs authority approval.",

  "what is a packing list?": 
    "A **Packing List** is a formal logistics document that accompanies the Commercial Invoice. It provides detailed information about the physical package contents of a shipment, including:\n\n" +
    "• **Net and Gross Weight** of each package and the entire shipment.\n" +
    "• **Dimensions and Packaging Type** (e.g., pallets, crates, drums).\n" +
    "• **Specific Item Breakdown** per container/carton (HS Codes can be linked here).\n" +
    "• **Shipping Marks and Numbers** printed on the physical cargo.\n\n" +
    "Customs officers use the packing list during physical inspections to quickly locate and verify specific items in a cargo hold without unloading the entire vehicle.\n\n" +
    "Final clearance remains subject to customs authority approval.",

  "how long does customs clearance take?": 
    "Customs clearance times vary significantly depending on the border post, transport corridor, and pre-filing status:\n\n" +
    "• **Pre-Cleared Shipments**: 2 to 4 hours. By submitting documents digitally through DFS-OS before arrival, customs clearance is often pre-approved.\n" +
    "• **Standard Cross-Border (e.g., Kopfontein / Ramatlabama)**: 4 to 12 hours under normal conditions.\n" +
    "• **High-Traffic Corridors (e.g., Chirundu / Beitbridge)**: 12 to 36 hours. Physical inspections, weight bridge queues, or cargo scanners can extend this time.\n\n" +
    "To ensure the fastest turnaround, we recommend utilizing SADC SADC-preferential clearance and submitting digital OCR-verified documents 48 hours in advance.\n\n" +
    "Final clearance remains subject to customs authority approval.",

  "what documents are needed for transit cargo?": 
    "Transit cargo—goods passing through a country (like South Africa) to reach a final landlocked destination (like Zambia or Zimbabwe)—is subject to strict customs control to prevent local market dumping. You require:\n\n" +
    "1. **T1 Transit Document**: Declaring the cargo is in transit across the territory.\n" +
    "2. **Customs Road Transit Bond (Guarantee)**: A financial bond matching the potential duties, held by the carrier or clearing agent to guarantee the goods exit the country.\n" +
    "3. **SAD 500 (Customs Declaration)**: Stamped at both the entry border and exit border to close the transit loop.\n" +
    "4. **Standard Invoices and Consignment Notes**: Proving origin, destination, and ownership.\n\n" +
    "DFS handles bond management automatically for all contracted transit movements.\n\n" +
    "Final clearance remains subject to customs authority approval."
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "ai", 
      content: "Welcome to the DFS Customs Co-pilot. I am specialized in SADC trade corridor compliance, customs clearance procedures, and tariff code auditing. Let me know what you are shipping or pick a question below." 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);

    const query = text.toLowerCase().trim().replace(/[?.]/g, "");

    // Mock API delay
    setTimeout(() => {
      let matchedResponse = "";
      
      // Attempt exact or partial match
      const matchingKey = Object.keys(RESPONSE_MAP).find(key => 
        query.includes(key.replace(/[?.]/g, "")) || key.replace(/[?.]/g, "").includes(query)
      );

      if (matchingKey) {
        matchedResponse = RESPONSE_MAP[matchingKey];
      } else {
        matchedResponse = 
          `I've noted your query regarding "${text}". Our regional customs agents operate 24/7 across Southern Africa and can review your specific cargo details to advise on tariff codes, customs duties, and required permits. \n\n` +
          `To proceed, please upload your Commercial Invoice or Packing List to the [Document Center](/documents) for automated compliance scanning.\n\n` +
          `Final clearance remains subject to customs authority approval.`;
      }

      setMessages(prev => [...prev, { role: "ai", content: matchedResponse }]);
      setLoading(false);
    }, 900);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSend(input);
    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      {/* Page Header */}
      <section className="bg-[#0B1F3A] text-white pt-28 pb-12 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#D4A017] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" /> DFS AI Co-pilot
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">Customs Advisory & Compliance</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl font-light">
                Leverage automated customs intelligence for regional border processing, tariff matching, and documentation requirements.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 text-xs text-slate-300 rounded-sm">
              <ShieldCheck className="w-5 h-5 text-[#D4A017] shrink-0" />
              <div>
                <div className="font-bold text-white uppercase tracking-wider">SARS & BURS Compliant</div>
                <div>Automated regulatory updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            
            {/* Left sidebar: Suggested actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-4 h-4 text-[#D4A017]" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F3A]">Suggested Questions</h3>
                </div>
                <div className="space-y-3">
                  {SAMPLE_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      disabled={loading}
                      className="w-full text-left p-3 text-xs bg-slate-50 hover:bg-slate-100 hover:text-[#0B1F3A] border border-gray-200 font-medium text-slate-600 transition-colors flex items-start gap-2 focus:outline-none focus:ring-1 focus:ring-[#D4A017]"
                    >
                      <span className="text-[#D4A017] font-bold shrink-0">•</span>
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0B1F3A] text-white p-6 shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-5"><Bot className="w-32 h-32" /></div>
                <h4 className="font-bold text-[#D4A017] text-sm mb-2">Automated Audit</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Upload trade documents and let DFS-OS parse classifications and flag mismatches automatically before arrival.
                </p>
                <a 
                  href="/documents" 
                  className="inline-flex items-center gap-2 bg-[#D4A017] text-white px-4 py-2 text-xs font-bold hover:bg-yellow-500 transition-all uppercase tracking-wider"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Forms
                </a>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 flex flex-col bg-white border border-gray-200 shadow-md min-h-[550px] max-h-[650px] relative">
              
              {/* Chat Status Bar */}
              <div className="px-6 py-4 border-b border-gray-150 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#0B1F3A] text-white flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#D4A017]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0B1F3A]">DFS Compliance Advisor</div>
                    <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> System Ready
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-mono hidden sm:block">DFS-OS AI Agent v1.2</div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-slate-200 text-[#0B1F3A] font-bold text-xs" : "bg-[#0B1F3A] text-white"}`}>
                        {msg.role === "user" ? "YOU" : <Bot className="w-4.5 h-4.5 text-[#D4A017]" />}
                      </div>
                      
                      <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                        <div className={`p-4 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-[#0B1F3A] text-white" : "bg-white border border-gray-150 text-slate-800"}`}>
                          {msg.content}
                        </div>
                        {msg.role === "ai" && idx > 0 && (
                          <div className="mt-2 text-[10px] font-bold text-amber-600 flex items-center gap-1 uppercase tracking-wider bg-amber-50 px-2 py-0.5 border border-amber-200">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Subject to customs approval</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-4"
                    >
                      <div className="w-8 h-8 bg-[#0B1F3A] text-white flex items-center justify-center shrink-0">
                        <Bot className="w-4.5 h-4.5 text-[#D4A017]" />
                      </div>
                      <div className="bg-white border border-gray-150 p-4 shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleFormSubmit} className="p-4 bg-slate-50 border-t border-gray-200">
                <div className="flex items-center gap-3 bg-white border border-gray-300 p-2 shadow-inner">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about customs clearing, HS codes, documentation or SADC regulations..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-[#0B1F3A] outline-none pl-3 placeholder:text-slate-400 font-medium"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 bg-[#0B1F3A] text-white font-bold hover:bg-[#D4A017] transition-all flex items-center gap-2 shrink-0 disabled:opacity-40"
                  >
                    <span>Ask AI</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                  DFS customs database updated daily. Always double check compliance criteria.
                </div>
              </form>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
