"use client";

import { useState } from "react";
import { mockShipments, STATUS_ORDER, ShipmentStatus, Shipment } from "@/lib/mockData";
import { LayoutDashboard, Users, Truck, AlertTriangle, PlusCircle, CheckCircle2, Search, X, ShieldCheck, UserCog } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Role = 'superadmin' | 'fleet_manager' | 'customs_agent';
type Tab = 'operations' | 'fleet' | 'customs' | 'customers';

export default function AdminDashboard() {
  const [role, setRole] = useState<Role>('superadmin');
  const [activeTab, setActiveTab] = useState<Tab>('operations');
  const [shipments, setShipments] = useState(mockShipments);
  const [showForm, setShowForm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // New Shipment Form State
  const [newCustomer, setNewCustomer] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [newDest, setNewDest] = useState("");
  const [newCargo, setNewCargo] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleStatusChange = (waybill: string, newStatus: ShipmentStatus) => {
    setShipments(shipments.map(s => {
      if (s.waybill === waybill) {
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const handleSaveStatus = (waybill: string) => {
    showToast(`Status updated successfully for ${waybill}`);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer || !newOrigin || !newDest) return;

    const newShipment: Shipment = {
      waybill: `DFS-202606-000${shipments.length + 1}`,
      customer: newCustomer,
      origin: newOrigin,
      destination: newDest,
      cargo: newCargo || "General",
      weight: newWeight || "0 kg",
      status: "Booked",
      eta: "Pending Routing",
      timeline: [{ status: "Booked", date: new Date().toLocaleString(), location: newOrigin }]
    };

    setShipments([newShipment, ...shipments]);
    setShowForm(false);
    showToast(`New Waybill ${newShipment.waybill} Generated`);
    
    // Reset form
    setNewCustomer(""); setNewOrigin(""); setNewDest(""); setNewCargo(""); setNewWeight("");
  };

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'fleet_manager') setActiveTab('fleet');
    if (newRole === 'customs_agent') setActiveTab('customs');
    if (newRole === 'superadmin') setActiveTab('operations');
  };

  const allowedTabs = {
    superadmin: ['operations', 'fleet', 'customs', 'customers'],
    fleet_manager: ['fleet'],
    customs_agent: ['customs']
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-dfs-navy text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold"
          >
            <CheckCircle2 className="w-5 h-5 text-dfs-gold" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-dfs-navy text-white md:min-h-screen p-4 md:p-6 shrink-0 z-10 relative flex flex-col">
        <div className="font-bold text-xl mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-dfs-gold text-white flex items-center justify-center">
            <UserCog className="w-4 h-4" />
          </div>
          DFS Internal
        </div>

        {/* Role Switcher */}
        <div className="mb-8">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Simulate Role</div>
          <select 
            value={role} 
            onChange={(e) => handleRoleChange(e.target.value as Role)}
            className="w-full bg-white/10 border border-white/20 text-white text-sm p-2 outline-none focus:border-dfs-gold"
          >
            <option value="superadmin">Superadmin</option>
            <option value="fleet_manager">Fleet Manager</option>
            <option value="customs_agent">Customs & Clearance</option>
          </select>
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          {allowedTabs[role].includes('operations') && (
            <button 
              onClick={() => setActiveTab('operations')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 rounded-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'operations' ? 'bg-white/10 text-dfs-gold border-b-4 md:border-b-0 md:border-l-4 border-dfs-gold' : 'hover:bg-white/5 text-slate-300'}`}
            >
              <LayoutDashboard className="w-5 h-5" /> Master Ops
            </button>
          )}
          {allowedTabs[role].includes('fleet') && (
            <button 
              onClick={() => setActiveTab('fleet')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 rounded-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'fleet' ? 'bg-white/10 text-dfs-gold border-b-4 md:border-b-0 md:border-l-4 border-dfs-gold' : 'hover:bg-white/5 text-slate-300'}`}
            >
              <Truck className="w-5 h-5" /> Fleet Tracking
            </button>
          )}
          {allowedTabs[role].includes('customs') && (
            <button 
              onClick={() => setActiveTab('customs')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 rounded-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'customs' ? 'bg-white/10 text-dfs-gold border-b-4 md:border-b-0 md:border-l-4 border-dfs-gold' : 'hover:bg-white/5 text-slate-300'}`}
            >
              <ShieldCheck className="w-5 h-5" /> Customs Dept
            </button>
          )}
          {allowedTabs[role].includes('customers') && (
            <button 
              onClick={() => setActiveTab('customers')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 rounded-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'customers' ? 'bg-white/10 text-dfs-gold border-b-4 md:border-b-0 md:border-l-4 border-dfs-gold' : 'hover:bg-white/5 text-slate-300'}`}
            >
              <Users className="w-5 h-5" /> Customers
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 w-full overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          
          {/* MASTER OPS */}
          {activeTab === 'operations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                    <UserCog className="w-3 h-3" /> Superadmin Access
                  </div>
                  <h1 className="text-3xl font-extrabold text-dfs-navy">Master Operations</h1>
                  <p className="text-slate-500">Global view of all regional logistics.</p>
                </div>
                <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-dfs-navy text-white px-6 py-2.5 font-bold hover:bg-dfs-gold transition-colors flex items-center gap-2 shadow-md"
                >
                  {showForm ? <X className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />} 
                  {showForm ? 'Cancel' : 'New Shipment'}
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Shipments</div>
                    <div className="text-3xl font-black text-dfs-navy">{shipments.length + 121}</div>
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
              <AnimatePresence>
                {showForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="bg-white p-6 border border-gray-200 shadow-sm mb-8">
                      <h2 className="text-lg font-bold text-dfs-navy mb-4 border-b border-gray-100 pb-2">Create New Waybill</h2>
                      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input required value={newCustomer} onChange={e=>setNewCustomer(e.target.value)} type="text" placeholder="Customer Name" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                        <input required value={newOrigin} onChange={e=>setNewOrigin(e.target.value)} type="text" placeholder="Origin" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                        <input required value={newDest} onChange={e=>setNewDest(e.target.value)} type="text" placeholder="Destination" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                        <input value={newCargo} onChange={e=>setNewCargo(e.target.value)} type="text" placeholder="Cargo Type" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                        <input value={newWeight} onChange={e=>setNewWeight(e.target.value)} type="text" placeholder="Weight (kg)" className="border border-gray-200 p-3 bg-slate-50 outline-none focus:border-dfs-navy w-full" />
                        <button type="submit" className="bg-dfs-gold text-white font-bold py-3 px-4 hover:bg-yellow-500 transition-colors shadow-md w-full">Generate Waybill</button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shipments Table */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-dfs-navy">Global Shipment Management</h2>
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
                            <button onClick={() => handleSaveStatus(s.waybill)} className="bg-dfs-navy text-white px-4 py-2 font-bold hover:bg-dfs-gold transition-colors text-xs uppercase tracking-wider">Save</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* FLEET MANAGEMENT */}
          {activeTab === 'fleet' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                  <Truck className="w-3 h-3" /> Dedicated View
                </div>
                <h1 className="text-3xl font-extrabold text-dfs-navy">Fleet Management Engine</h1>
                <p className="text-slate-500">Live telematics and driver assignments.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-dfs-navy mb-4 border-b border-gray-100 pb-2">Active Vehicles</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-full"><Truck className="w-5 h-5 text-dfs-navy"/></div>
                        <div>
                          <div className="font-bold text-dfs-navy">Truck B-452-XYZ</div>
                          <div className="text-xs text-slate-500">Driver: John Doe</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-green-500">On Route (N4)</div>
                        <div className="text-xs text-slate-400">80 km/h</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-full"><Truck className="w-5 h-5 text-dfs-navy"/></div>
                        <div>
                          <div className="font-bold text-dfs-navy">Truck ZA-112-AB</div>
                          <div className="text-xs text-slate-500">Driver: Sipho M.</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-500">Rest Stop</div>
                        <div className="text-xs text-slate-400">0 km/h</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 border border-gray-300 flex flex-col items-center justify-center h-64 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Southern_Africa_relief_location_map.jpg/1024px-Southern_Africa_relief_location_map.jpg')] bg-cover bg-center opacity-40 grayscale"></div>
                  <div className="relative z-10 text-center p-6 bg-white/80 backdrop-blur-sm border border-white m-4 shadow-lg">
                    <Truck className="w-8 h-8 text-dfs-navy mx-auto mb-2" />
                    <h3 className="font-bold text-dfs-navy">Live GPS View</h3>
                    <p className="text-xs text-slate-600">GPS map integration coming in Phase 2.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CUSTOMS & CLEARANCE */}
          {activeTab === 'customs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                  <ShieldCheck className="w-3 h-3" /> Dedicated View
                </div>
                <h1 className="text-3xl font-extrabold text-dfs-navy">Customs & Clearance Queue</h1>
                <p className="text-slate-500">Manage cross-border documentation and tariffs.</p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
                <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-dfs-navy">Pending Border Clearances</h2>
                  <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold">
                    3 Actionable Items
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Waybill / Border</th>
                        <th className="px-6 py-4">Documents</th>
                        <th className="px-6 py-4">AI Verification</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-slate-50 transition-colors bg-red-50/50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-dfs-navy">DFS-202606-0002</div>
                          <div className="text-xs font-bold text-red-500 mt-1">Chirundu Border</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-slate-500 border border-gray-200 px-2 py-1 rounded inline-block bg-white mr-2">Comm. Invoice</div>
                          <div className="text-xs text-slate-500 border border-gray-200 px-2 py-1 rounded inline-block bg-white">Permit Missing</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-red-600 font-bold text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Flagged by AI</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-dfs-navy text-white px-4 py-2 font-bold hover:bg-dfs-gold transition-colors text-xs uppercase tracking-wider">Review File</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-dfs-navy">DFS-202606-0001</div>
                          <div className="text-xs font-bold text-slate-500 mt-1">Kopfontein Border</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-slate-500 border border-gray-200 px-2 py-1 rounded inline-block bg-white mr-2">All Present (3)</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-green-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Clean</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-green-600 text-white px-4 py-2 font-bold hover:bg-green-700 transition-colors text-xs uppercase tracking-wider">Approve Entry</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* CUSTOMERS */}
          {activeTab === 'customers' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-gray-200 shadow-sm rounded-sm">
              <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-dfs-navy">Client Roster</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search clients..." className="pl-9 pr-4 py-2 border border-gray-200 text-sm outline-none focus:border-dfs-navy bg-slate-50" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Client ID</th>
                      <th className="px-6 py-4">Company Name</th>
                      <th className="px-6 py-4">Total Shipments</th>
                      <th className="px-6 py-4">Account Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">CUST-8829</td>
                      <td className="px-6 py-4 font-bold text-dfs-navy">Global Retail Ltd</td>
                      <td className="px-6 py-4">42</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">CUST-1044</td>
                      <td className="px-6 py-4 font-bold text-dfs-navy">Mining Corp Ltd</td>
                      <td className="px-6 py-4">128</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">CUST-5591</td>
                      <td className="px-6 py-4 font-bold text-dfs-navy">AgriTech Solutions</td>
                      <td className="px-6 py-4">15</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
