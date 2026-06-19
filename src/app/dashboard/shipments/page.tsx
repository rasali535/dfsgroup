"use client";

import { motion } from "framer-motion";
import { mockShipments } from "@/lib/mockData";
import { Package, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function DashboardShipments() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-dfs-navy mb-2">My Shipments</h1>
            <p className="text-slate-500">View and track all your active and historical shipments.</p>
          </div>
          <Link href="/quote" className="bg-dfs-navy text-white px-6 py-2.5 font-bold hover:bg-dfs-gold transition-colors text-sm shadow-md">
            Request New Quote
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search by Waybill, Origin, or Destination..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 outline-none focus:border-dfs-navy focus:ring-1 focus:ring-dfs-navy text-sm font-medium" />
          </div>
          <button className="bg-white border border-gray-200 px-4 py-2.5 flex items-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter Status
          </button>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Waybill</th>
                  <th className="px-6 py-4">Cargo Details</th>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">ETA / Delivery</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockShipments.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-dfs-navy">
                      <Link href={`/dashboard/shipments/${s.waybill}`} className="hover:text-dfs-gold hover:underline">
                        {s.waybill}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-dfs-navy">{s.cargo}</div>
                      <div className="text-xs text-slate-400">{s.weight}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{s.origin}</div>
                      <div className="text-xs text-slate-400">to {s.destination}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${s.status === 'Delivered' ? 'bg-green-100 text-green-800' : s.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{s.eta}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/shipments/${s.waybill}`} className="inline-flex items-center text-dfs-navy hover:text-[#D4A017] font-bold bg-slate-100 px-3 py-1.5 rounded-sm text-xs">
                          Details
                        </Link>
                        <Link href="/tracking" className="inline-flex items-center gap-1 text-[#D4A017] hover:text-dfs-navy font-bold bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-sm text-xs">
                          Track <Package className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
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
