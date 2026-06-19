"use client";

import { motion } from "framer-motion";
import { mockShipments } from "@/lib/mockData";
import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-extrabold text-dfs-navy mb-2">Overview</h1>
        <p className="text-slate-500 mb-8">Your account snapshot for this month.</p>

        {/* Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-t-dfs-gold">
            <div className="flex justify-between items-start mb-4">
              <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Active Shipments</div>
              <Package className="w-5 h-5 text-dfs-gold" />
            </div>
            <div className="text-4xl font-black text-dfs-navy">2</div>
            <div className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +1 from last week</div>
          </div>
          <div className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-t-dfs-navy">
            <div className="flex justify-between items-start mb-4">
              <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Pending Documents</div>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-4xl font-black text-dfs-navy">1</div>
            <div className="text-xs text-amber-600 font-bold mt-2">Action required on DFS-202606-0002</div>
          </div>
          <div className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-t-slate-400">
            <div className="flex justify-between items-start mb-4">
              <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Spend (YTD)</div>
              <div className="font-bold text-slate-400">ZAR</div>
            </div>
            <div className="text-4xl font-black text-dfs-navy">84,500</div>
          </div>
        </motion.div>

        {/* Recent Activity Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-dfs-navy">Recent Shipments</h2>
            <Link href="/dashboard/shipments" className="text-sm text-dfs-gold font-bold hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Waybill</th>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockShipments.slice(0, 3).map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-dfs-navy">
                      <Link href={`/dashboard/shipments/${s.waybill}`} className="hover:text-dfs-gold hover:underline">
                        {s.waybill}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{s.origin} <span className="text-slate-400 px-2">→</span> {s.destination}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${s.status === 'Delivered' ? 'bg-green-100 text-green-800' : s.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
