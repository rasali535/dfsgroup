"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogistics } from "@/components/LogisticsProvider";
import { Upload, FileText, CheckCircle2, X, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ShipmentDocument } from "@/lib/mockData";

export default function DashboardDocuments() {
  const { shipments, addDocumentToShipment } = useLogistics();
  const [selectedWaybill, setSelectedWaybill] = useState(shipments[0]?.waybill || "");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract all documents currently linked to shipments
  const linkedDocs = shipments.flatMap(s => 
    (s.documents || []).map(d => ({
      ...d,
      waybill: s.waybill
    }))
  );

  const simulateUpload = (fileName: string) => {
    if (!selectedWaybill) return;

    setUploading(true);
    setUploadingFileName(fileName);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const lowerName = fileName.toLowerCase();
            let category = "Commercial Invoice";
            if (lowerName.includes("packing")) category = "Packing List";
            else if (lowerName.includes("lading")) category = "Bill of Lading";
            else if (lowerName.includes("permit")) category = "Import Permit";
            else if (lowerName.includes("origin")) category = "Certificate of Origin";

            const status = lowerName.includes("flag") || lowerName.includes("mismatch") ? "Flagged" : "Approved";
            const statusText = 
              status === "Approved" ? "OCR scan passed. All values match." :
              "Flagged: Weight mismatch detected by AI audit.";

            const newDoc: ShipmentDocument = {
              name: fileName,
              type: category,
              status,
              uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
              statusText
            } as any;

            addDocumentToShipment(selectedWaybill, newDoc);
            setUploading(false);
            setUploadingFileName("");
          }, 600);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUpload(e.target.files[0].name);
    }
  };

  return (
    <div className="p-8 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <h1 className="text-3xl font-black text-[#0B1F3A] mb-2">Document Audit Center</h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
          Manage SADC Customs Declarations & OCR Verifications
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] mb-4">Link Document</h2>
              
              {/* Waybill selector */}
              <div className="mb-4 space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Target Waybill</label>
                <select 
                  value={selectedWaybill}
                  onChange={(e) => setSelectedWaybill(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-250 p-2.5 text-xs font-bold text-[#0B1F3A] outline-none"
                >
                  {shipments.map(s => (
                    <option key={s.waybill} value={s.waybill}>{s.waybill} ({s.cargo.split(" ")[0]})</option>
                  ))}
                </select>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 bg-slate-50 p-8 text-center rounded-sm hover:bg-slate-100 hover:border-[#D4A017] transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px]"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  onChange={handleFileChange} 
                  disabled={uploading} 
                />
                <Upload className="w-8 h-8 text-[#D4A017] mb-3" />
                <div className="font-bold text-[#0B1F3A] text-xs mb-1">Drag & Drop or Click</div>
                <div className="text-[10px] text-slate-500 font-medium">PDF, JPG up to 10MB</div>
              </div>
              
              {uploading && (
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-bold text-slate-650 mb-2">
                    <span className="truncate max-w-[70%]">Uploading: {uploadingFileName}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D4A017] h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-[#0B1F3A] text-white p-6 shadow-md relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5"><FileText className="w-32 h-32" /></div>
              <h3 className="font-bold text-[#D4A017] text-sm mb-2">AI OCR Active</h3>
              <p className="text-slate-350 text-xs mb-4 leading-relaxed">
                DFS Shipment Intelligence automatically audits consignee details, VAT registrations, and HS tariff classifications.
              </p>
              <Link href="/assistant" className="inline-block bg-[#D4A017] text-white px-4 py-2 text-xs font-bold hover:bg-yellow-500 transition-colors">
                Consult Customs Co-pilot
              </Link>
            </div>
          </motion.div>

          {/* File List */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="bg-white border border-gray-200 shadow-sm min-h-full">
              <div className="p-6 border-b border-gray-250 bg-slate-50/50">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A]">Linked Documentation</h2>
              </div>
              <div className="p-6 space-y-4">
                
                {linkedDocs.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-9 h-9 bg-slate-50 border border-gray-250 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-[#0B1F3A]" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#0B1F3A] truncate max-w-[200px] sm:max-w-[320px] font-mono">{file.name}</div>
                        <div className="text-[9px] text-slate-500 mt-1 font-bold uppercase tracking-wider">
                          <span className="text-[#D4A017] font-mono">{file.waybill}</span>
                          <span className="mx-1.5">•</span>
                          <span>{file.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {file.status === "Approved" ? (
                        <span className="text-green-600 font-bold text-[9px] uppercase tracking-wider flex items-center gap-0.5 bg-green-50 px-2.5 py-1 border border-green-200 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                        </span>
                      ) : file.status === "Flagged" ? (
                        <span className="text-red-650 font-bold text-[9px] uppercase tracking-wider flex items-center gap-0.5 bg-red-50 px-2.5 py-1 border border-red-200 rounded-full animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5" /> Flagged
                        </span>
                      ) : (
                        <span className="text-amber-600 font-bold text-[9px] uppercase tracking-wider flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 border border-amber-200 rounded-full">
                          <Clock className="w-3.5 h-3.5" /> Review
                        </span>
                      )}
                      <Link href={`/dashboard/shipments/${file.waybill}`} className="text-xs text-[#0B1F3A] hover:text-[#D4A017] font-bold uppercase tracking-wider">
                        Audit
                      </Link>
                    </div>
                  </div>
                ))}
                
                {linkedDocs.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No documents uploaded yet. select a waybill and drop files on the left.
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
