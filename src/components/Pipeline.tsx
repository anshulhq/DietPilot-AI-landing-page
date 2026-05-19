"use client";

import { motion } from "framer-motion";
import { 
  Box, 
  Search, 
  Cpu, 
  MessageSquare, 
  Database, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Server,
  Code
} from "lucide-react";

import GlowCard from "./GlowCard";

const pipelineSteps = [
  {
    title: "1. User Query & Direct Hit",
    desc: "The system first attempts a direct SQL 'ILIKE' match on the recipe name. If an exact match is found, it's returned instantly in ~2ms.",
    icon: Search,
    color: "text-brand-primary",
    tag: "SQLite Search",
    glow: "rgba(0, 255, 163, 0.1)"
  },
  {
    title: "2. Semantic Embedding",
    desc: "If no direct match exists, the query is converted into a 384-dimensional vector using the 'all-MiniLM-L6-v2' model locally on the server (~8ms).",
    icon: Cpu,
    color: "text-brand-secondary",
    tag: "Sentence-Transformers",
    glow: "rgba(0, 102, 255, 0.1)"
  },
  {
    title: "3. Vector Retrieval",
    desc: "The encoded vector is sent to Pinecone to find the Top-5 most similar recipes based on cosine similarity in sub-100ms.",
    icon: Database,
    color: "text-brand-accent",
    tag: "Pinecone Cloud",
    glow: "rgba(255, 0, 212, 0.1)"
  },
  {
    title: "4. Context Augmentation",
    desc: "Full recipe data (ingredients, steps, macros) is fetched from SQLite and combined with user health goals and chat history.",
    icon: Box,
    color: "text-white",
    tag: "Data Merging",
    glow: "rgba(255, 255, 255, 0.05)"
  },
  {
    title: "5. LLM Generation",
    desc: "The enriched prompt is sent to Llama 3.3 70B via Groq's LPU hardware, generating a grounded, personalized response in ~680ms.",
    icon: MessageSquare,
    color: "text-brand-primary",
    tag: "Llama 3.3 @ Groq",
    glow: "rgba(0, 255, 163, 0.1)"
  }
];

export default function Pipeline() {
  return (
    <section id="pipeline" className="py-32 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">
          THE <span className="text-brand-secondary">PIPELINE.</span>
        </h2>
        <p className="text-xl text-white/40 font-medium max-w-3xl mx-auto">
          An end-to-end deep dive into how DietPilot AI processes your requests using Retrieval-Augmented Generation (RAG).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden lg:block -z-10" />
        
        {pipelineSteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="h-full"
          >
            <GlowCard 
              glowColor={step.glow}
              className="glass rounded-[2.5rem] border border-white/5 group h-full"
              innerClassName="p-8 flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${step.color}`}>
                <step.icon size={28} />
              </div>
              
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-white/60">
                  {step.tag}
                </span>
              </div>

              <h3 className="text-xl font-black mb-4 tracking-tight leading-tight">{step.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-medium flex-grow">{step.desc}</p>
              
              {i < pipelineSteps.length - 1 && (
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-white/10 hidden lg:block">
                  <ArrowRight size={24} />
                </div>
              )}
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Tech Architecture Summary */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-[3rem] border border-white/5 flex items-start gap-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
            <Server className="text-brand-primary" size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Dual-Database Architecture</h4>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              We separate concerns for maximum performance. <span className="text-white">MongoDB</span> handles high-speed authentication, while <span className="text-white">SQLite</span> manages the complex relational mapping between 10K recipes, user logs, and chat histories.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-[3rem] border border-white/5 flex items-start gap-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-secondary/20 flex items-center justify-center flex-shrink-0">
            <Activity className="text-brand-secondary" size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Precision Nutrition Engine</h4>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              Every recommendation is grounded in the <span className="text-white">Mifflin-St Jeor</span> equation. Our engine calculates your BMR and TDEE in real-time, splitting macros into goal-aware targets: Weight Loss, Muscle Gain, or Maintenance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
