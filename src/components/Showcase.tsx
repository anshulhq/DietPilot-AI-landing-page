"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlowCard from "./GlowCard";

const screens = [
  {
    title: "AI Chat Interface",
    src: "/ai_chat.png",
    desc: "Our RAG-powered assistant understands context, dietary preferences, and your health goals. Ask anything — from quick dinner ideas to detailed meal prep plans."
  },
  {
    title: "Live Dashboard",
    src: "/dashboard.png",
    desc: "Monitor calories, protein, carbs, and fats with an intuitive dashboard that updates in real time. See exactly how each meal contributes to your daily targets."
  },
  {
    title: "Recipe Discovery",
    src: "/explore_recipe.png",
    desc: "Browse a vast library of recipes filtered by calories, cooking time, and nutritional content. Every recipe is calibrated to fit seamlessly into your meal plan."
  }
];

export default function Showcase() {
  return (
    <section id="showcase" className="py-32 bg-surface/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">
            THE <span className="text-brand-secondary">INTERFACE.</span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            A premium experience designed for clarity, speed, and actionable insights.
          </p>
        </div>

        <div className="space-y-32">
          {screens.map((screen, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "circOut" }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}
            >
              <div className="flex-1 space-y-6">
                <div className="text-brand-secondary font-black tracking-[0.3em] uppercase text-sm">Step 0{i+1}</div>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight">{screen.title}</h3>
                <p className="text-xl text-white/50 leading-relaxed">{screen.desc}</p>
              </div>
              
              <div className="flex-[1.5] relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <GlowCard 
                  glowColor="rgba(0, 102, 255, 0.2)"
                  className="relative glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                  innerClassName="p-2"
                >
                  <Image 
                    src={screen.src} 
                    alt={screen.title} 
                    width={1200} 
                    height={800} 
                    className="rounded-[1.5rem] w-full h-auto object-cover"
                  />
                </GlowCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
