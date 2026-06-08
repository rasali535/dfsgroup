"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, X, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardDocuments() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, type: string}[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setUploadedFiles(prevFiles => [...prevFiles, { name: file.name, type: "Commercial Invoice" }]);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-extrabold text-dfs-navy mb-2">Document Center</h1>
        <p className="text-slate-500 mb-8">Manage customs documents and AI verifications.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-dfs-navy mb-4">Upload Document</h2>
              <div className="border-2 border-dashed border-gray-300 bg-slate-50 p-8 text-center rounded-sm hover:bg-slate-100 hover:border-dfs-gold transition-colors relative cursor-pointer">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleUpload} disabled={uploading} />
                <Upload className="w-10 h-10 text-dfs-gold mx-auto mb-4" />
                <div className="font-bold text-dfs-navy mb-1">Drag & Drop or Click</div>
                <div className="text-xs text-slate-500">PDF, JPG, PNG up to 10MB</div>
              </div>
              
              {uploading && (
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Uploading & Scanning...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-dfs-gold h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-dfs-navy text-white p-6 rounded-sm shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10"><FileText className="w-32 h-32" /></div>
              <h3 className="font-bold mb-2 relative z-10">AI Verification Active</h3>
              <p className="text-slate-300 text-sm mb-4 relative z-10">Documents are automatically verified by our AI Customs Assistant to ensure compliance before border arrival.</p>
              <Link href="/portal/ai" className="inline-block bg-dfs-gold text-white px-4 py-2 text-sm font-bold hover:bg-yellow-500 transition-colors relative z-10">
                Open AI Assistant
              </Link>
            </div>
          </motion.div>

          {/* File List */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="bg-white border border-gray-200 shadow-sm min-h-full">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-dfs-navy">Recent Files</h2>
              </div>
              <div className="p-6 space-y-4">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 flex items-center justify-center text-green-600 rounded">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-dfs-navy">{file.name}</div>
                        <div className="text-xs text-slate-500">{file.type} • AI Verified</div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                ))}
                
                {/* Fake existing documents */}
                <div className="flex items-center justify-between p-4 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-dfs-light flex items-center justify-center text-dfs-navy rounded border border-gray-200">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-dfs-navy">Bill_of_Lading_001.pdf</div>
                      <div className="text-xs text-slate-500">Bill of Lading • Jun 01, 2026</div>
                    </div>
                  </div>
                  <button className="text-dfs-gold font-bold text-sm hover:underline">Download</button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-amber-200 bg-amber-50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-100 flex items-center justify-center text-amber-600 rounded">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-dfs-navy">Commercial_Invoice_Pending.pdf</div>
                      <div className="text-xs text-amber-700">Action Required • AI flagged weight mismatch vs Waybill</div>
                    </div>
                  </div>
                  <Link href="/portal/ai" className="text-dfs-navy font-bold text-sm hover:underline bg-white px-3 py-1 border border-amber-200 shadow-sm">Review in AI</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
