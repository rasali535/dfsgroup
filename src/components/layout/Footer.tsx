import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dfs-navy text-white pt-20 pb-10 border-t-4 border-dfs-gold">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-dfs-gold flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-tighter">TF</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white leading-none tracking-tight">
                  TradeFlow
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-dfs-gold mt-0.5">
                  Operating System
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Moving cargo across borders with confidence. Southern Africa's premier digital logistics and customs clearing platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-300">
              <li><Link href="/about" className="hover:text-dfs-gold transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-dfs-gold transition-colors">Our Services</Link></li>
              <li><Link href="/industries" className="hover:text-dfs-gold transition-colors">Industries Served</Link></li>
              <li><Link href="/tracking" className="hover:text-dfs-gold transition-colors">Track Shipment</Link></li>
              <li><Link href="/quote" className="hover:text-dfs-gold transition-colors">Request Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dfs-gold shrink-0" />
                <span className="leading-relaxed">Plot 453, Enterprise Park<br/>Gaborone, Botswana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-dfs-gold shrink-0" />
                <span>+267 390 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-dfs-gold shrink-0" />
                <span>operations@tradeflowos.com</span>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h4 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Digital Platform</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-300">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Client Portal Login</Link></li>
              <li><Link href="/portal/ai" className="hover:text-white transition-colors">AI Customs Assistant</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Agent Operations</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <div>&copy; {new Date().getFullYear()} TradeFlow OS. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
          <div className="text-slate-600">
            web platform dev by <a href="#" className="text-dfs-gold hover:underline">Ras Ali Labs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
