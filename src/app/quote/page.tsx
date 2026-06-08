"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="bg-dfs-navy text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Marketplace Quote</div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">Request a Quote</h1>
            <p className="text-xl text-slate-300 font-light">Provide details about your shipment to receive a competitive rate from our regional logistics network.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dfs-light flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 shadow-xl shadow-dfs-navy/5 p-10"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Origin</label>
                      <input required type="text" className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy outline-none" placeholder="City, Country" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Destination</label>
                      <input required type="text" className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy outline-none" placeholder="City, Country" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cargo Type</label>
                    <select className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy outline-none appearance-none">
                      <option>General Cargo</option>
                      <option>Perishable Goods</option>
                      <option>Dangerous Goods</option>
                      <option>Vehicles</option>
                      <option>Heavy Machinery</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Weight (kg)</label>
                      <input required type="number" className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy outline-none" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dimensions (L x W x H)</label>
                      <input type="text" className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy outline-none" placeholder="Optional" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Additional Notes</label>
                    <textarea rows={4} className="w-full bg-slate-50 border border-gray-200 p-4 text-dfs-navy focus:border-dfs-navy outline-none resize-none" placeholder="Any specific requirements..."></textarea>
                  </div>

                  <button disabled={loading} type="submit" className="w-full bg-dfs-navy text-white font-bold py-5 hover:bg-dfs-gold transition-colors text-lg shadow-lg flex justify-center items-center">
                    {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Submit Request"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-gray-200 shadow-xl shadow-dfs-navy/5 p-16 text-center"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl font-extrabold text-dfs-navy mb-4">Quote Requested</h2>
                <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
                  Thank you. Your request has been logged in the system. Our regional pricing team will respond within 24 hours.
                </p>
                <Link href="/" className="inline-flex items-center text-dfs-navy font-bold hover:text-dfs-gold uppercase tracking-widest text-sm transition-colors">
                  Return to Home <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
