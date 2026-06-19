"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, User, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthGateProps {
  children: React.ReactNode;
  allowedRole: 'client' | 'admin';
}

export function AuthGate({ children, allowedRole }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem(`tradeflow_auth_${allowedRole}`);
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [allowedRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const emailLower = email.trim().toLowerCase();
      if (allowedRole === 'client') {
        if (emailLower === "client.global@example.com" && password === "client_tf_2026") {
          localStorage.setItem('tradeflow_auth_client', 'true');
          localStorage.setItem('tradeflow_client_name', 'Global Retail Ltd');
          localStorage.setItem('tradeflow_client_id', 'CUST-8829');
          setIsAuthenticated(true);
        } else if (emailLower === "client.mining@example.com" && password === "mining_tf_2026") {
          localStorage.setItem('tradeflow_auth_client', 'true');
          localStorage.setItem('tradeflow_client_name', 'Mining Corp Ltd');
          localStorage.setItem('tradeflow_client_id', 'CUST-1044');
          setIsAuthenticated(true);
        } else if (emailLower === "client.agritech@example.com" && password === "agri_tf_2026") {
          localStorage.setItem('tradeflow_auth_client', 'true');
          localStorage.setItem('tradeflow_client_name', 'AgriTech Solutions');
          localStorage.setItem('tradeflow_client_id', 'CUST-5591');
          setIsAuthenticated(true);
        } else {
          setError("Invalid credentials. Please use an authorized client email and password.");
        }
      } else {
        // Admin Roles
        if (emailLower === "admin@tradeflowos.com" && password === "admin_tf_2026") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'superadmin');
          setIsAuthenticated(true);
        } else if (emailLower === "fleet.manager@tradeflowos.com" && password === "fleet_tf_2026") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'fleet_manager');
          setIsAuthenticated(true);
        } else if (emailLower === "customs.agent@tradeflowos.com" && password === "customs_tf_2026") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'customs_agent');
          setIsAuthenticated(true);
        } else if (emailLower === "manager@tradeflowos.com" && password === "manager_tf_2026") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'operations_manager');
          setIsAuthenticated(true);
        } else if (emailLower === "compliance@tradeflowos.com" && password === "compliance_tf_2026") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'compliance_officer');
          setIsAuthenticated(true);
        } else {
          setError("Invalid credentials. Please use an authorized staff email and password.");
        }
      }
      setLoading(false);
    }, 1000);
  };

  // Prevent hydration mismatch flashes by rendering nothing until check completes
  if (isAuthenticated === null) return <div className="min-h-screen bg-slate-50"></div>;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-dfs-navy flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white max-w-md w-full p-8 shadow-2xl relative z-10 border-t-4 border-dfs-gold"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {allowedRole === 'admin' ? <ShieldAlert className="w-8 h-8 text-dfs-navy" /> : <User className="w-8 h-8 text-dfs-navy" />}
          </div>
          <h1 className="text-2xl font-black text-dfs-navy">Secure Portal Access</h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-2">
            {allowedRole === 'admin' ? 'Internal Staff Only' : 'Client Login'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 mb-6 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={allowedRole === 'admin' ? "admin@tradeflowos.com" : "client.global@example.com"} 
              className="w-full bg-slate-50 border border-gray-200 p-3 text-dfs-navy focus:border-dfs-navy outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••" 
                className="w-full bg-slate-50 border border-gray-200 p-3 pl-10 text-dfs-navy focus:border-dfs-navy outline-none" 
              />
            </div>
            {allowedRole === 'client' ? (
              <div className="text-[10px] text-slate-450 mt-2 space-y-1 font-medium bg-slate-50 p-2.5 border border-gray-150 rounded">
                <p className="font-bold uppercase tracking-wider text-slate-550 mb-1">Simulated Accounts:</p>
                <p>Global Retail: <strong>client.global@example.com</strong> / <strong>client_tf_2026</strong></p>
                <p>Mining Corp: <strong>client.mining@example.com</strong> / <strong>mining_tf_2026</strong></p>
                <p>AgriTech: <strong>client.agritech@example.com</strong> / <strong>agri_tf_2026</strong></p>
              </div>
            ) : (
              <div className="text-[10px] text-slate-450 mt-2 space-y-1 font-medium bg-slate-50 p-2.5 border border-gray-150 rounded">
                <p className="font-bold uppercase tracking-wider text-slate-550 mb-1">Authorized Accounts:</p>
                <p>Superadmin: <strong>admin@tradeflowos.com</strong> / <strong>admin_tf_2026</strong></p>
                <p>Fleet Mgr: <strong>fleet.manager@tradeflowos.com</strong> / <strong>fleet_tf_2026</strong></p>
                <p>Customs Agt: <strong>customs.agent@tradeflowos.com</strong> / <strong>customs_tf_2026</strong></p>
                <p>Ops Mgr: <strong>manager@tradeflowos.com</strong> / <strong>manager_tf_2026</strong></p>
                <p>Compliance: <strong>compliance@tradeflowos.com</strong> / <strong>compliance_tf_2026</strong></p>
              </div>
            )}
          </div>

          <button 
            disabled={loading} 
            type="submit" 
            className="w-full bg-dfs-navy text-white font-bold py-4 hover:bg-dfs-gold transition-colors flex justify-center items-center"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Authenticate"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
