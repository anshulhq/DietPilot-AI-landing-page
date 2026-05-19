"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="relative z-10 text-center max-w-5xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
          <Sparkles className="text-brand-primary" size={16} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
            Powered by Next-Gen RAG Architecture
          </span>
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
          YOUR DIET, <br />
          <span className="text-gradient">AUTOPILOTED.</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
          DietPilot AI is your <span className="text-white">intelligent nutrition assistant</span> that finds delicious recipes based on the ingredients you already have. Save time, reduce waste, and achieve your health goals.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a 
            href="https://github.com/user-attachments/assets/c7ace37d-013d-4ebc-800a-52dffbdf0963"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 bg-brand-primary text-obsidian rounded-2xl font-black text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              WATCH DEMO <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="https://github.com/anshulhq/DietPilot-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 glass text-white rounded-2xl font-black text-lg border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            GITHUB
          </a>
        </div>
      </motion.div>

      {/* Floating Elements / Abstract UI */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-secondary/20 rounded-xl flex items-center justify-center">
            <Brain className="text-brand-secondary" size={24} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Vector Space</div>
            <div className="text-sm font-bold">Semantic Retrieval</div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[10%] hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Status</div>
            <div className="text-sm font-bold">Optimizing Macros</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
