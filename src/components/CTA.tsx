"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="relative glass p-6 sm:p-12 md:p-24 rounded-[2rem] sm:rounded-[4rem] border border-white/10 overflow-hidden group">
        {/* Animated background background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full group-hover:bg-brand-primary/20 transition-colors duration-700" />
          <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-brand-secondary/10 blur-[120px] rounded-full group-hover:bg-brand-secondary/20 transition-colors duration-700" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-12"
          >
            <Sparkles className="text-brand-primary" size={16} />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-white/80">
              Transform your diet today
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
            Ready to Take Control <br />
            <span className="text-gradient">of Your Nutrition?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mb-16 font-medium leading-relaxed">
            Join thousands who are already eating smarter with DietPilot AI. It takes less than a minute to get started.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-20 w-full md:w-auto">
            <a 
              href="https://github.com/user-attachments/assets/c7ace37d-013d-4ebc-800a-52dffbdf0963"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative px-10 py-5 bg-brand-primary text-obsidian rounded-2xl font-black text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center"
            >
              CHECK OUT DEMO <Play size={20} fill="currentColor" />
            </a>
            <a 
              href="https://github.com/anshulhq/DietPilot-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 glass text-white rounded-2xl font-black text-lg border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 w-full md:w-auto justify-center group/gh"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/gh:rotate-12 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GITHUB
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">10K+</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-brand-primary mb-2 italic">AI</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Powered</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">100%</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
