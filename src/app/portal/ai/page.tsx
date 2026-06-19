"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortalAIRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/assistant");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#0B1F3A] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Routing to DFS AI Co-pilot...</p>
      </div>
    </div>
  );
}
