import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-dfs-navy flex items-center justify-center">
              <span className="text-white font-bold text-xl tracking-tighter">DFS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-dfs-navy leading-none tracking-tight">
                GROUP
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-dfs-gold mt-0.5">
                Logistics
              </span>
            </div>
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link href="/" className="text-sm font-semibold text-dfs-navy hover:text-dfs-gold transition-colors">Home</Link>
          <Link href="/about" className="text-sm font-semibold text-dfs-navy hover:text-dfs-gold transition-colors">About Us</Link>
          <Link href="/services" className="text-sm font-semibold text-dfs-navy hover:text-dfs-gold transition-colors">Services</Link>
          <Link href="/industries" className="text-sm font-semibold text-dfs-navy hover:text-dfs-gold transition-colors">Industries</Link>
          <Link href="/contact" className="text-sm font-semibold text-dfs-navy hover:text-dfs-gold transition-colors">Contact</Link>
          <Link href="/tracking" className="text-sm font-semibold text-dfs-navy hover:text-dfs-gold transition-colors">Tracking</Link>
          
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          
          <Link href="/dashboard" className="text-sm font-bold text-dfs-gold hover:text-yellow-500 transition-colors">Client Portal</Link>
          <Link href="/admin" className="text-sm font-bold text-dfs-gold hover:text-yellow-500 transition-colors">Operations Admin</Link>
          <Link href="/documents" className="text-sm font-bold text-dfs-gold hover:text-yellow-500 transition-colors">Document Audit</Link>
          <Link href="/assistant" className="text-sm font-bold text-dfs-gold hover:text-yellow-500 transition-colors">Customs Co-pilot</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/quote" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold transition-all bg-dfs-navy hover:bg-dfs-gold text-white shadow-md">
            Request Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
