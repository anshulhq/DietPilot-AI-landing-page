"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PlayfulFood() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const avocadoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !leftEyeRef.current || !rightEyeRef.current) return;

      const { clientX, clientY } = e;
      
      // Get centers of the eyes
      const getEyeCenter = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return { x: 0, y: 0 };
        const rect = ref.current.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      };

      const leftCenter = getEyeCenter(leftEyeRef);
      const rightCenter = getEyeCenter(rightEyeRef);

      // Calculate angles
      const angleLeft = Math.atan2(clientY - leftCenter.y, clientX - leftCenter.x);
      const angleRight = Math.atan2(clientY - rightCenter.y, clientX - rightCenter.x);

      // Move pupils (max distance 6px)
      const distance = 6;
      const lx = Math.cos(angleLeft) * distance;
      const ly = Math.sin(angleLeft) * distance;
      const rx = Math.cos(angleRight) * distance;
      const ry = Math.sin(angleRight) * distance;

      gsap.to(".pupil-l", { x: lx, y: ly, duration: 0.2, ease: "power2.out" });
      gsap.to(".pupil-r", { x: rx, y: ry, duration: 0.2, ease: "power2.out" });

      // Slight tilt and displacement of the whole avocado
      if (avocadoRef.current) {
        const rect = avocadoRef.current.getBoundingClientRect();
        const ax = rect.left + rect.width / 2;
        const ay = rect.top + rect.height / 2;
        
        // Tilt values
        const tiltX = (clientX - ax) / 50;
        const tiltY = (clientY - ay) / 50;
        
        // Displacement values (max 20px)
        const moveX = (clientX - ax) / 30;
        const moveY = (clientY - ay) / 30;
        
        gsap.to(avocadoRef.current, {
          rotateX: -tiltY,
          rotateY: tiltX,
          x: moveX,
          y: moveY,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="py-20 flex flex-col items-center justify-center relative overflow-hidden bg-surface/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent opacity-50" />
      
      <div className="text-center mb-12 relative z-10">
        <h3 className="text-2xl font-black tracking-tight uppercase mb-2">Wait, someone's watching you...</h3>
        <p className="text-white/40 text-sm font-medium">DietPilot AI is always looking for the best recipes.</p>
      </div>

      <div 
        ref={avocadoRef}
        className="relative w-48 h-64 [perspective:1000px] group cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Avocado Body */}
        <div className="absolute inset-0 bg-[#4B6F44] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border-4 border-[#2D4229] shadow-2xl overflow-hidden">
          {/* Inner Flesh */}
          <div className="absolute inset-2 bg-[#C2D96E] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] flex flex-col items-center justify-center">
            {/* The Pit */}
            <div className="w-20 h-20 bg-[#6F4E37] rounded-full mt-16 border-4 border-[#4E3524] shadow-inner relative">
               <div className="absolute top-2 left-4 w-4 h-4 bg-white/20 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Eyes Layer */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex gap-8 z-20">
          {/* Left Eye */}
          <div ref={leftEyeRef} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-black/10">
            <div className="pupil-l w-4 h-4 bg-obsidian rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
          {/* Right Eye */}
          <div ref={rightEyeRef} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-black/10">
            <div className="pupil-r w-4 h-4 bg-obsidian rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Blush */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-16 z-10 opacity-30">
          <div className="w-6 h-3 bg-[#E68A8A] rounded-full blur-sm" />
          <div className="w-6 h-3 bg-[#E68A8A] rounded-full blur-sm" />
        </div>

        {/* Mouth */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-obsidian/40 rounded-full" />
      </div>
      
      {/* Decorative dots */}
      <div className="mt-12 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-brand-primary/20 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}
