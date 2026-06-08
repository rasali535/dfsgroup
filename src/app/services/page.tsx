"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Package, MapPin, Zap, ArrowRight, FileCheck, Truck, Navigation } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    { 
      title: "Customs Clearing", 
      overview: "Expert navigation of cross-border documentation, tariffs, and regulatory compliance. We act as your authorized agent to ensure swift processing.",
      benefits: ["Automated document verification", "Reduced border delays", "Compliance guarantee"],
      icon: ShieldCheck 
    },
    { 
      title: "Freight Forwarding", 
      overview: "Seamless air, sea, and road freight management connecting global supply chains directly to Southern Africa.",
      benefits: ["Global network access", "Optimized routing", "Real-time visibility"],
      icon: Package 
    },
    { 
      title: "Transportation", 
      overview: "Reliable fleet operations ensuring safe and timely delivery across the continent, handling everything from small parcels to oversized cargo.",
      benefits: ["GPS tracked fleet", "Secure transport", "Flexible capacity"],
      icon: Truck 
    },
    { 
      title: "Warehousing", 
      overview: "Secure, technologically-integrated storage and distribution facilities located at strategic regional hubs.",
      benefits: ["Inventory management", "Cross-docking", "Secure facilities"],
      icon: Zap 
    },
    { 
      title: "Cross-Border Logistics", 
      overview: "Specialized routing and processing for fluid movement across Southern African borders, minimizing downtime.",
      benefits: ["Pre-clearance processing", "Corridor expertise", "Dedicated liaison"],
      icon: Navigation 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="bg-dfs-navy text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Core Solutions</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">Our Services</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              Comprehensive logistics, freight forwarding, and customs clearance solutions powered by our regional network and deep expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-24">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
            >
              <div className="lg:w-1/2 w-full">
                <div className="bg-dfs-light rounded-sm h-[400px] border border-gray-100 flex items-center justify-center shadow-2xl shadow-dfs-navy/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-dfs-navy/5 group-hover:bg-dfs-navy/10 transition-colors"></div>
                  <service.icon className="w-32 h-32 text-dfs-navy/20 group-hover:text-dfs-gold/80 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="w-16 h-16 bg-dfs-navy flex items-center justify-center mb-6 shadow-md shadow-dfs-navy/20">
                  <service.icon className="w-8 h-8 text-dfs-gold" />
                </div>
                <h2 className="text-4xl font-extrabold text-dfs-navy mb-6">{service.title}</h2>
                <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Overview</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {service.overview}
                </p>
                <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Key Benefits</h3>
                <ul className="space-y-3 mb-8">
                  {service.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600">
                      <div className="w-2 h-2 bg-dfs-gold rounded-full"></div>
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/quote" className="inline-flex items-center text-white bg-dfs-navy px-8 py-4 font-bold hover:bg-dfs-gold transition-colors shadow-lg">
                  Request Service Quote <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
