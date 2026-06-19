"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogistics } from "@/components/LogisticsProvider";
import { Package, Search, Filter, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function DashboardShipments() {
  const { shipments } = useLogistics();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Replicate API response delay on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

  const filtered = shipments.filter(s => {
    const matchesSearch = 
      s.waybill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cargo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0B1F3A]">Consignments Manager</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              TradeFlow Logistics Platform • Active Freight Corridors
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleRefresh}
              className="bg-white border border-gray-250 p-2.5 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none flex items-center justify-center"
              title="Refresh Queue"
            >
              <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link href="/quote" className="bg-[#0B1F3A] text-white px-6 py-2.5 font-bold hover:bg-[#D4A017] transition-all text-xs uppercase tracking-wider shadow-md">
              Book Cargo Dispatch
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Waybill, Origin, Destination, or Cargo..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 outline-none focus:border-[#0B1F3A] focus:ring-1 focus:ring-[#0B1F3A] text-xs font-medium shadow-sm placeholder:text-slate-400" 
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:border-[#0B1F3A] outline-none shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Booked">Booked</option>
              <option value="Received">Received</option>
              <option value="Customs Review">Customs Review</option>
              <option value="Customs Cleared">Customs Cleared</option>
              <option value="In Transit">In Transit</option>
              <option value="Border Processing">Border Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-gray-200 p-6 space-y-4 animate-pulse shadow-sm"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-200 w-full"></div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-650">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Waybill</th>
                      <th className="px-6 py-4">Cargo Description</th>
                      <th className="px-6 py-4">Transit Route</th>
                      <th className="px-6 py-4">Clearance Status</th>
                      <th className="px-6 py-4">ETA / Delivery Logs</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {filtered.length > 0 ? (
                      filtered.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#0B1F3A]">
                            <Link href={`/dashboard/shipments/${s.waybill}`} className="hover:text-[#D4A017] hover:underline font-mono">
                              {s.waybill}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-[#0B1F3A]">{s.cargo}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{s.weight}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-700">{s.origin}</div>
                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">to {s.destination}</div>
                          </td>
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
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link href={`/dashboard/shipments/${s.waybill}`} className="inline-flex items-center text-xs font-bold bg-[#0B1F3A] hover:bg-[#D4A017] text-white px-3.5 py-1.5 shadow-sm transition-colors">
                                Details
                              </Link>
                              <Link href="/tracking" className="inline-flex items-center gap-1 text-xs font-bold text-[#D4A017] hover:text-[#0B1F3A] bg-yellow-50 border border-yellow-250 px-3.5 py-1.5 transition-colors shadow-sm">
                                Track <Package className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-16 text-center">
                          <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                          <h4 className="font-bold text-[#0B1F3A] mb-1">No Consignments Found</h4>
                          <p className="text-xs text-slate-500 max-w-xs mx-auto">
                            No shipments match the current search filters in this department queue.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
