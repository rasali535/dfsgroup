"use client";

import Link from "next/link";
import { LayoutDashboard, Package, FileText, FileSignature, LogOut, Settings } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate allowedRole="client">
      <div className="flex min-h-[calc(100vh-5rem)] bg-dfs-light">
        {/* Sidebar */}
        <aside className="w-64 bg-dfs-navy text-white flex flex-col hidden md:flex shrink-0 border-r border-dfs-navy/20">
          <div className="p-6 border-b border-white/10">
            <div className="text-xs font-bold text-dfs-gold uppercase tracking-widest mb-1">Client Portal</div>
            <div className="font-bold text-lg">Global Retail Ltd</div>
            <div className="text-xs text-slate-400">ID: CUST-8829</div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Overview
            </Link>
            <Link href="/dashboard/shipments" className="flex items-center gap-3 px-4 py-3 rounded-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
              <Package className="w-5 h-5" /> Shipments
            </Link>
            <Link href="/dashboard/documents" className="flex items-center gap-3 px-4 py-3 rounded-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
              <FileText className="w-5 h-5" /> Documents
            </Link>
            <Link href="/dashboard/quotes" className="flex items-center gap-3 px-4 py-3 rounded-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
              <FileSignature className="w-5 h-5" /> Quotes
            </Link>
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors text-sm">
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <button 
              onClick={() => { localStorage.removeItem('tradeflow_auth_client'); window.location.reload(); }} 
              className="w-full flex items-center gap-3 px-4 py-2 rounded-sm font-medium text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </AuthGate>
  );
}
