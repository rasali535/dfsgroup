"use client";

import { useState } from "react";
import { mockShipments, STATUS_ORDER, ShipmentStatus } from "@/lib/mockData";
import { LayoutDashboard, Users, Truck, AlertTriangle, PlusCircle, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const [shipments, setShipments] = useState(mockShipments);
  const [showForm, setShowForm] = useState(false);
  
  const handleStatusChange = (waybill: string, newStatus: ShipmentStatus) => {
    setShipments(shipments.map(s => {
      if (s.waybill === waybill) {
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    // In a real app this would add to the state, we just toggle UI for demo
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-dfs-navy text-white md:min-h-screen p-4 md:p-6 shrink-0">
        <div className="font-bold text-xl mb-6 md:mb-12 flex items-center gap-2">
          <div className="w-8 h-8 bg-dfs-gold text-white flex items-center justify-center">A</div>
          DFS Admin
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          <button className="flex-1 md:w-full flex items-center gap-3 bg-white/10 px-4 py-3 rounded-sm font-bold text-dfs-gold border-b-4 md:border-b-0 md:border-l-4 border-dfs-gold whitespace-nowrap">
            <LayoutDashboard className="w-5 h-5" /> Operations
          </button>
          <button className="flex-1 md:w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-sm font-medium text-slate-300 transition-colors whitespace-nowrap">
            <Truck className="w-5 h-5" /> Fleet Tracking
          </button>
          <button className="flex-1 md:w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-sm font-medium text-slate-300 transition-colors whitespace-nowrap">
            <Users className="w-5 h-5" /> Customers
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 w-full overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-dfs-navy">Operations Center</h1>
              <p className="text-slate-500">Regional logistics command and control.</p>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-dfs-navy text-white px-6 py-2.5 font-bold hover:bg-dfs-gold transition-colors flex items-center gap-2 shadow-md"
            >
              <PlusCircle className="w-5 h-5" /> New Shipment
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Shipments</div>
                <div className="text-3xl font-black text-dfs-navy">124</div>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-500 flex items-center justify-center rounded-full"><Truck className="w-6 h-6" /></div>
            </div>
            <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Delivered Today</div>
                <div className="text-3xl font-black text-dfs-navy">18</div>
              </div>
              <div className="w-12 h-12 bg-green-50 text-green-500 flex items-center justify-center rounded-full"><CheckCircle2 className="w-6 h-6" /></div>
            </div>
            <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between border-l-4 border-l-red-500">
              <div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Border Delays</div>
                <div className="text-3xl font-black text-red-600">3</div>
              </div>
              <div className="w-12 h-12 bg-red-50 text-red-500 flex items-center justify-center rounded-full"><AlertTriangle className="w-6 h-6" /></div>
            </div>
          </div>

          {/* Create Form Mock */}
          {showForm && (
            <div className="bg-white p-6 border border-gray-200 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
              <h2 className="text-lg font-bold text-dfs-navy mb-4 border-b border-gray-100 pb-2">Create New Waybill</h2>
              <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input type="text" placeholder="Customer Name" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                <input type="text" placeholder="Origin" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                <input type="text" placeholder="Destination" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                <input type="text" placeholder="Cargo Type" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                <input type="text" placeholder="Weight (kg)" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                <button type="submit" className="bg-dfs-gold text-white font-bold py-3 px-4 hover:bg-yellow-500 transition-colors shadow-md w-full">Generate Waybill</button>
              </form>
            </div>
          )}

          {/* Shipments Table */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-dfs-navy">Shipment Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Waybill</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Route</th>
                    <th className="px-6 py-4">Update Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {shipments.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-dfs-navy">{s.waybill}</td>
                      <td className="px-6 py-4">{s.customer}</td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-400">O: {s.origin}</div>
                        <div className="text-xs text-slate-400">D: {s.destination}</div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          className="border border-gray-200 bg-white p-2 text-sm outline-none focus:border-dfs-navy w-full font-medium"
                          value={s.status}
                          onChange={(e) => handleStatusChange(s.waybill, e.target.value as ShipmentStatus)}
                        >
                          {STATUS_ORDER.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-dfs-gold font-bold hover:underline text-xs uppercase tracking-wider">Save</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
