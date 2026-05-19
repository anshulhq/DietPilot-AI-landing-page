"use client";

import { motion } from "framer-motion";
import { Terminal, Download, Server, Layout, ExternalLink } from "lucide-react";
import GlowCard from "./GlowCard";

export default function Setup() {
  return (
    <section id="setup" className="py-32 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-primary to-transparent" />
      
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
          SET UP <span className="text-brand-primary">LOCALLY.</span>
        </h2>
        <p className="text-white/40 font-medium">Get DietPilot AI running on your machine in minutes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
        {/* Step 1: Clone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 h-full"
        >
          <GlowCard 
            glowColor="rgba(0, 255, 163, 0.1)"
            className="glass rounded-[2.5rem] border border-white/10 relative overflow-hidden group h-full"
            innerClassName="p-8 flex flex-col justify-between h-full"
          >
            <div className="absolute top-4 right-8 text-7xl font-black text-white/5 uppercase">01</div>
            <div>
              <Terminal className="text-brand-primary mb-6" size={32} />
              <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Clone the Repository</h3>
            </div>
            <div className="bg-obsidian/50 p-6 rounded-2xl font-mono text-sm border border-white/5 space-y-2 mt-4">
              <div className="text-brand-secondary">git clone https://github.com/anshulhq/DietPilot-AI.git</div>
              <div className="text-white/60">cd DietPilot-AI</div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Step 2: Dataset */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-5 h-full"
        >
          <GlowCard 
            glowColor="rgba(0, 102, 255, 0.1)"
            className="glass rounded-[2.5rem] border border-white/10 relative overflow-hidden group h-full"
            innerClassName="p-8 flex flex-col justify-between h-full"
          >
            <div className="absolute top-4 right-8 text-7xl font-black text-white/5 uppercase">02</div>
            <div>
              <Download className="text-brand-primary mb-6" size={32} />
              <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Download Dataset</h3>
            </div>
            <div className="space-y-6 mt-4">
              <p className="text-white/60 text-base leading-relaxed">
                Place <code className="text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">recipes.csv</code> inside the backend/ directory.
              </p>
              <a 
                href="https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold text-white transition-all border border-white/10 group/link"
              >
                KAGGLE SOURCE <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </div>
          </GlowCard>
        </motion.div>

        {/* Step 3: Backend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-5 h-full"
        >
          <GlowCard 
            glowColor="rgba(255, 0, 212, 0.1)"
            className="glass rounded-[2.5rem] border border-white/10 relative overflow-hidden group h-full"
            innerClassName="p-8 flex flex-col h-full"
          >
            <div className="absolute top-4 right-8 text-7xl font-black text-white/5 uppercase">03</div>
            <div>
              <Server className="text-brand-primary mb-6" size={32} />
              <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Backend Setup</h3>
            </div>
            <div className="bg-obsidian/50 p-6 rounded-2xl font-mono text-xs border border-white/5 space-y-2 mt-4 flex-grow overflow-x-auto">
              <div className="text-white/40"># Environment setup</div>
              <div className="text-brand-secondary">cd backend && python3 -m venv venv</div>
              <div className="text-brand-secondary">source venv/bin/activate</div>
              <div className="text-brand-secondary">pip install -r requirements.txt</div>
              <div className="text-white/40 pt-4"># Configure secrets in .env</div>
              <div className="text-brand-accent">GROQ_API_KEY=your_key</div>
              <div className="text-brand-accent">HF_API_KEY=your_key</div>
              <div className="text-brand-accent">DATABASE_URL=sqlite:///nutriguide.db</div>
              <div className="text-white/40 pt-4"># Load & Launch</div>
              <div className="text-brand-secondary">python create_db.py && python load_data.py</div>
              <div className="text-brand-secondary">uvicorn app.main:app --reload</div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Step 4: Frontend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-7 h-full"
        >
          <GlowCard 
            glowColor="rgba(255, 255, 255, 0.1)"
            className="glass rounded-[2.5rem] border border-white/10 relative overflow-hidden group h-full"
            innerClassName="p-8 flex flex-col justify-between h-full"
          >
            <div className="absolute top-4 right-8 text-7xl font-black text-white/5 uppercase">04</div>
            <div className="flex flex-col md:flex-row md:items-center gap-12 flex-grow">
              <div className="flex-shrink-0">
                <Layout className="text-brand-primary mb-6" size={32} />
                <h3 className="text-2xl font-black mb-2 tracking-tight uppercase">Frontend Setup</h3>
                <div className="flex items-center gap-2 text-[10px] text-brand-primary font-bold uppercase tracking-widest mt-4">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                  Live at localhost:3000
                </div>
              </div>
              <div className="flex-grow bg-obsidian/50 p-6 rounded-2xl font-mono text-sm border border-white/5 space-y-3">
                <div className="text-brand-secondary">cd frontend && npm install</div>
                <div className="text-brand-secondary">npm run dev</div>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
