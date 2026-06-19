"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, CheckCircle2, MapPin, Calendar, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { useLogistics } from "@/components/LogisticsProvider";
import { STATUS_ORDER, ShipmentStatus, Shipment } from "@/lib/mockData";
import dynamic from 'next/dynamic';

const TrackingMap = dynamic(() => import('@/components/TrackingMap'), {
  ssr: false,
  loading: () => <div className="h-64 sm:h-96 w-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">Loading Live Satellite Telematics...</div>
});

export default function TrackingPage() {
  const { shipments } = useLogistics();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setSearched(false);
    
    // Simulate database lookup delay
    setTimeout(() => {
      const found = shipments.find(s => s.waybill.toLowerCase() === query.trim().toLowerCase());
      setResult(found || null);
      setSearched(true);
      setLoading(false);
    }, 1500);
  };

  const getStatusIndex = (status: ShipmentStatus) => STATUS_ORDER.indexOf(status);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <section className="bg-[#0B1F3A] text-white pt-32 pb-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#D4A017] text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4A017]" /> TradeFlow Shipment Intelligence System
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Consignment Tracking</h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Enter your TradeFlow waybill number to access real-time status updates, customs clearance logs, and live telematics.
            </p>

            <form onSubmit={handleSearch} className="bg-white p-2 rounded-sm shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto relative z-20 border-4 border-slate-700/25">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Waybill (e.g. TF-202606-0001)"
                  className="w-full bg-transparent border-none focus:ring-0 text-[#0B1F3A] text-base pl-12 pr-4 h-14 outline-none font-bold placeholder:text-slate-400 uppercase"
                />
              </div>
              <button disabled={loading} type="submit" className="bg-[#0B1F3A] text-white px-10 h-14 font-bold hover:bg-[#D4A017] transition-all flex items-center justify-center gap-2 shrink-0 text-base disabled:opacity-75">
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Track Consignment"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Results Area */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <AnimatePresence mode="wait">
            
            {/* Loading Skeleton */}
            {loading && (
              <motion.div 
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-gray-200 p-8 space-y-8 animate-pulse shadow-md"
              >
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 w-24"></div>
                    <div className="h-8 bg-slate-200 w-60"></div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-4 bg-slate-200 w-20 ml-auto"></div>
                    <div className="h-6 bg-slate-200 w-40 ml-auto"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 bg-slate-200 w-16"></div>
                      <div className="h-5 bg-slate-200 w-32"></div>
                    </div>
                  ))}
                </div>
                <div className="h-64 bg-slate-200 w-full"></div>
                <div className="h-10 bg-slate-200 w-full"></div>
              </motion.div>
            )}

            {/* Found Result */}
            {searched && result && !loading && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                className="bg-white border border-gray-200 shadow-xl shadow-slate-900/5"
              >
                {/* Status Header */}
                <div className="p-8 border-b border-gray-100 bg-slate-50 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Waybill Reference</div>
                    <div className="text-3xl font-black text-[#0B1F3A]">{result.waybill}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Clearance Status</div>
                    <div className="text-xl font-bold text-[#D4A017] inline-flex items-center gap-2 bg-yellow-50/50 border border-yellow-200 px-3 py-1.5">
                      <span className="w-2.5 h-2.5 bg-[#D4A017] rounded-full animate-pulse"></span>
                      {result.status}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border-b border-gray-100 text-sm">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Dispatch Point</div>
                    <div className="font-bold text-[#0B1F3A]">{result.origin}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Destination Point</div>
                    <div className="font-bold text-[#0B1F3A]">{result.destination}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Manifest Cargo</div>
                    <div className="font-bold text-[#0B1F3A]">{result.cargo} ({result.weight})</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estimated Delivery</div>
                    <div className="font-bold text-[#0B1F3A]">{result.eta}</div>
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
                      <div className="absolute top-5 left-0 w-full h-1 bg-gray-250 -z-10"></div>
                      
                      {/* Active Line */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(getStatusIndex(result.status) / (STATUS_ORDER.length - 1)) * 100}%` }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute top-5 left-0 h-1 bg-[#D4A017] -z-10"
                      ></motion.div>

                      {STATUS_ORDER.map((step, idx) => {
                        const isCompleted = getStatusIndex(result.status) >= idx;
                        const isCurrent = getStatusIndex(result.status) === idx;
                        const timelineData = result.timeline.find(t => t.status === step);

                        return (
                          <div key={step} className="flex flex-col items-center relative w-32 -ml-16 first:ml-0 last:-mr-16">
                            <motion.div 
                              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + (idx * 0.08) }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                                isCompleted 
                                  ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white' 
                                  : 'bg-white border-gray-300 text-gray-300'
                              } ${isCurrent ? 'ring-4 ring-[#D4A017]/35 ring-offset-2' : ''}`}
                            >
                              {isCompleted ? <CheckCircle2 className="w-5 h-5 text-[#D4A017]" /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                            </motion.div>
                            <div className={`mt-4 text-center ${isCurrent ? 'text-[#0B1F3A] font-bold' : isCompleted ? 'text-slate-700 font-bold' : 'text-slate-400 font-medium'}`}>
                              <div className="text-xs uppercase tracking-wider">{step}</div>
                              {timelineData && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-2 text-[10px] font-mono text-slate-500">
                                  <div>{timelineData.date}</div>
                                  <div className="text-[#D4A017] font-semibold">{timelineData.location}</div>
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

            {/* Not Found */}
            {searched && !result && !loading && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border border-gray-200 shadow-md"
              >
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0B1F3A] mb-2">Manifest Not Found</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-sm">
                  We could not find active records matching waybill "{query.toUpperCase()}". Please verify the code and try again.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
