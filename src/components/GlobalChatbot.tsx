"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export function GlobalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I am the DFS Customs Assistant. Need help with tariffs, cross-border compliance, or tracking?' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");

    // Simulate AI thinking and response
    setTimeout(() => {
      let aiResponse = "I can definitely help with that. Could you provide a bit more detail? (Note: Final clearance is always subject to customs authority approval.)";
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes('document') || lowerInput.includes('import')) {
        aiResponse = "To import goods into Southern Africa, you generally need:\n\n• Commercial Invoice\n• Packing List\n• Bill of Lading\n• Import Permit\n\nEnsure all descriptions match perfectly.";
      } else if (lowerInput.includes('track') || lowerInput.includes('shipment') || lowerInput.includes('where')) {
        aiResponse = "You can track your active shipments in our Tracking Portal. Would you like me to redirect you to the tracking page?";
      } else if (lowerInput.includes('quote') || lowerInput.includes('cost') || lowerInput.includes('price')) {
        aiResponse = "You can request a competitive regional pricing quote via our Quote Request system. Our team usually responds within 24 hours.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-dfs-navy text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-dfs-gold hover:scale-105 transition-all"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] bg-white border border-gray-200 shadow-2xl flex flex-col rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dfs-navy text-white p-4 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-dfs-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">DFS Support Agent</h3>
                  <div className="text-[10px] text-dfs-gold font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-dfs-navy text-white'}`}>
                    {msg.role === 'user' ? 'U' : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 text-sm max-w-[80%] rounded-lg shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-dfs-navy text-white rounded-tr-none' : 'bg-white border border-gray-100 text-slate-700 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-full pr-1 pl-4 py-1">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-dfs-navy outline-none"
                />
                <button 
                  type="submit" 
                  className="w-8 h-8 rounded-full bg-dfs-navy text-white flex items-center justify-center hover:bg-dfs-gold transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
