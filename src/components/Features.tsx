"use client";

import { motion } from "framer-motion";
import { Sparkles, Activity, ChartBar } from "lucide-react";
import GlowCard from "./GlowCard";

const features = [
  {
    title: "AI-Powered Recipes",
    desc: "Get intelligent recipe suggestions based on natural language. Our RAG-powered assistant understands exactly what you're looking for.",
    icon: Sparkles,
    color: "text-brand-primary",
    glow: "rgba(0, 255, 163, 0.15)",
  },
  {
    title: "Personalized Plans",
    desc: "Your profile and health goals drive suggestions that help you achieve your targets — weight loss, muscle gain, or maintenance.",
    icon: Activity,
    color: "text-brand-secondary",
    glow: "rgba(0, 102, 255, 0.15)",
  },
  {
    title: "Track Your Progress",
    desc: "Log meals and visually track your daily calorie and macro intake against your personalized goals on an interactive dashboard.",
    icon: ChartBar,
    color: "text-white",
    glow: "rgba(255, 255, 255, 0.1)",
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase">
          EVERYTHING YOU <span className="text-white/20">NEED.</span>
        </h2>
        <p className="text-xl text-white/50 font-medium max-w-2xl mx-auto">
          Powered by AI to make nutrition tracking effortless and personalized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="h-full"
          >
            <GlowCard 
              glowColor={f.glow}
              className="glass rounded-3xl sm:rounded-[3.5rem] border border-white/10 hover:border-brand-primary/30 transition-all group relative overflow-hidden h-full"
              innerClassName="p-6 sm:p-12 flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <f.icon size={120} />
              </div>
              
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 ${f.color}`}>
                <f.icon size={32} />
              </div>
              
              <h3 className="text-3xl font-black mb-6 tracking-tight uppercase leading-tight">{f.title}</h3>
              <p className="text-lg text-white/40 leading-relaxed font-medium">{f.desc}</p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
