"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertTriangle, Clock, Trash2, ShieldCheck, Filter, FileCheck, Check, Search } from "lucide-react";
import Link from "next/link";

interface MockFile {
  id: string;
  name: string;
  category: "Commercial Invoice" | "Packing List" | "Bill of Lading" | "Import Permit" | "Certificate of Origin";
  size: string;
  uploadDate: string;
  status: "Approved" | "Under Review" | "Flagged";
  statusText?: string;
}

const CATEGORIES = [
  "Commercial Invoice",
  "Packing List",
  "Bill of Lading",
  "Import Permit",
  "Certificate of Origin"
] as const;

export default function StandaloneDocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<MockFile[]>([
    {
      id: "DOC-001",
      name: "Commercial_Invoice_INV29001.pdf",
      category: "Commercial Invoice",
      size: "1.2 MB",
      uploadDate: "Jun 19, 2026 14:22",
      status: "Approved",
      statusText: "OCR Verification passed. Customs values match."
    },
    {
      id: "DOC-002",
      name: "Packing_List_PK9902_V2.pdf",
      category: "Packing List",
      size: "820 KB",
      uploadDate: "Jun 19, 2026 14:24",
      status: "Approved",
      statusText: "Net weights match declared Commercial Invoice."
    },
    {
      id: "DOC-003",
      name: "Import_Permit_BURS_Reg4.pdf",
      category: "Import Permit",
      size: "2.4 MB",
      uploadDate: "Jun 18, 2026 10:15",
      status: "Flagged",
      statusText: "Flagged: Consignee VAT Number mismatch vs Commercial Invoice."
    },
    {
      id: "DOC-004",
      name: "Bill_of_Lading_MSC_88291.pdf",
      category: "Bill of Lading",
      size: "3.1 MB",
      uploadDate: "Jun 17, 2026 16:45",
      status: "Approved",
      statusText: "Pre-clearance manifest sent to border post."
    },
    {
      id: "DOC-005",
      name: "Cert_Origin_SADC_PTA.pdf",
      category: "Certificate of Origin",
      size: "950 KB",
      uploadDate: "Jun 16, 2026 11:30",
      status: "Under Review",
      statusText: "Awaiting manual customs agent validation."
    }
  ]);

  const simulateUpload = (fileName: string) => {
    setUploading(true);
    setUploadingFileName(fileName);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Pick a random category or default to Commercial Invoice
            const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
            const randomStatus = Math.random() > 0.35 ? "Approved" : Math.random() > 0.5 ? "Under Review" : "Flagged";
            const randomStatusText = 
              randomStatus === "Approved" ? "OCR scan passed. Clean matching." :
              randomStatus === "Flagged" ? "Flagged: Verification failed. HS Code matches missing declaration." :
              "Awaiting customs clerk review.";

            const newFile: MockFile = {
              id: `DOC-00${files.length + 6}`,
              name: fileName,
              category: randomCategory,
              size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
              uploadDate: new Date().toLocaleString("en-US", { hour12: false }).replace(",", ""),
              status: randomStatus as any,
              statusText: randomStatusText
            };

            setFiles(prevFiles => [newFile, ...prevFiles]);
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

  const handleDelete = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const filteredFiles = files.filter(file => {
    const matchesCategory = activeCategory === "All" || file.category === activeCategory;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <section className="bg-[#0B1F3A] text-white pt-28 pb-12 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#D4A017] text-xs font-bold uppercase tracking-wider mb-3">
                <FileCheck className="w-3.5 h-3.5" /> Operations Engine
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">Document Management</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl font-light">
                Securely upload and manage cross-border clearances, bills of lading, and import permits. Run automated OCR pre-audits instantly.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/dashboard" className="bg-white/10 border border-white/20 px-5 py-2.5 text-xs font-bold hover:bg-white/20 transition-all uppercase tracking-wider text-center flex items-center">
                Client Portal
              </Link>
              <Link href="/assistant" className="bg-[#D4A017] text-white px-5 py-2.5 text-xs font-bold hover:bg-yellow-500 transition-all uppercase tracking-wider text-center flex items-center shadow-lg shadow-[#D4A017]/10">
                AI Assistant
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
                <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Upload Document</h2>
                
                {/* Drag zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed p-8 text-center rounded-sm transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] ${
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
                  <div className="text-[10px] text-slate-500 font-medium">Supports PDF, JPG, PNG or TIFF (Max 15MB)</div>
                  
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
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
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
                        Scanning via DFS OCR Compliance checks...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Compliance Guidelines */}
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4A017]" /> Customs Compliance Standards
                </h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Always ensure invoice currency (ZAR, USD, EUR) is explicitly stated for tariff calculation.</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Packing list weights must match the Bill of Lading net weights within a 1% threshold.</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Certificate of Origin must list the SADC exporter registration number for tariff exemptions.</span>
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
                    placeholder="Search documents..."
                    className="pl-9 pr-4 py-2 w-full border border-gray-200 text-xs font-medium focus:border-[#0B1F3A] focus:ring-1 focus:ring-[#0B1F3A] outline-none bg-slate-50"
                  />
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                      <motion.div
                        key={file.id}
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
                              <div className="font-bold text-[#0B1F3A] text-sm truncate max-w-[280px] sm:max-w-[400px]">{file.name}</div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">
                                <span>{file.category}</span>
                                <span>•</span>
                                <span>{file.size}</span>
                                <span>•</span>
                                <span>{file.uploadDate}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action area */}
                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                            
                            {/* Badges */}
                            <div className="text-right">
                              {file.status === "Approved" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                                </span>
                              )}
                              {file.status === "Flagged" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                  <AlertTriangle className="w-3.5 h-3.5" /> Flagged
                                </span>
                              )}
                              {file.status === "Under Review" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                  <Clock className="w-3.5 h-3.5 animate-pulse" /> Reviewing
                                </span>
                              )}
                            </div>

                            {/* Actions */}
                            <button
                              onClick={() => handleDelete(file.id)}
                              className="text-slate-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-sm"
                              title="Delete file"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>

                          </div>

                        </div>

                        {/* Status Description Callout */}
                        {file.statusText && (
                          <div className={`mt-4 p-3 text-xs flex gap-2 border-t font-medium ${
                            file.status === "Approved" ? "bg-green-50/30 border-green-100 text-green-800" :
                            file.status === "Flagged" ? "bg-red-50/50 border-red-150 text-red-800" :
                            "bg-amber-50/30 border-amber-100 text-amber-800"
                          }`}>
                            <span className="font-bold uppercase tracking-wide">AI Audit:</span>
                            <span className="flex-1">{file.statusText}</span>
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
                        We couldn't find any documents matching your category or search criteria. Drag and drop files on the left to add them.
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
