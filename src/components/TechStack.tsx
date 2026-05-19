"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Database, Shield, Zap, Palette, Boxes, Globe } from "lucide-react";

import GlowCard from "./GlowCard";

const stack = [
  { name: "Next.js", role: "Frontend", icon: Globe, color: "text-white", glow: "rgba(255, 255, 255, 0.1)" },
  { name: "FastAPI", role: "Backend", icon: Zap, color: "text-brand-secondary", glow: "rgba(0, 102, 255, 0.1)" },
  { name: "Llama 3", role: "LLM via Groq", icon: Cpu, color: "text-brand-primary", glow: "rgba(0, 255, 163, 0.1)" },
  { name: "LangChain", role: "Orchestration", icon: Boxes, color: "text-white", glow: "rgba(255, 255, 255, 0.1)" },
  { name: "ChromaDB", role: "Vector Store", icon: Database, color: "text-brand-secondary", glow: "rgba(0, 102, 255, 0.1)" },
  { name: "SQLite", role: "Database", icon: Layers, color: "text-white", glow: "rgba(255, 255, 255, 0.1)" },
  { name: "Tailwind CSS", role: "Styling", icon: Palette, color: "text-brand-primary", glow: "rgba(0, 255, 163, 0.1)" },
  { name: "NextAuth.js", role: "Auth", icon: Shield, color: "text-white", glow: "rgba(255, 255, 255, 0.1)" },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-32 bg-surface/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-4">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">
            TECH <span className="text-white/20">STACK.</span>
          </h2>
          <p className="text-xl text-white/40 font-medium">The engine behind the intelligence.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stack.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <GlowCard 
                glowColor={item.glow}
                className="glass rounded-3xl border border-white/5 group h-full"
                innerClassName="p-8 flex flex-col items-center text-center h-full"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors ${item.color}`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-1">{item.name}</h3>
                <p className="text-sm text-white/40 font-bold uppercase tracking-widest">{item.role}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative accent */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
