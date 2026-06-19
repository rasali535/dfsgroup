"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogistics } from "@/components/LogisticsProvider";
import { Upload, FileText, CheckCircle2, AlertTriangle, Clock, Trash2, ShieldCheck, FileCheck, Check, Search, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ShipmentDocument } from "@/lib/mockData";

const CATEGORIES = [
  "Commercial Invoice",
  "Packing List",
  "Bill of Lading",
  "Import Permit",
  "Certificate of Origin"
] as const;

export default function StandaloneDocumentsPage() {
  const { shipments, addDocumentToShipment } = useLogistics();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWaybill, setSelectedWaybill] = useState(shipments[0]?.waybill || "");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Compile a list of all documents currently linked in our shipments list for unified display
  const allDocuments = shipments.flatMap(s => 
    (s.documents || []).map(d => ({
      ...d,
      waybill: s.waybill
    }))
  );

  const simulateUpload = (fileName: string) => {
    if (!selectedWaybill) {
      alert("Please select a target Waybill to link this document before uploading.");
      return;
    }
    
    setUploading(true);
    setUploadingFileName(fileName);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Determine type from file name keywords or random
            const lowerName = fileName.toLowerCase();
            let category: typeof CATEGORIES[number] = "Commercial Invoice";
            if (lowerName.includes("packing") || lowerName.includes("list")) category = "Packing List";
            else if (lowerName.includes("lading") || lowerName.includes("bill")) category = "Bill of Lading";
            else if (lowerName.includes("permit")) category = "Import Permit";
            else if (lowerName.includes("origin") || lowerName.includes("cert")) category = "Certificate of Origin";

            // Generate status
            const status: 'Approved' | 'Under Review' | 'Flagged' = 
              lowerName.includes("mismatch") || lowerName.includes("flag") ? "Flagged" : "Approved";
            
            const statusText = 
              status === "Approved" ? "OCR scan passed. Core values match consignment specifications." :
              "Flagged: Weight mismatch detected between declared cargo and permit capacity.";

            const newDoc: ShipmentDocument = {
              name: fileName,
              type: category,
              status,
              uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
              statusText
            } as any; // Allow custom statusText attribute

            addDocumentToShipment(selectedWaybill, newDoc);
            setUploading(false);
            setUploadingFileName("");
            showToast(`File linked to ${selectedWaybill} successfully`);
          }, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUpload(e.target.files[0].name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload(e.dataTransfer.files[0].name);
    }
  };

  const filteredDocs = allDocuments.filter(doc => {
    const matchesCategory = activeCategory === "All" || doc.type === activeCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.waybill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
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

      {/* Header */}
      <section className="bg-[#0B1F3A] text-white pt-28 pb-12 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#D4A017] text-xs font-bold uppercase tracking-wider mb-3">
                <FileCheck className="w-3.5 h-3.5" /> DFS Operations Control Center
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">Document Advisory Center</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl font-light">
                Submit and audit bills of lading, SADC certificates, and customs permits. Document updates trigger instant optical character recognition verification checks.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/dashboard" className="bg-white/10 border border-white/20 px-5 py-2.5 text-xs font-bold hover:bg-white/20 transition-all uppercase tracking-wider text-center flex items-center">
                Portal Overview
              </Link>
              <Link href="/assistant" className="bg-[#D4A017] text-white px-5 py-2.5 text-xs font-bold hover:bg-yellow-500 transition-all uppercase tracking-wider text-center flex items-center shadow-lg shadow-[#D4A017]/10">
                Customs Advisory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Upload Area Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Link New Paperwork</h2>
                
                {/* Waybill Selector */}
                <div className="mb-4 space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Target Waybill Reference</label>
                  <select 
                    value={selectedWaybill}
                    onChange={(e) => setSelectedWaybill(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-250 p-3 text-xs font-bold text-[#0B1F3A] outline-none focus:bg-white focus:border-[#0B1F3A]"
                  >
                    {shipments.map(s => (
                      <option key={s.waybill} value={s.waybill}>
                        {s.waybill} ({s.customer.split(" ")[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Drag zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed p-8 text-center rounded-sm transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center min-h-[200px] ${
                    dragOver 
                      ? "border-[#D4A017] bg-yellow-50/50 scale-102" 
                      : "border-gray-300 bg-slate-50 hover:bg-slate-100/70 hover:border-[#0B1F3A]"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                  <Upload className={`w-10 h-10 mb-4 transition-transform duration-300 ${dragOver ? "text-[#D4A017] -translate-y-1 scale-110" : "text-[#D4A017]"}`} />
                  <div className="font-bold text-[#0B1F3A] mb-1 text-sm">Drag & Drop or Click to Upload</div>
                  <div className="text-[10px] text-slate-500 font-medium">PDF, JPG, PNG or TIFF (Max 15MB)</div>
                  
                  {dragOver && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[#D4A017]/5 flex items-center justify-center font-bold text-xs text-[#D4A017]"
                    >
                      Drop File Here
                    </motion.div>
                  )}
                </div>

                {/* Uploading Status */}
                <AnimatePresence>
                  {uploading && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: "auto" }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 border-t border-gray-150 pt-4"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-650 mb-2">
                        <span className="truncate max-w-[70%]">Uploading: {uploadingFileName}</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#D4A017] h-full transition-all duration-150" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        Initiating OCR compliance matching...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Compliance Guidelines */}
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4A017]" /> Regional Customs Guidelines
                </h3>
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Commercial invoice valuations must align with the declared customs codes of the SADC zone.</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Packing list item counts must correlate with SADC cargo manifests.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Browser Area */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Category Filter bar */}
              <div className="bg-white border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                  {["All", ...CATEGORIES].map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 text-xs font-bold border transition-all uppercase tracking-wider whitespace-nowrap focus:outline-none ${
                        activeCategory === category 
                          ? "bg-[#0B1F3A] border-[#0B1F3A] text-white" 
                          : "border-gray-200 text-slate-500 hover:border-[#0B1F3A] hover:text-[#0B1F3A]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search waybill or file..."
                    className="pl-9 pr-4 py-2 w-full border border-gray-200 text-xs font-medium focus:border-[#0B1F3A] focus:ring-1 focus:ring-[#0B1F3A] outline-none bg-slate-50"
                  />
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredDocs.length > 0 ? (
                    filteredDocs.map((doc, idx) => (
                      <motion.div
                        key={idx}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          
                          {/* File Details */}
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-slate-50 border border-gray-200 flex items-center justify-center shrink-0">
                              <FileText className="w-6 h-6 text-[#0B1F3A]" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-[#0B1F3A] text-sm truncate max-w-[280px] sm:max-w-[400px] font-mono">{doc.name}</div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">
                                <span className="font-mono text-[#D4A017]">{doc.waybill}</span>
                                <span>•</span>
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.uploadDate}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action area */}
                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                            
                            {/* Badges */}
                            <div className="text-right">
                              {doc.status === "Approved" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                                </span>
                              )}
                              {doc.status === "Flagged" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-full animate-pulse">
                                  <AlertTriangle className="w-3.5 h-3.5" /> Flagged
                                </span>
                              )}
                              {doc.status === "Under Review" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                  <Clock className="w-3.5 h-3.5" /> Audit Review
                                </span>
                              )}
                            </div>

                            <Link 
                              href={`/dashboard/shipments/${doc.waybill}`} 
                              className="text-xs font-bold text-[#0B1F3A] hover:text-[#D4A017] uppercase tracking-wider"
                            >
                              Audit Record
                            </Link>

                          </div>

                        </div>

                        {/* Status Description Callout */}
                        {((doc as any).statusText || doc.status === "Flagged") && (
                          <div className={`mt-4 p-3 text-xs flex gap-2 border-t font-medium ${
                            doc.status === "Approved" ? "bg-green-50/30 border-green-100 text-green-800" :
                            doc.status === "Flagged" ? "bg-red-50/50 border-red-150 text-red-800" :
                            "bg-amber-50/30 border-amber-100 text-amber-800"
                          }`}>
                            <span className="font-bold uppercase tracking-wide">AI Audit Logs:</span>
                            <span className="flex-1">
                              {(doc as any).statusText || "Discrepancy detected in declared permit weights."}
                            </span>
                          </div>
                        )}

                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-center py-20 bg-white border border-gray-200 shadow-sm"
                    >
                      <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">No Documents Found</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        No paperwork records match the search terms in this category tab.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
