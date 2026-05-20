"use client";

import { motion } from "framer-motion";
import { UserPlus, ChefHat, Trophy } from "lucide-react";

import GlowCard from "./GlowCard";

const steps = [
  {
    id: "Step 01",
    title: "Create Your Profile",
    desc: "Tell us your goals, dietary preferences, and activity level. Our AI calibrates a personalized nutrition plan in seconds.",
    icon: UserPlus,
    color: "bg-brand-primary/20 text-brand-primary",
    glow: "rgba(0, 255, 163, 0.1)"
  },
  {
    id: "Step 02",
    title: "Log & Discover Meals",
    desc: "Browse thousands of recipes or chat with our AI assistant to find meals that perfectly match your macros and taste.",
    icon: ChefHat,
    color: "bg-brand-secondary/20 text-brand-secondary",
    glow: "rgba(0, 102, 255, 0.1)"
  },
  {
    id: "Step 03",
    title: "Track & Achieve",
    desc: "Watch your daily progress in real-time. Hit your protein goals, stay within calorie limits, and build lasting healthy habits.",
    icon: Trophy,
    color: "bg-brand-accent/20 text-brand-accent",
    glow: "rgba(255, 0, 212, 0.1)"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-32">
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">
          HOW IT <span className="text-white/20">WORKS.</span>
        </h2>
        <p className="text-xl text-white/40 font-medium max-w-2xl mx-auto">
          Three Steps to a Healthier You. Getting started takes less than two minutes.
        </p>
      </div>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent opacity-20 hidden md:block" />

        <div className="space-y-24 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 flex justify-center">
                <GlowCard 
                  glowColor={step.glow}
                  className="glass rounded-3xl sm:rounded-[3.5rem] border border-white/10 relative group"
                  innerClassName="p-6 sm:p-12"
                >
                  <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon size={48} />
                  </div>
                  <div className="text-brand-primary font-black tracking-[0.3em] uppercase text-sm mb-4">{step.id}</div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight uppercase leading-tight">{step.title}</h3>
                  <p className="text-lg text-white/40 leading-relaxed font-medium">{step.desc}</p>
                  
                  {/* Decorative number behind */}
                  <div className="absolute -bottom-4 -right-4 text-[10rem] font-black text-white/[0.02] pointer-events-none uppercase leading-none">
                    0{i+1}
                  </div>
                </GlowCard>
              </div>

              {/* Center Dot */}
              <div className="relative hidden md:flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full border-4 border-obsidian ${step.color} relative z-20`} />
                <div className={`absolute w-12 h-12 rounded-full ${step.color} opacity-20 animate-ping`} />
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
