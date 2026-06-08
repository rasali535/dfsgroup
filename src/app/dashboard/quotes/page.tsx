"use client";

import { motion } from "framer-motion";
import { FileSignature, PlusCircle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardQuotes() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-dfs-navy mb-2">Quote Management</h1>
            <p className="text-slate-500">Review your requested quotes and accepted contracts.</p>
          </div>
          <Link href="/quote" className="bg-dfs-navy text-white px-6 py-2.5 font-bold hover:bg-dfs-gold transition-colors text-sm shadow-md flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> Request New Quote
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Pending Quote */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Clock className="w-24 h-24 text-amber-500" />
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-amber-50 flex items-center justify-center rounded-full text-amber-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-dfs-navy">Quote #QT-8902</h3>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest">Pending Pricing Team</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6 relative z-10">
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Route</div>
                <div className="font-medium text-dfs-navy">Johannesburg, ZA → Harare, ZW</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Cargo</div>
                <div className="font-medium text-dfs-navy">Heavy Machinery (12,000 kg)</div>
              </div>
            </div>
            
            <div className="flex gap-2 relative z-10">
              <button disabled className="flex-1 bg-slate-100 text-slate-400 font-bold py-2 text-sm cursor-not-allowed">Accept Quote</button>
              <button className="px-4 border border-gray-200 text-slate-500 font-bold text-sm hover:bg-slate-50">Cancel</button>
            </div>
          </motion.div>

          {/* Accepted Quote */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <CheckCircle2 className="w-24 h-24 text-green-500" />
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center rounded-full text-green-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-dfs-navy">Quote #QT-8755</h3>
                <div className="text-xs font-bold text-green-500 uppercase tracking-widest">Accepted & Booked</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6 relative z-10">
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Route</div>
                <div className="font-medium text-dfs-navy">Pretoria, ZA → Maputo, MZ</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pricing</div>
                <div className="font-bold text-dfs-navy text-xl">ZAR 45,000</div>
              </div>
            </div>
            
            <div className="flex gap-2 relative z-10">
              <Link href="/tracking" className="flex-1 bg-dfs-navy text-white text-center font-bold py-2 text-sm hover:bg-dfs-gold transition-colors">Track Shipment</Link>
              <button className="px-4 border border-gray-200 text-dfs-navy font-bold text-sm hover:bg-slate-50 flex items-center justify-center"><FileSignature className="w-4 h-4" /></button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
