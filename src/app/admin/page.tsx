"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogistics } from "@/components/LogisticsProvider";
import { STATUS_ORDER, ShipmentStatus, Shipment } from "@/lib/mockData";
import { LayoutDashboard, Users, Truck, AlertTriangle, PlusCircle, CheckCircle2, Search, X, ShieldCheck, UserCog, RefreshCw, BarChart2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Role = 'superadmin' | 'fleet_manager' | 'customs_agent';
type Tab = 'operations' | 'fleet' | 'customs' | 'customers';

export default function AdminDashboard() {
  const { shipments, kpis, addShipment, updateShipmentStatus } = useLogistics();
  const [role, setRole] = useState<Role>('superadmin');
  const [activeTab, setActiveTab] = useState<Tab>('operations');
  const [showForm, setShowForm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
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
    // Determine default location based on status for timeline
    let location = "Route Corridor";
    if (newStatus === 'Booked') location = "Origin Depot";
    else if (newStatus === 'Received') location = "DFS Hub JHB";
    else if (newStatus === 'Customs Review' || newStatus === 'Customs Cleared') location = "Border Customs Post";
    else if (newStatus === 'Border Processing') location = "Chirundu Border";
    else if (newStatus === 'Out For Delivery') location = "Destination Hub";
    else if (newStatus === 'Delivered') location = "Receiver Warehouse";

    updateShipmentStatus(waybill, newStatus, location);
    showToast(`Status updated: ${waybill} → [${newStatus}]`);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer || !newOrigin || !newDest) return;

    const timeStr = new Date().toLocaleString("en-US", { hour12: false }).replace(",", "");
    const generatedWaybill = `DFS-202606-000${shipments.length + 1}`;

    const newShipment: Shipment = {
      waybill: generatedWaybill,
      customer: newCustomer,
      origin: newOrigin,
      destination: newDest,
      cargo: newCargo || "General Freight",
      weight: newWeight || "1,000 kg",
      status: "Booked",
      eta: "3 Days (Estimated)",
      timeline: [{ status: "Booked", date: timeStr, location: newOrigin }],
      documents: [],
      notes: [{ date: timeStr, author: "Operations System", content: "Freight consignment registered and waybill generated." }]
    };

    addShipment(newShipment);
    setShowForm(false);
    showToast(`Waybill ${generatedWaybill} generated successfully`);
    
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

  const filteredShipments = shipments.filter(s => 
    s.waybill.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.cargo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B1F3A] text-white px-6 py-3.5 shadow-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider border-t-2 border-[#D4A017]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#D4A017]" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0B1F3A] text-white md:min-h-screen p-4 md:p-6 shrink-0 z-10 relative flex flex-col border-r border-[#0B1F3A]/20">
        <div className="font-black text-lg mb-6 flex items-center gap-2 tracking-tight">
          <div className="w-8 h-8 bg-[#D4A017] text-white flex items-center justify-center font-bold text-base">
            O
          </div>
          DFS Control Center
        </div>

        {/* Role Switcher */}
        <div className="mb-8">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Simulate Access Role</div>
          <select 
            value={role} 
            onChange={(e) => handleRoleChange(e.target.value as Role)}
            className="w-full bg-white/10 border border-white/15 text-white text-xs p-2.5 outline-none focus:border-[#D4A017] font-semibold"
          >
            <option className="bg-[#0B1F3A]" value="superadmin">Superadmin Console</option>
            <option className="bg-[#0B1F3A]" value="fleet_manager">Fleet Manager</option>
            <option className="bg-[#0B1F3A]" value="customs_agent">Customs Inspector</option>
          </select>
        </div>
        
        <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {allowedTabs[role].includes('operations') && (
            <button 
              onClick={() => setActiveTab('operations')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                activeTab === 'operations' 
                  ? 'bg-white/10 text-[#D4A017] border-b-2 md:border-b-0 md:border-l-4 border-[#D4A017]' 
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" /> Master Operations
            </button>
          )}
          {allowedTabs[role].includes('fleet') && (
            <button 
              onClick={() => setActiveTab('fleet')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                activeTab === 'fleet' 
                  ? 'bg-white/10 text-[#D4A017] border-b-2 md:border-b-0 md:border-l-4 border-[#D4A017]' 
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <Truck className="w-4.5 h-4.5" /> Fleet & Telematics
            </button>
          )}
          {allowedTabs[role].includes('customs') && (
            <button 
              onClick={() => setActiveTab('customs')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                activeTab === 'customs' 
                  ? 'bg-white/10 text-[#D4A017] border-b-2 md:border-b-0 md:border-l-4 border-[#D4A017]' 
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4.5 h-4.5" /> Customs Advisory
            </button>
          )}
          {allowedTabs[role].includes('customers') && (
            <button 
              onClick={() => setActiveTab('customers')}
              className={`flex-1 md:w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                activeTab === 'customers' 
                  ? 'bg-white/10 text-[#D4A017] border-b-2 md:border-b-0 md:border-l-4 border-[#D4A017]' 
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <Users className="w-4.5 h-4.5" /> Customer Accounts
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 w-full overflow-hidden">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          {/* MASTER OPERATIONS TAB */}
          {activeTab === 'operations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded">
                    <UserCog className="w-3.5 h-3.5 text-blue-700" /> Authorized staff access
                  </div>
                  <h1 className="text-3xl font-black text-[#0B1F3A] mt-2">Master Operations Queue</h1>
                  <p className="text-slate-500 text-xs mt-1">Real-time status management and waybill generation.</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search waybill or client..." 
                      className="pl-9 pr-4 py-2 bg-white border border-gray-250 text-xs font-semibold outline-none focus:border-[#0B1F3A]"
                    />
                  </div>
                  <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#0B1F3A] text-white px-5 py-2.5 font-bold hover:bg-[#D4A017] transition-all text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    {showForm ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />} 
                    {showForm ? 'Close Entry Form' : 'Register Cargo'}
                  </button>
                </div>
              </div>

              {/* Live KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Active Freight Consignments</div>
                    <div className="text-3xl font-black text-[#0B1F3A]">{kpis.activeShipments}</div>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded"><Truck className="w-5.5 h-5.5" /></div>
                </div>
                <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Delivered (Current Corridor Cycle)</div>
                    <div className="text-3xl font-black text-[#0B1F3A]">{kpis.deliveredThisMonth}</div>
                  </div>
                  <div className="w-12 h-12 bg-green-50 text-green-600 flex items-center justify-center rounded"><CheckCircle2 className="w-5.5 h-5.5" /></div>
                </div>
                <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between border-l-4 border-l-red-500">
                  <div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Customs Discrepancies Halted</div>
                    <div className="text-3xl font-black text-red-700">{kpis.delayedShipments}</div>
                  </div>
                  <div className="w-12 h-12 bg-red-50 text-red-600 flex items-center justify-center rounded"><AlertTriangle className="w-5.5 h-5.5" /></div>
                </div>
              </div>

              {/* Create Cargo Registry Form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="bg-white p-6 border border-gray-200 shadow-sm">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] mb-4 border-b border-gray-150 pb-2">Generate Freight Consignment Record</h2>
                      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input required value={newCustomer} onChange={e=>setNewCustomer(e.target.value)} type="text" placeholder="Consignor Corporate Name" className="border border-gray-200 p-3 bg-slate-50 text-xs font-semibold outline-none focus:bg-white focus:border-[#0B1F3A] w-full" />
                        <input required value={newOrigin} onChange={e=>setNewOrigin(e.target.value)} type="text" placeholder="Origin Dispatch City" className="border border-gray-200 p-3 bg-slate-50 text-xs font-semibold outline-none focus:bg-white focus:border-[#0B1F3A] w-full" />
                        <input required value={newDest} onChange={e=>setNewDest(e.target.value)} type="text" placeholder="Destination Point" className="border border-gray-200 p-3 bg-slate-50 text-xs font-semibold outline-none focus:bg-white focus:border-[#0B1F3A] w-full" />
                        <input value={newCargo} onChange={e=>setNewCargo(e.target.value)} type="text" placeholder="Cargo Classification" className="border border-gray-200 p-3 bg-slate-50 text-xs font-semibold outline-none focus:bg-white focus:border-[#0B1F3A] w-full" />
                        <input value={newWeight} onChange={e=>setNewWeight(e.target.value)} type="text" placeholder="Gross weight (e.g. 8,250 kg)" className="border border-gray-200 p-3 bg-slate-50 text-xs font-semibold outline-none focus:bg-white focus:border-[#0B1F3A] w-full" />
                        <button type="submit" className="bg-[#D4A017] text-white font-bold py-3 px-4 hover:bg-yellow-500 transition-all text-xs uppercase tracking-wider shadow-md w-full">Generate Waybill Entry</button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shipments Table */}
              <div className="bg-white border border-gray-200 shadow-sm">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-slate-50/50">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A]">Consignment Status Matrix</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-650 whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Waybill</th>
                        <th className="px-6 py-4">Consignor</th>
                        <th className="px-6 py-4">Transit Route</th>
                        <th className="px-6 py-4">Dispatcher Status</th>
                        <th className="px-6 py-4 text-right">Commit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150">
                      {filteredShipments.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#0B1F3A] font-mono">
                            <Link href={`/dashboard/shipments/${s.waybill}`} className="hover:text-[#D4A017] hover:underline">
                              {s.waybill}
                            </Link>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-700">{s.customer}</td>
                          <td className="px-6 py-4">
                            <div className="text-xs text-slate-600 font-bold">O: {s.origin}</div>
                            <div className="text-xs text-slate-500 font-medium">D: {s.destination}</div>
                          </td>
                          <td className="px-6 py-4">
                            <select 
                              className="border border-gray-250 bg-white p-2 text-xs font-semibold outline-none focus:border-[#0B1F3A] w-52"
                              value={s.status}
                              onChange={(e) => handleStatusChange(s.waybill, e.target.value as ShipmentStatus)}
                            >
                              {STATUS_ORDER.map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link href={`/dashboard/shipments/${s.waybill}`} className="bg-[#0B1F3A] text-white px-4 py-2 font-bold hover:bg-[#D4A017] transition-all text-[10px] uppercase tracking-wider">
                              View File
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* FLEET MANAGEMENT TAB */}
          {activeTab === 'fleet' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded">
                  <Truck className="w-3.5 h-3.5 text-blue-700" /> Fleet Dispatch controls
                </div>
                <h1 className="text-3xl font-black text-[#0B1F3A] mt-2">Active Telematics Control</h1>
                <p className="text-slate-500 text-xs mt-1">Live routing coordinates and driver telemetry loggers.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-250 p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] mb-4 border-b border-gray-150 pb-2">Active Vehicles</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50/50 border border-gray-150">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0B1F3A] text-white flex items-center justify-center rounded"><Truck className="w-5 h-5 text-[#D4A017]"/></div>
                        <div>
                          <div className="font-bold text-xs text-[#0B1F3A]">Carrier ID: DFS-TRK-402</div>
                          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Driver: John Doe • Heavy Haul</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Transit Route N4
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 font-semibold mt-0.5">80 km/h • GPS Active</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-slate-50/50 border border-gray-150">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0B1F3A] text-white flex items-center justify-center rounded"><Truck className="w-5 h-5 text-[#D4A017]"/></div>
                        <div>
                          <div className="font-bold text-xs text-[#0B1F3A]">Carrier ID: DFS-TRK-088</div>
                          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Driver: Sipho M. • Machinery Escort</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Border Queue
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 font-semibold mt-0.5">0 km/h • Chirundu Post</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-200 border border-gray-300 flex flex-col items-center justify-center h-72 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Southern_Africa_relief_location_map.jpg/1024px-Southern_Africa_relief_location_map.jpg')] bg-cover bg-center opacity-30 grayscale"></div>
                  <div className="relative z-10 text-center p-6 bg-white border border-gray-250 m-4 shadow-lg max-w-sm">
                    <BarChart2 className="w-8 h-8 text-[#0B1F3A] mx-auto mb-2" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F3A] mb-1">Satellite Telematics Feed</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                      Corridor monitoring system is online. Live GPS overlays synchronize directly with the consignment tracking maps.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CUSTOMS DEPT TAB */}
          {activeTab === 'customs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-250 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Border agent clearances
                </div>
                <h1 className="text-3xl font-black text-[#0B1F3A] mt-2">Customs & Advisory Desk</h1>
                <p className="text-slate-500 text-xs mt-1">Audit border documentation and review AI validation discrepancies.</p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm">
                <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A]">Border Clearances Queue</h2>
                  <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
                    {kpis.delayedShipments} Actionable Flags
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-650 whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Waybill / Border Post</th>
                        <th className="px-6 py-4">Clearance Documents</th>
                        <th className="px-6 py-4">AI Verification Flags</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150">
                      {shipments.map((s, idx) => {
                        const flaggedDoc = s.documents.find(d => d.status === "Flagged");
                        if (!flaggedDoc && s.status !== "Customs Review" && s.status !== "Border Processing") return null;

                        return (
                          <tr key={idx} className={`hover:bg-slate-50/60 transition-colors ${flaggedDoc ? 'bg-red-50/20' : ''}`}>
                            <td className="px-6 py-4">
                              <div className="font-bold text-[#0B1F3A] font-mono">{s.waybill}</div>
                              <div className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${flaggedDoc ? 'text-red-600' : 'text-slate-500'}`}>
                                {s.destination === "Gaborone, BW" ? "Kopfontein Border" : "Chirundu Border"}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {s.documents.map((doc, dIdx) => (
                                  <div key={dIdx} className="text-[10px] text-slate-500 border border-gray-250 px-2 py-1 bg-white flex items-center gap-1 font-semibold uppercase tracking-wider">
                                    <FileText className="w-3 h-3 text-[#0B1F3A]" />
                                    {doc.type}
                                  </div>
                                ))}
                                {(!s.documents || s.documents.length === 0) && (
                                  <span className="text-xs text-slate-400 font-medium italic">No files linked</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {flaggedDoc ? (
                                <span className="text-red-700 font-bold text-xs flex items-center gap-1.5">
                                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" /> {flaggedDoc.statusText || "Discrepancy audit flagged"}
                                </span>
                              ) : (
                                <span className="text-green-600 font-bold text-xs flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Documents pass OCR match
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link href={`/dashboard/shipments/${s.waybill}`} className="inline-block bg-[#0B1F3A] text-white px-4 py-2 font-bold hover:bg-[#D4A017] transition-all text-xs uppercase tracking-wider shadow-sm">
                                Audit File
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* CUSTOMER ACCOUNTS TAB */}
          {activeTab === 'customers' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-gray-200 shadow-sm rounded-sm">
              <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A]">Registered Corporate Client Roster</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-655 whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Client ID</th>
                      <th className="px-6 py-4">Corporate Name</th>
                      <th className="px-6 py-4">Active Freight Cycles</th>
                      <th className="px-6 py-4">Compliance Rating</th>
                      <th className="px-6 py-4 font-bold text-right">Account Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-[#0B1F3A]">CUST-8829</td>
                      <td className="px-6 py-4 font-bold text-[#0B1F3A]">Global Retail Ltd</td>
                      <td className="px-6 py-4 font-semibold">12 shipments</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-bold">98.5% (A-Class Exporter)</span></td>
                      <td className="px-6 py-4 text-right"><span className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 font-bold text-xs uppercase tracking-wider">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-[#0B1F3A]">CUST-1044</td>
                      <td className="px-6 py-4 font-bold text-[#0B1F3A]">Mining Corp Ltd</td>
                      <td className="px-6 py-4 font-semibold">4 shipments</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-bold">95.0% (A-Class Exporter)</span></td>
                      <td className="px-6 py-4 text-right"><span className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 font-bold text-xs uppercase tracking-wider">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-[#0B1F3A]">CUST-5591</td>
                      <td className="px-6 py-4 font-bold text-[#0B1F3A]">AgriTech Solutions</td>
                      <td className="px-6 py-4 font-semibold">2 shipments</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-bold">100.0% (Concession Exporter)</span></td>
                      <td className="px-6 py-4 text-right"><span className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 font-bold text-xs uppercase tracking-wider">Active</span></td>
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
