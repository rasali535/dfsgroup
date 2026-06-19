"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogistics } from "@/components/LogisticsProvider";
import { Package, TrendingUp, AlertTriangle, FileText, CheckCircle2, Navigation, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const { shipments, kpis } = useLogistics();
  const [initLoading, setInitLoading] = useState(true);

  // Replicate database query latency on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0B1F3A]">Operations Control Center</h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Global Retail Ltd • ID: CUST-8829
            </p>
          </div>
          <div className="text-right text-xs font-mono text-slate-400 font-semibold bg-white border border-gray-250 px-3 py-1.5 shadow-sm">
            Live Telematics System Operational
          </div>
        </div>

        <AnimatePresence mode="wait">
          {initLoading ? (
            <motion.div 
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* KPI Skeletons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-6 border border-gray-250 shadow-sm h-32 space-y-3">
                    <div className="h-4 bg-slate-200 w-24"></div>
                    <div className="h-8 bg-slate-200 w-16"></div>
                    <div className="h-3 bg-slate-200 w-32"></div>
                  </div>
                ))}
              </div>
              {/* Table Skeletons */}
              <div className="bg-white border border-gray-250 p-6 animate-pulse space-y-4 shadow-sm">
                <div className="h-6 bg-slate-200 w-40"></div>
                <div className="space-y-2.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 bg-slate-200 w-full"></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Operational Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Active Shipments */}
                <div className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-t-[#D4A017] hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Shipments</div>
                    <Package className="w-5 h-5 text-[#D4A017]" />
                  </div>
                  <div className="text-4xl font-black text-[#0B1F3A]">
                    {kpis.activeShipments}
                  </div>
                  <div className="text-xs text-green-600 font-bold mt-3 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5"/> +3 dispatched this week
                  </div>
                </div>

                {/* Pending Actions */}
                <div className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-t-[#0B1F3A] hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Documents</div>
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-4xl font-black text-[#0B1F3A]">
                    {kpis.pendingDocuments}
                  </div>
                  <div className="text-xs text-amber-600 font-bold mt-3">
                    Action required on Chirundu border transit
                  </div>
                </div>

                {/* Dynamic Spend Tracker */}
                <div className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-t-slate-400 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Completed Deliveries (YTD)</div>
                    <div className="font-bold text-slate-400 text-xs uppercase">SADC Network</div>
                  </div>
                  <div className="text-4xl font-black text-[#0B1F3A]">
                    {kpis.deliveredThisMonth}
                  </div>
                  <div className="text-xs text-slate-500 font-bold mt-3">
                    Average transit clearance rate: 99.4%
                  </div>
                </div>

              </div>

              {/* Recent Activity Table */}
              <div className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-250 bg-slate-50/50 flex justify-between items-center">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A]">Live Shipments Queue</h2>
                  <Link href="/dashboard/shipments" className="text-xs text-[#D4A017] font-bold hover:underline uppercase tracking-wider flex items-center gap-1">
                    Manage Shipments <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-650">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-205">
                      <tr>
                        <th className="px-6 py-4">Waybill Reference</th>
                        <th className="px-6 py-4">Route Corridors</th>
                        <th className="px-6 py-4">Current Status</th>
                        <th className="px-6 py-4">ETA / Delivery Logs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150">
                      {shipments.slice(0, 4).map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#0B1F3A]">
                            <Link href={`/dashboard/shipments/${s.waybill}`} className="hover:text-[#D4A017] hover:underline font-mono">
                              {s.waybill}
                            </Link>
                          </td>
                          <td className="px-6 py-4 font-medium">{s.origin} <span className="text-slate-400 px-2">→</span> {s.destination}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              s.status === 'Delivered' 
                                ? 'bg-green-50 border-green-200 text-green-800' 
                                : s.status === 'In Transit' 
                                ? 'bg-blue-50 border-blue-200 text-blue-800' 
                                : 'bg-amber-50 border-amber-200 text-amber-800'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                s.status === 'Delivered' ? 'bg-green-500' : s.status === 'In Transit' ? 'bg-blue-500' : 'bg-amber-500'
                              }`}></span>
                              {s.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#0B1F3A]">{s.eta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
