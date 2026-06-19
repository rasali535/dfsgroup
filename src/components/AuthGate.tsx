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
      if (allowedRole === 'client') {
        if (email === "client@example.com" && password === "user123") {
          localStorage.setItem('tradeflow_auth_client', 'true');
          setIsAuthenticated(true);
        } else {
          setError("Invalid credentials. Try client@example.com / user123");
        }
      } else {
        // Admin Roles
        if (email === "superadmin@tradeflowos.com" && password === "super123") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'superadmin');
          setIsAuthenticated(true);
        } else if (email === "fleet@tradeflowos.com" && password === "fleet123") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'fleet_manager');
          setIsAuthenticated(true);
        } else if (email === "customs@tradeflowos.com" && password === "customs123") {
          localStorage.setItem('tradeflow_auth_admin', 'true');
          localStorage.setItem('tradeflow_admin_role', 'customs_agent');
          setIsAuthenticated(true);
        } else {
          setError("Invalid credentials. Please check your admin email and password.");
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
              placeholder={allowedRole === 'admin' ? "admin@dfsgroup.com" : "client@company.com"} 
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
              <p className="text-xs text-slate-400 text-right">Credentials: <strong>client@example.com / user123</strong></p>
            ) : (
              <div className="text-xs text-slate-400 mt-2 space-y-1 font-medium">
                <p>Authorized Accounts:</p>
                <p>superadmin@dfsgroup.com / super123</p>
                <p>fleet@dfsgroup.com / fleet123</p>
                <p>customs@dfsgroup.com / customs123</p>
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
