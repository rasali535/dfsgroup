"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, MapPin, Globe, Award, Target, Package, 
  Truck, Navigation, Zap, FileCheck, CheckCircle2, Factory, 
  Tractor, HardHat, ShoppingCart, Coffee, Users
} from "lucide-react";

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dfs-navy text-white">
        {/* Subtle Map Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dfs-navy via-dfs-navy/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-dfs-gold text-sm font-bold uppercase tracking-widest mb-8"
            >
              <div className="w-2 h-2 bg-dfs-gold rounded-full animate-pulse"></div>
              Southern Africa's Logistics Leader
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]"
            >
              Moving Cargo <br/> Across Borders <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dfs-gold to-yellow-200">With Confidence.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed"
            >
              Customs Clearing, Freight Forwarding, Transportation, Warehousing and Logistics Solutions Across Southern Africa.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/quote" className="bg-dfs-gold text-white px-8 py-4 font-bold hover:bg-yellow-500 transition-colors flex items-center gap-2 text-lg shadow-xl shadow-dfs-gold/20">
                Request Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/tracking" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 font-bold hover:bg-white/20 transition-colors flex items-center gap-2 text-lg">
                Track Shipment
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS */}
      <section className="bg-dfs-light border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 border-x border-gray-200">
            {[
              { label: "Countries Served", value: "6+", icon: Globe },
              { label: "Cross-Border Expertise", value: "100%", icon: Navigation },
              { label: "Industry Experience", value: "15 Yrs", icon: Award },
              { label: "Reliable Logistics Partner", value: "24/7", icon: Target },
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} className="p-8 text-center bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center"
              >
                <stat.icon className="w-8 h-8 text-dfs-gold mb-4" strokeWidth={1.5} />
                <div className="text-4xl font-extrabold text-dfs-navy mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-4">Core Competencies</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-dfs-navy mb-6">End-to-End Logistics Solutions</h3>
            <p className="text-lg text-slate-600">From complex cross-border documentation to reliable heavy freight transportation, we deliver enterprise-grade performance.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Customs Clearing", desc: "Expert navigation of cross-border documentation, tariffs, and regulatory compliance.", icon: FileCheck },
              { title: "Freight Forwarding", desc: "Seamless air, sea, and road freight management connecting global supply chains.", icon: Globe },
              { title: "Transportation", desc: "Reliable fleet operations ensuring safe and timely delivery across the continent.", icon: Truck },
              { title: "Warehousing", desc: "Secure, technologically-integrated storage and distribution facilities.", icon: Package },
              { title: "Cross-Border Logistics", desc: "Specialized routing and processing for fluid movement across Southern African borders.", icon: Navigation },
            ].map((service, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-dfs-light border border-gray-100 p-8 hover:shadow-2xl hover:shadow-dfs-navy/5 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <service.icon className="w-32 h-32 text-dfs-navy" />
                </div>
                <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center mb-6 relative z-10 border border-gray-100">
                  <service.icon className="w-6 h-6 text-dfs-gold" />
                </div>
                <h4 className="text-2xl font-bold text-dfs-navy mb-4 relative z-10">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-8 relative z-10">{service.desc}</p>
                <Link href="/services" className="inline-flex items-center text-dfs-navy font-bold hover:text-dfs-gold transition-colors relative z-10 uppercase text-sm tracking-wider">
                  Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WHY DFS SECTION (Split Screen) */}
      <section className="bg-dfs-navy text-white overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <div className="lg:w-1/2 relative min-h-[400px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed3c84a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-dfs-navy/40 mix-blend-multiply"></div>
          </div>
          <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-4">Why Choose Us</motion.h2>
              <motion.h3 variants={fadeUp} className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">The Partner of Choice for Regional Trade</motion.h3>
              
              <div className="space-y-6">
                {[
                  "Unrivaled Customs Expertise",
                  "Comprehensive Regional Coverage",
                  "Consistently Reliable Delivery",
                  "Dedicated Professional Team",
                  "Technology-Driven Operations"
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 bg-white/5 p-4 border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-dfs-gold shrink-0" />
                    <span className="text-lg font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. COVERAGE SECTION */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-4">Our Network</motion.h2>
              <motion.h3 variants={fadeUp} className="text-4xl lg:text-5xl font-extrabold text-dfs-navy mb-6">Southern Africa Coverage</motion.h3>
              <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-10 leading-relaxed">
                We operate across the most critical trade corridors in Southern Africa, providing seamless logistics solutions bridging major economic hubs.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-4">
                {['Botswana', 'South Africa', 'Zimbabwe', 'Zambia', 'Namibia', 'Mozambique'].map((country, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-dfs-gold rounded-full"></div>
                    <span className="text-dfs-navy font-bold text-lg">{country}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative h-[500px] bg-dfs-light rounded-3xl border border-gray-200 flex items-center justify-center shadow-2xl shadow-dfs-navy/5"
            >
              {/* Placeholder for interactive map graphic */}
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-dfs-gold mx-auto mb-6 opacity-50 animate-bounce" />
                <h4 className="text-2xl font-bold text-dfs-navy mb-2">Regional Operations Map</h4>
                <p className="text-slate-500">Interactive corridor visualization connecting Gaborone, Johannesburg, Lusaka, and Harare.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS SECTION */}
      <section className="py-24 bg-dfs-light border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-4">How It Works</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-dfs-navy">Streamlined Workflow</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Request Quote", desc: "Submit details via our portal for competitive regional pricing." },
              { step: "02", title: "Document Verification", desc: "Our team ensures all customs and compliance documents are perfect." },
              { step: "03", title: "Customs Clearance", desc: "Rapid processing at borders leveraging our authorized status." },
              { step: "04", title: "Delivery", desc: "Final mile execution with full tracking visibility." }
            ].map((item, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="relative bg-white p-8 border border-gray-100 shadow-lg shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-dfs-light mb-4">{item.step}</div>
                <h4 className="text-xl font-bold text-dfs-navy mb-3 relative z-10">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed relative z-10">{item.desc}</p>
                {/* Visual Connector Line */}
                {i < 3 && <div className="hidden md:block absolute top-12 -right-4 w-8 border-t-2 border-dashed border-gray-300 z-0"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES SERVED */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-4">Specialized Sectors</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-dfs-navy">Industries We Serve</h3>
            </div>
            <Link href="/industries" className="inline-flex items-center font-bold text-dfs-navy hover:text-dfs-gold transition-colors">
              View All Industries <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Mining", icon: HardHat },
              { title: "Agriculture", icon: Tractor },
              { title: "Construction", icon: Factory },
              { title: "Manufacturing", icon: Users },
              { title: "Retail", icon: ShoppingCart },
              { title: "FMCG", icon: Coffee },
            ].map((ind, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-dfs-light border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:bg-dfs-navy hover:text-white transition-colors group cursor-pointer"
              >
                <ind.icon className="w-10 h-10 text-dfs-navy group-hover:text-dfs-gold transition-colors mb-4" />
                <h4 className="font-bold">{ind.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-dfs-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-4">Client Success</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold">Trusted by Enterprises</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "DFS Group has completely transformed our supply chain reliability. Their cross-border customs clearance speed is unmatched in the region.", author: "Mining Corp Ltd" },
              { quote: "Compliance used to be our biggest bottleneck. Partnering with DFS brought full visibility and zero delays to our manufacturing imports.", author: "Global Manufacturing" },
              { quote: "Outstanding delivery performance. When we need secure, fast transportation across Southern Africa, DFS is our only choice.", author: "Regional Retailers" }
            ].map((test, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm"
              >
                <div className="flex text-dfs-gold mb-6">
                  {[...Array(5)].map((_, j) => <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-slate-300 italic mb-8 leading-relaxed">"{test.quote}"</p>
                <h4 className="font-bold text-white tracking-wide">— {test.author}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-32 relative overflow-hidden bg-dfs-light">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-dfs-navy mb-8 tracking-tight">Ready To Move Your Cargo?</h2>
            <p className="text-xl text-slate-600 mb-12">Partner with the region's most reliable logistics and customs experts.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/quote" className="bg-dfs-navy text-white px-10 py-5 font-bold hover:bg-dfs-navy/90 transition-colors text-lg shadow-2xl shadow-dfs-navy/20">
                Request Quote
              </Link>
              <Link href="/contact" className="bg-white text-dfs-navy border-2 border-dfs-navy px-10 py-5 font-bold hover:bg-slate-50 transition-colors text-lg">
                Contact DFS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
