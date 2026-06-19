"use client";

import { motion } from "framer-motion";
import { HardHat, Tractor, Factory, Users, ShoppingCart, Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function IndustriesPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const industries = [
    { id: "mining", title: "Mining & Resources", icon: HardHat, desc: "We provide specialized heavy-haul transportation, rapid customs clearance for critical machinery, and secure supply chain management for mining operations across the Copperbelt, South Africa, and Botswana." },
    { id: "agriculture", title: "Agriculture", icon: Tractor, desc: "Temperature-controlled freight and expedited cross-border processing to ensure agricultural products, fertilizers, and equipment reach their destinations safely and on time." },
    { id: "construction", title: "Construction", icon: Factory, desc: "End-to-end logistics for mega-projects, including the movement of oversized cargo, building materials, and heavy construction equipment across regional borders." },
    { id: "manufacturing", title: "Manufacturing", icon: Users, desc: "Just-in-time delivery solutions, raw material supply chain management, and finished goods distribution for the regional manufacturing sector." },
    { id: "retail", title: "Retail Distribution", icon: ShoppingCart, desc: "Streamlined regional distribution networks, warehousing, and fast-moving consumer goods (FMCG) logistics to keep retail shelves stocked." },
    { id: "fmcg", title: "FMCG", icon: Coffee, desc: "High-velocity supply chain management for Fast-Moving Consumer Goods, prioritizing speed to market and shelf-life preservation." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="bg-dfs-navy text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Specialized Sectors</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">Industries We Serve</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              Every industry has unique logistical challenges. TradeFlow OS delivers tailored, sector-specific solutions that drive efficiency and growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-dfs-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <motion.div 
                key={ind.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 p-8 shadow-xl shadow-dfs-navy/5 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <div className="w-16 h-16 bg-dfs-navy flex items-center justify-center mb-6 shadow-md shadow-dfs-navy/20">
                  <ind.icon className="w-8 h-8 text-dfs-gold" />
                </div>
                <h2 className="text-2xl font-bold text-dfs-navy mb-4">{ind.title}</h2>
                <p className="text-slate-600 leading-relaxed flex-1 mb-8">
                  {ind.desc}
                </p>
                <Link href="/contact" className="inline-flex items-center text-dfs-navy font-bold hover:text-dfs-gold transition-colors uppercase text-sm tracking-wider">
                  Discuss Requirements <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
