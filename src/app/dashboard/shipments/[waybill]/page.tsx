"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockShipments, Shipment, ShipmentStatus, STATUS_ORDER } from "@/lib/mockData";
import { motion } from "framer-motion";
import { 
  ArrowLeft, FileText, CheckCircle2, AlertTriangle, Clock, 
  MapPin, Send, MessageSquare, ShieldCheck, AlertCircle, Info, Calendar 
} from "lucide-react";
import Link from "next/link";

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const waybill = params.waybill as string;

  // Retrieve shipment or fallback to DFS-202606-0001
  const foundShipment = mockShipments.find(
    s => s.waybill.toLowerCase() === waybill?.toLowerCase()
  ) || mockShipments[0];

  const [shipment, setShipment] = useState<Shipment>(foundShipment);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(shipment.notes || []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const added = {
      date: new Date().toLocaleString("en-US", { hour12: false }).replace(",", ""),
      author: "Client Portal (You)",
      content: newNote.trim()
    };

    setNotes(prev => [...prev, added]);
    setNewNote("");
  };

  const getStatusIndex = (status: ShipmentStatus) => STATUS_ORDER.indexOf(status);
  const currentIdx = getStatusIndex(shipment.status);

  // Check if there are any flagged documents
  const hasFlaggedDocs = shipment.documents?.some(d => d.status === "Flagged");

  return (
    <div className="p-4 sm:p-8 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back navigation */}
        <button 
          onClick={() => router.push("/dashboard/shipments")}
          className="flex items-center gap-2 text-slate-500 hover:text-[#0B1F3A] font-bold text-sm transition-colors uppercase tracking-wider focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shipments
        </button>

        {/* Header Summary */}
        <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Consignment ID</span>
              {hasFlaggedDocs && (
                <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide flex items-center gap-1 rounded">
                  <AlertCircle className="w-3 h-3" /> Action Required
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-[#0B1F3A] mt-1">{shipment.waybill}</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{shipment.customer}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="border-l-2 border-gray-150 pl-4">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Route</div>
              <div className="font-bold text-[#0B1F3A]">{shipment.origin} <span className="text-[#D4A017] mx-1">→</span> {shipment.destination}</div>
            </div>
            <div className="border-l-2 border-gray-150 pl-4">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Cargo Type</div>
              <div className="font-bold text-[#0B1F3A]">{shipment.cargo} ({shipment.weight})</div>
            </div>
            <div className="border-l-2 border-gray-150 pl-4">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Current Status</div>
              <div className="font-bold text-[#D4A017] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#D4A017] rounded-full animate-pulse"></span>
                {shipment.status}
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Timeline & Notes */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Detailed Timeline */}
            <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-8 border-b border-gray-100 pb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4A017]" /> Shipment Journey Progress
              </h2>
              
              <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {STATUS_ORDER.map((step, idx) => {
                  const isCompleted = currentIdx >= idx;
                  const isCurrent = currentIdx === idx;
                  const log = shipment.timeline.find(t => t.status === step);

                  return (
                    <motion.div 
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      {/* Timeline Dot Indicator */}
                      <div className={`absolute -left-8 w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${
                        isCurrent 
                          ? "bg-white border-[#D4A017] ring-4 ring-[#D4A017]/20" 
                          : isCompleted 
                          ? "bg-[#0B1F3A] border-[#0B1F3A] text-white" 
                          : "bg-white border-slate-200 text-slate-300"
                      }`}>
                        {isCompleted && !isCurrent ? (
                          <CheckCircle2 className="w-4.5 h-4.5" />
                        ) : (
                          <div className={`w-2 h-2 rounded-full ${isCurrent ? "bg-[#D4A017] animate-ping" : "bg-slate-200"}`} />
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div>
                        <h3 className={`font-bold text-sm ${isCurrent ? "text-[#D4A017]" : isCompleted ? "text-[#0B1F3A]" : "text-slate-400"}`}>
                          {step}
                        </h3>
                        {log && (
                          <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                            <span>{log.location}</span>
                          </p>
                        )}
                      </div>

                      {log && (
                        <div className="text-right sm:text-right font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {log.date}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Shipment Notes */}
            <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-6 border-b border-gray-100 pb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-[#D4A017]" /> Operational History Log
              </h2>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 mb-6">
                {notes.map((note, idx) => (
                  <div key={idx} className="bg-slate-50 border border-gray-150 p-4 relative">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-xs text-[#0B1F3A]">{note.author}</span>
                      <span className="text-[9px] font-mono text-slate-400 font-bold">{note.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="border-t border-gray-150 pt-4 flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Post operational request or update note..."
                  className="flex-1 border border-gray-250 bg-slate-50 focus:bg-white text-xs p-3 outline-none focus:border-[#0B1F3A] font-medium"
                />
                <button 
                  type="submit" 
                  className="bg-[#0B1F3A] hover:bg-[#D4A017] text-white font-bold px-5 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  Post <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Documents & Compliance Audit */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Associated Documents */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F3A] mb-4 border-b border-gray-100 pb-2">
                Linked Customs Documents
              </h3>
              
              <div className="space-y-3">
                {shipment.documents?.map((doc, idx) => (
                  <div key={idx} className="border border-gray-150 p-3 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-5 h-5 text-[#0B1F3A] shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#0B1F3A] truncate max-w-[150px]">{doc.name}</div>
                        <div className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">{doc.type}</div>
                      </div>
                    </div>
                    <div>
                      {doc.status === "Approved" && (
                        <span className="text-green-600 hover:underline font-bold text-[10px] uppercase tracking-wider flex items-center gap-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ok
                        </span>
                      )}
                      {doc.status === "Flagged" && (
                        <span className="text-red-600 font-bold text-[10px] uppercase tracking-wider flex items-center gap-0.5" title="Customs discrepancy detected">
                          <AlertTriangle className="w-3.5 h-3.5" /> Audit Alert
                        </span>
                      )}
                      {doc.status === "Under Review" && (
                        <span className="text-amber-600 font-bold text-[10px] uppercase tracking-wider flex items-center gap-0.5">
                          <Clock className="w-3.5 h-3.5 animate-spin" /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Advisor Callout Box */}
            <div className="bg-[#0B1F3A] text-white p-6 shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5"><ShieldCheck className="w-28 h-28" /></div>
              <h3 className="font-bold text-sm text-[#D4A017] mb-2">AI Compliance Guard</h3>
              
              {hasFlaggedDocs ? (
                <div className="space-y-4">
                  <div className="bg-red-500/25 border border-red-500/40 p-3 text-xs text-red-200">
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-white">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> Document Flagged
                    </div>
                    Import Permit weight mismatch detected by AI parser. Consignment paused at Chirundu Border.
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Open our AI Customs assistant to check SADC import requirements and resolve weight adjustments.
                  </p>
                  <Link 
                    href="/assistant" 
                    className="w-full text-center block bg-[#D4A017] hover:bg-yellow-500 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    Consult AI Customs Co-pilot
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-500/30 p-3 text-xs text-green-200">
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-white">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Audits Clean
                    </div>
                    No anomalies found. Pre-clearance manifests have been transmitted to border authorities.
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Need to add transit paperwork? Upload documents directly to have them scanned and pre-filed.
                  </p>
                  <Link 
                    href="/documents" 
                    className="w-full text-center block border border-white/20 hover:bg-white/10 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider transition-all"
                  >
                    Submit Paperwork
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
