"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="bg-dfs-navy text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-6">Company Profile</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">About DFS Group</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              Moving cargo across borders with confidence. We are Southern Africa's premier logistics, customs clearing, and freight forwarding partner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-dfs-gold font-bold uppercase tracking-widest text-sm mb-4">Who We Are</h2>
              <h3 className="text-4xl font-extrabold text-dfs-navy mb-6">A Legacy of Logistics Excellence</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                DFS Group was founded on a simple principle: cross-border logistics in Southern Africa shouldn't be a bottleneck. It should be a competitive advantage.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Combining decades of deep regional expertise with a modern, technology-driven operations system, we provide end-to-end supply chain visibility. From customs clearance at busy borders to final-mile delivery, we handle the complexities so our clients can focus on their core business.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <div className="text-4xl font-black text-dfs-navy mb-2">15+</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dfs-navy mb-2">10k+</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Shipments Delivered</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative h-[600px] bg-dfs-light rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-dfs-navy/20 mix-blend-multiply"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-24 bg-dfs-light border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Our Mission", desc: "To completely digitize and streamline the complexities of regional logistics, providing enterprise-grade supply chain visibility and reliable freight forwarding to businesses across Southern Africa." },
              { title: "Our Vision", desc: "To become the absolute standard for cross-border logistics and customs clearance in Africa, powering economic growth through frictionless trade." },
              { title: "Core Values", items: ["Uncompromising Reliability", "Absolute Transparency", "Technological Innovation", "Regional Expertise", "Client-Centricity"] }
            ].map((section, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-white p-10 border border-gray-100 shadow-xl shadow-dfs-navy/5"
              >
                <div className="w-12 h-12 bg-dfs-navy flex items-center justify-center mb-6">
                  <div className="w-4 h-4 bg-dfs-gold"></div>
                </div>
                <h3 className="text-2xl font-bold text-dfs-navy mb-4">{section.title}</h3>
                {section.desc ? (
                  <p className="text-slate-600 leading-relaxed">{section.desc}</p>
                ) : (
                  <ul className="space-y-3">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-dfs-gold" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
