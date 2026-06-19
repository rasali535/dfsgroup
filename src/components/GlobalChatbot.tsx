"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { useLogistics } from "@/components/LogisticsProvider";

export function GlobalChatbot() {
  const { shipments } = useLogistics();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I am the DFS Customs Assistant. Need help with tariffs, cross-border compliance, or tracking?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const updatedMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages,
          contextShipments: shipments
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact advisory network");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "Error: Unable to connect to the DFS advisory network. Please check your connection.\n\nFinal clearance remains subject to customs authority approval." 
      }]);
    } finally {
      setLoading(false);
    }
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
              {loading && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-dfs-navy text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-100 p-3 shadow-sm rounded-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
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
