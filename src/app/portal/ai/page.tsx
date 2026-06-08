"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Upload, ShieldCheck, AlertCircle, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function PortalAIPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello. I am the DFS Customs Assistant. I can help you verify documents, calculate estimated tariffs, and navigate cross-border compliance across Southern Africa. How can I assist you today?' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");

    // Simulate AI thinking and response
    setTimeout(() => {
      let aiResponse = "I can help with that. Final clearance is subject to customs authority approval.";
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes('document') || lowerInput.includes('import')) {
        aiResponse = "To import goods into Southern Africa, you generally need the following documents:\n\n• Commercial Invoice\n• Packing List\n• Bill of Lading / Air Waybill\n• Import Permit (if required)\n• Certificate of Origin (if applicable)\n\nEnsure all documents match perfectly (e.g. weights, descriptions). Final clearance is subject to customs authority approval.";
      } else if (lowerInput.includes('invoice') || lowerInput.includes('review')) {
        aiResponse = "I can review that for you. If you upload the Commercial Invoice, I will scan it via OCR to ensure the Consignee VAT Number is present and the HS Codes match the cargo description.\n\nFinal clearance is subject to customs authority approval.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-dfs-light">
      <div className="flex-1 flex overflow-hidden container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 gap-6">
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white border border-gray-200 shadow-xl shadow-dfs-navy/5">
          <div className="p-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-dfs-navy flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 text-dfs-gold" />
              </div>
              <div>
                <h2 className="font-bold text-dfs-navy">DFS AI Assistant</h2>
                <div className="text-xs text-emerald-500 font-bold tracking-wider uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-slate-200 text-slate-600 font-bold text-xs' : 'bg-dfs-navy text-dfs-gold'}`}>
                  {msg.role === 'user' ? 'YOU' : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 text-sm max-w-[80%] leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-dfs-navy text-white' : 'bg-slate-50 border border-gray-200 text-slate-700'}`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSend} className="p-4 bg-slate-50 border-t border-gray-200">
            <div className="flex items-center gap-2 bg-white border border-gray-300 p-2 shadow-inner">
              <button type="button" className="p-2 text-dfs-navy hover:text-dfs-gold transition-colors">
                <Upload className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about documents, tariffs, or compliance..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-dfs-navy outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="px-6 py-2 bg-dfs-navy text-white font-bold hover:bg-dfs-gold transition-colors shadow-md">
                Send
              </button>
            </div>
          </form>
        </div>
        
        {/* Sidebar Context */}
        <div className="hidden lg:flex w-80 flex-col gap-6">
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold mb-4 text-dfs-navy uppercase tracking-wider text-xs">Supported Regions</h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-dfs-gold"></div>Botswana (BURS)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-dfs-gold"></div>South Africa (SARS)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-dfs-gold"></div>Zambia (ZRA)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-dfs-gold"></div>Zimbabwe (ZIMRA)</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
