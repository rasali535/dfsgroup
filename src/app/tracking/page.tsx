"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, CheckCircle2 } from "lucide-react";
import { mockShipments, Shipment, STATUS_ORDER, ShipmentStatus } from "@/lib/mockData";
import dynamic from 'next/dynamic';

const TrackingMap = dynamic(() => import('@/components/TrackingMap'), {
  ssr: false,
  loading: () => <div className="h-64 sm:h-96 w-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">Loading Live Map...</div>
});

export default function TrackingPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setSearched(false);
    
    // Simulate API call
    setTimeout(() => {
      const found = mockShipments.find(s => s.waybill.toLowerCase() === query.toLowerCase());
      setResult(found || null);
      setSearched(true);
      setLoading(false);
    }, 800);
  };

  const getStatusIndex = (status: ShipmentStatus) => STATUS_ORDER.indexOf(status);

  return (
    <div className="flex flex-col min-h-screen bg-dfs-light">
      {/* Header */}
      <section className="bg-dfs-navy text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Interactive Demo</div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-8">Shipment Tracking</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Try entering <span className="font-mono bg-white/10 px-2 py-1 rounded text-dfs-gold">DFS-202606-0001</span> to see the interactive timeline.
            </p>

            <form onSubmit={handleSearch} className="bg-white p-2 rounded-sm shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto relative z-20 border-4 border-dfs-navy/20">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-6 h-6 text-slate-400" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Waybill Number"
                  className="w-full bg-transparent border-none focus:ring-0 text-dfs-navy text-lg pl-14 pr-4 h-16 outline-none font-bold placeholder:text-slate-300 placeholder:font-normal uppercase"
                />
              </div>
              <button disabled={loading} type="submit" className="bg-dfs-gold text-white px-10 h-16 font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 shrink-0 text-lg disabled:opacity-70">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Track"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Results Area */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <AnimatePresence mode="wait">
            {searched && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="bg-white border border-gray-200 shadow-xl shadow-dfs-navy/5"
              >
                {/* Status Header */}
                <div className="p-8 border-b border-gray-100 bg-slate-50 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Waybill</div>
                    <div className="text-3xl font-black text-dfs-navy">{result.waybill}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Current Status</div>
                    <div className="text-2xl font-bold text-dfs-gold inline-flex items-center gap-2">
                      <div className="w-3 h-3 bg-dfs-gold rounded-full animate-pulse"></div>
                      {result.status}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border-b border-gray-100">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Origin</div>
                    <div className="font-semibold text-dfs-navy">{result.origin}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Destination</div>
                    <div className="font-semibold text-dfs-navy">{result.destination}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cargo</div>
                    <div className="font-semibold text-dfs-navy">{result.cargo}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ETA</div>
                    <div className="font-semibold text-dfs-navy">{result.eta}</div>
                  </div>
                </div>

                {/* Interactive Map */}
                <TrackingMap 
                  origin={result.origin} 
                  destination={result.destination} 
                  statusIndex={getStatusIndex(result.status)} 
                />

                {/* Timeline */}
                <div className="p-8 overflow-x-auto">
                  <div className="min-w-[800px] py-10 px-4">
                    <div className="relative flex justify-between">
                      {/* Base Line */}
                      <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10"></div>
                      
                      {/* Active Line */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(getStatusIndex(result.status) / (STATUS_ORDER.length - 1)) * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-5 left-0 h-1 bg-dfs-gold -z-10"
                      ></motion.div>

                      {STATUS_ORDER.map((step, idx) => {
                        const isCompleted = getStatusIndex(result.status) >= idx;
                        const isCurrent = getStatusIndex(result.status) === idx;
                        const timelineData = result.timeline.find(t => t.status === step);

                        return (
                          <div key={step} className="flex flex-col items-center relative w-32 -ml-16 first:ml-0 last:-mr-16">
                            <motion.div 
                              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + (idx * 0.1) }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${isCompleted ? 'bg-dfs-navy border-dfs-navy text-white' : 'bg-white border-gray-300 text-gray-300'} ${isCurrent ? 'ring-4 ring-dfs-gold/30 ring-offset-2' : ''}`}
                            >
                              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                            </motion.div>
                            <div className={`mt-4 text-center ${isCurrent ? 'text-dfs-navy font-bold' : isCompleted ? 'text-slate-600 font-semibold' : 'text-slate-400 font-medium'}`}>
                              <div className="text-sm">{step}</div>
                              {timelineData && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-2 text-xs font-normal text-slate-500">
                                  <div>{timelineData.date}</div>
                                  <div className="text-dfs-gold">{timelineData.location}</div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {searched && !result && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border border-gray-200"
              >
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-dfs-navy mb-2">Shipment Not Found</h3>
                <p className="text-slate-500">We couldn't find a shipment with that waybill number in the demo system.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
