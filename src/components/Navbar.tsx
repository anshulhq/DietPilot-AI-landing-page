"use client";

import { motion } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="glass w-full max-w-7xl px-8 py-4 flex items-center justify-between rounded-full border border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
            <Zap className="text-obsidian fill-obsidian" size={20} />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            DietPilot<span className="text-brand-primary">AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {["Setup", "Features", "Showcase", "How It Works", "Pipeline"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-white/70 hover:text-brand-primary transition-colors duration-200 uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#setup" className="px-8 py-3 bg-white text-obsidian rounded-full font-bold text-sm hover:bg-brand-primary transition-all duration-300 transform hover:scale-105 inline-block text-center">
            GET STARTED
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Optional expansion) */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 left-6 right-6 glass p-8 rounded-3xl md:hidden flex flex-col gap-6"
        >
          {["Setup", "Features", "Showcase", "How It Works", "Pipeline"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xl font-bold text-white hover:text-brand-primary"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="#setup" onClick={() => setIsOpen(false)} className="w-full py-4 bg-brand-primary text-obsidian rounded-2xl font-black text-center">
            GET STARTED
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
