"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="bg-dfs-navy text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Get In Touch</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">Contact TradeFlow OS</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Our regional logistics experts are ready to assist you. Reach out today for quotes, support, or partnership inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-dfs-light flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white border border-gray-100 p-10 shadow-xl shadow-dfs-navy/5"
            >
              <h2 className="text-3xl font-extrabold text-dfs-navy mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">First Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy focus:ring-1 focus:ring-dfs-navy outline-none transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Last Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy focus:ring-1 focus:ring-dfs-navy outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy focus:ring-1 focus:ring-dfs-navy outline-none transition-all" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Message</label>
                  <textarea rows={6} className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy focus:ring-1 focus:ring-dfs-navy outline-none transition-all resize-none" placeholder="How can we assist your logistics needs?"></textarea>
                </div>
                <button type="button" className="w-full bg-dfs-navy text-white font-bold py-5 hover:bg-dfs-gold transition-colors text-lg shadow-lg">
                  Submit Inquiry
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-extrabold text-dfs-navy mb-8">Corporate Headquarters</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="w-6 h-6 text-dfs-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dfs-navy text-lg mb-1">Physical Address</h3>
                    <p className="text-slate-600 leading-relaxed">
                      TradeFlow OS Logistics Hub<br/>
                      Plot 453, Enterprise Park<br/>
                      Gaborone, Botswana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-6 h-6 text-dfs-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dfs-navy text-lg mb-1">Phone</h3>
                    <p className="text-slate-600 leading-relaxed">
                      +267 390 1234 (Main)<br/>
                      +267 390 1235 (Support)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="w-6 h-6 text-dfs-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dfs-navy text-lg mb-1">Email</h3>
                    <p className="text-slate-600 leading-relaxed">
                      operations@tradeflowos.com<br/>
                      quotes@tradeflowos.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dfs-navy p-8 text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10">
                  <MessageCircle className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Need immediate assistance?</h3>
                <p className="text-slate-300 mb-6 relative z-10">Our regional dispatch team is available 24/7 via WhatsApp.</p>
                <button className="bg-[#25D366] text-white font-bold py-3 px-6 hover:bg-[#128C7E] transition-colors inline-flex items-center gap-2 relative z-10 shadow-lg">
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
