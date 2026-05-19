"use client";

import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-obsidian">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Zap className="text-brand-primary" size={24} />
            <span className="text-2xl font-black tracking-tighter">DietPilot AI</span>
          </div>
          <p className="text-white/40 max-w-sm">
            Revolutionizing nutrition through agentic AI and semantic intelligence. Built for the future of health.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-8">
          <div className="flex gap-6">
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/10 hover:border-brand-primary transition-colors text-white/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/10 hover:border-brand-secondary transition-colors text-white/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/10 hover:border-brand-accent transition-colors text-white/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          <div className="text-white/20 text-sm font-medium tracking-widest uppercase">
            © 2024 DietPilot AI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
