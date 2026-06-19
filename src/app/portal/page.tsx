import Link from "next/link";
import { ArrowRight, FileText, Package, LayoutDashboard, MessageSquare } from "lucide-react";

export default function PortalPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Operations Dashboard</h1>
            <p className="text-slate-400">Welcome back. Here is your logistics overview.</p>
          </div>
          <Link href="/portal/ai" className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-6 py-3 rounded-full font-semibold hover:bg-indigo-600/30 transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Customs Co-pilot
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
            <div className="text-slate-400 text-sm font-medium mb-2">Active Shipments</div>
            <div className="text-3xl font-bold text-white mb-4">12</div>
            <div className="text-sm text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 3 In Transit
            </div>
          </div>
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
            <div className="text-slate-400 text-sm font-medium mb-2">Pending Documents</div>
            <div className="text-3xl font-bold text-white mb-4">4</div>
            <div className="text-sm text-amber-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> 1 Review Required
            </div>
          </div>
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
            <div className="text-slate-400 text-sm font-medium mb-2">Active Quotes</div>
            <div className="text-3xl font-bold text-white mb-4">2</div>
            <div className="text-sm text-slate-500 flex items-center gap-1">
              Waiting for response
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Shipments</h2>
            <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950/50 text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-medium">Waybill</th>
                  <th className="px-6 py-4 font-medium">Origin</th>
                  <th className="px-6 py-4 font-medium">Destination</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { id: "TF-202606-0001", o: "Gaborone, BW", d: "Johannesburg, ZA", s: "In Transit", eta: "10 Jun 2026", color: "emerald" },
                  { id: "TF-202606-0002", o: "Lusaka, ZM", d: "Gaborone, BW", s: "Customs Review", eta: "12 Jun 2026", color: "amber" },
                  { id: "TF-202606-0003", o: "Harare, ZW", d: "Pretoria, ZA", s: "Booked", eta: "15 Jun 2026", color: "slate" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{row.id}</td>
                    <td className="px-6 py-4">{row.o}</td>
                    <td className="px-6 py-4">{row.d}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${row.color}-500/10 text-${row.color}-400 border border-${row.color}-500/20`}>
                        {row.s}
                      </span>
                    </td>
                    <td className="px-6 py-4">{row.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Specialized Enterprise Portals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "MyTradeFlow+", desc: "Document & Parcel" },
              { name: "TradeFlow Express Commerce", desc: "E-commerce Integration" },
              { name: "myTradeFlowi", desc: "Global Forwarding" },
              { name: "TradeFlow SupplyChain", desc: "Warehouse Management" },
              { name: "TradeFlow SameDay", desc: "Urgent Courier" },
              { name: "TradeFlow LifeTrack", desc: "Cold Chain Logistics" }
            ].map((portal, i) => (
              <div key={i} className="bg-slate-900 border border-white/5 hover:border-indigo-500/50 transition-colors rounded-xl p-4 cursor-pointer group">
                <h3 className="font-bold text-indigo-400 group-hover:text-indigo-300 mb-1">{portal.name}</h3>
                <p className="text-xs text-slate-500">{portal.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
