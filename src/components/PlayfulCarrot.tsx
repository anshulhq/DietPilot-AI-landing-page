"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PlayfulCarrot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<SVGSVGElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  
  // Refs for different layers
  const bodyRef = useRef<SVGPathElement>(null);
  const leavesRef = useRef<SVGGElement>(null);
  const faceRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const blushRef = useRef<SVGGElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let xPosition = 0;
    let yPosition = 0;
    let width = typeof window !== "undefined" ? window.innerWidth : 1920;
    let height = typeof window !== "undefined" ? window.innerHeight : 1080;

    const updateWindowSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    const updateMouseCoords = (e: MouseEvent) => {
      xPosition = e.clientX;
      yPosition = e.clientY;
    };

    const percentage = (partialValue: number, totalValue: number) => {
      return (100 * partialValue) / totalValue;
    };

    // 1. Random Blinking
    const blink = () => {
      if (!eyesRef.current) return;
      gsap.timeline()
        .to(eyesRef.current, { scaleY: 0.1, duration: 0.1, transformOrigin: "center center" })
        .to(eyesRef.current, { scaleY: 1, duration: 0.1 });
    };

    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.6) blink();
    }, 4800);

    // 2. Mouse Parallax and Proximity
    const animateCharacter = () => {
      if (!xPosition || !yPosition || !characterRef.current) return;

      const x = percentage(xPosition, width) - 50;
      const y = percentage(yPosition, height) - 50;

      const rect = characterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(xPosition - centerX, 2) + Math.pow(yPosition - centerY, 2));
      const maxDist = 500;
      const proximity = Math.max(0, 1 - dist / maxDist);

      // Parallax Layers
      gsap.to(faceRef.current, {
        x: x / 4,
        y: y / 4,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(eyesRef.current, {
        x: x / 6,
        y: y / 6,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(leavesRef.current, {
        x: -x / 12,
        y: -y / 12,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(bodyRef.current, {
        x: -x / 30,
        y: -y / 30,
        duration: 1,
        ease: "power2.out"
      });

      // Body Tilt & Displacement
      gsap.to(characterRef.current, {
        rotateX: -y / 4,
        rotateY: x / 4,
        x: x * 1.4,
        y: y * 1.0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Proximity Reactions
      gsap.to(blushRef.current, {
        opacity: 0.4 + proximity * 0.6,
        scale: 1 + proximity * 0.5,
        transformOrigin: "center center",
        duration: 0.3
      });

      if (mouthRef.current) {
        const mouthD = proximity > 0.6 
          ? "M90 115 Q 100 135, 110 115" 
          : proximity > 0.3
            ? "M90 115 Q 100 125, 110 115" 
            : "M95 120 Q 100 125, 105 120";
        
        gsap.to(mouthRef.current, {
          attr: { d: mouthD },
          duration: 0.3
        });
      }

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          x: -x * 0.3,
          scale: 1 - proximity * 0.1,
          opacity: 0.2 + proximity * 0.1,
          duration: 0.5
        });
      }
    };

    // Initial Pop In
    gsap.from(characterRef.current, {
      scale: 0,
      y: 200,
      rotateZ: 25,
      duration: 1.8,
      ease: "elastic.out(1, 0.4)"
    });

    window.addEventListener("resize", updateWindowSize);
    window.addEventListener("mousemove", updateMouseCoords);
    gsap.ticker.add(animateCharacter);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("mousemove", updateMouseCoords);
      gsap.ticker.remove(animateCharacter);
      clearInterval(blinkInterval);
    };
  }, []);

  const handleCharacterClick = () => {
    if (!characterRef.current) return;
    
    gsap.timeline()
      .to(characterRef.current, { scaleX: 1.1, scaleY: 0.9, duration: 0.1, ease: "power2.out" })
      .to(characterRef.current, { scaleX: 0.95, scaleY: 1.05, duration: 0.15, ease: "power2.inOut" })
      .to(characterRef.current, { scaleX: 1, scaleY: 1, duration: 1, ease: "elastic.out(1.2, 0.3)" });
    
    // Heart Pop-up
    const heart = document.getElementById("carrot-heart");
    if (heart) {
      gsap.set(heart, { scale: 0, opacity: 1, y: 0, x: 0 });
      gsap.to(heart, {
        scale: 1.6,
        y: -110,
        x: (Math.random() - 0.5) * 45,
        opacity: 0,
        duration: 1.1,
        ease: "power2.out"
      });
    }
  };

  return (
    <div ref={containerRef} className="py-32 flex flex-col items-center justify-center relative overflow-hidden bg-surface/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-600/5 to-transparent opacity-50" />
      
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-3xl font-black tracking-tight uppercase mb-3 text-orange-500">Rooted in Science</h3>
        <p className="text-white/40 text-lg font-medium max-w-md mx-auto">
          Our algorithms are deeply rooted in nutritional science and data-driven insights.
        </p>
      </div>

      <div className="relative [perspective:1000px] cursor-pointer" onClick={handleCharacterClick}>
        <div id="carrot-heart" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 z-50">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#FB8C00">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div 
          ref={shadowRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/30 rounded-[100%] blur-2xl z-0" 
        />
        
        <svg 
          ref={characterRef}
          viewBox="0 0 200 300" 
          className="w-44 h-auto drop-shadow-[0_20px_40px_rgba(251,140,0,0.2)] relative z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Leaves (Top) */}
          <g ref={leavesRef}>
            <path d="M100 60 Q 80 20, 60 30" fill="none" stroke="#43A047" strokeWidth="4" strokeLinecap="round" />
            <path d="M100 60 Q 100 10, 110 20" fill="none" stroke="#43A047" strokeWidth="4" strokeLinecap="round" />
            <path d="M100 60 Q 120 20, 140 30" fill="none" stroke="#43A047" strokeWidth="4" strokeLinecap="round" />
            <path d="M60 30 C 50 20, 70 10, 80 20" fill="#4CAF50" />
            <path d="M110 20 C 100 0, 120 0, 130 10" fill="#4CAF50" />
            <path d="M140 30 C 150 20, 130 10, 120 20" fill="#4CAF50" />
          </g>

          {/* Carrot Body */}
          <path 
            ref={bodyRef}
            d="M70 60 C 70 50, 130 50, 130 60 L 110 260 C 110 270, 90 270, 90 260 Z" 
            fill="#FB8C00" 
            stroke="#E65100"
            strokeWidth="2"
          />

          {/* Texture Lines */}
          <path d="M85 100 L115 100" stroke="#E65100" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          <path d="M80 150 L120 150" stroke="#E65100" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          <path d="M95 200 L105 200" stroke="#E65100" strokeWidth="2" opacity="0.3" strokeLinecap="round" />

          {/* Face Layer */}
          <g ref={faceRef}>
            <g ref={blushRef} opacity="0.4">
              <ellipse cx="85" cy="115" rx="8" ry="4" fill="#FFCCBC" />
              <ellipse cx="115" cy="115" rx="8" ry="4" fill="#FFCCBC" />
            </g>

            <path 
              ref={mouthRef}
              d="M95 125 Q 100 135, 105 125" 
              fill="none" 
              stroke="#4E342E" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />

            <g ref={eyesRef}>
              <g>
                <circle cx="85" cy="100" r="8" fill="white" />
                <circle cx="85" cy="100" r="4" fill="#4E342E" />
                <circle cx="83" cy="98" r="1.5" fill="white" />
              </g>
              <g>
                <circle cx="115" cy="100" r="8" fill="white" />
                <circle cx="115" cy="100" r="4" fill="#4E342E" />
                <circle cx="113" cy="98" r="1.5" fill="white" />
              </g>
            </g>
          </g>
        </svg>
      </div>
      
      <div className="mt-16 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-xs font-bold tracking-widest text-white/60 uppercase animate-pulse">
        Click or move your cursor to play
      </div>
    </div>
  );
}
