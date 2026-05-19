"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PlayfulStrawberry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<SVGSVGElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  
  // Refs for different layers
  const bodyRef = useRef<SVGPathElement>(null);
  const leavesRef = useRef<SVGGElement>(null);
  const seedsRef = useRef<SVGGElement>(null);
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


    // 2. Random Blinking
    const blink = () => {
      if (!eyesRef.current) return;
      gsap.timeline()
        .to(eyesRef.current, { scaleY: 0.1, duration: 0.1, transformOrigin: "center center" })
        .to(eyesRef.current, { scaleY: 1, duration: 0.1 });
    };

    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.6) blink();
    }, 4500);

    // 3. Mouse Parallax and Proximity
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

      gsap.to(seedsRef.current, {
        x: x / 12,
        y: y / 12,
        duration: 0.7,
        ease: "power2.out"
      });

      gsap.to(leavesRef.current, {
        x: -x / 20,
        y: -y / 20,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(bodyRef.current, {
        x: -x / 40,
        y: -y / 40,
        duration: 1,
        ease: "power2.out"
      });

      // Body Tilt & Displacement
      gsap.to(characterRef.current, {
        rotateX: -y / 4,
        rotateY: x / 4,
        x: x * 1.5,
        y: y * 1.1,
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
          ? "M90 135 Q 100 155, 110 135" // Big smile
          : proximity > 0.3
            ? "M90 135 Q 100 145, 110 135" // Normal smile
            : "M95 140 Q 100 145, 105 140"; // Small smile
        
        gsap.to(mouthRef.current, {
          attr: { d: mouthD },
          duration: 0.3
        });
      }

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          x: -x * 0.4,
          scale: 1 - proximity * 0.15,
          opacity: 0.2 + proximity * 0.1,
          duration: 0.5
        });
      }
    };

    // Initial Pop In
    gsap.from(characterRef.current, {
      scale: 0,
      y: 200,
      rotateZ: 20,
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
      .to(characterRef.current, { scaleX: 1.25, scaleY: 0.75, duration: 0.1, ease: "power2.out" })
      .to(characterRef.current, { scaleX: 0.85, scaleY: 1.15, duration: 0.15, ease: "power2.inOut" })
      .to(characterRef.current, { scaleX: 1, scaleY: 1, duration: 1, ease: "elastic.out(1.2, 0.3)" });
    
    // Heart Pop-up
    const heart = document.getElementById("strawberry-heart");
    if (heart) {
      gsap.set(heart, { scale: 0, opacity: 1, y: 0, x: 0 });
      gsap.to(heart, {
        scale: 1.8,
        y: -120,
        x: (Math.random() - 0.5) * 60,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });
    }
  };

  return (
    <div ref={containerRef} className="py-32 flex flex-col items-center justify-center relative overflow-hidden bg-surface/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent opacity-50" />
      
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-3xl font-black tracking-tight uppercase mb-3 text-red-400">Sweeten your progress</h3>
        <p className="text-white/40 text-lg font-medium max-w-md mx-auto">
          Our AI tracks every bite to make your journey berries-and-cream smooth.
        </p>
      </div>

      <div className="relative [perspective:1000px] cursor-pointer" onClick={handleCharacterClick}>
        <div id="strawberry-heart" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 z-50">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF4D4D">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div 
          ref={shadowRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/30 rounded-[100%] blur-2xl z-0" 
        />
        
        <svg 
          ref={characterRef}
          viewBox="0 0 200 240" 
          className="w-56 h-auto drop-shadow-[0_20px_40px_rgba(255,0,0,0.2)] relative z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Strawberry Body */}
          <path 
            ref={bodyRef}
            d="M100 20 C 140 20, 170 50, 170 110 C 170 180, 130 220, 100 220 C 70 220, 30 180, 30 110 C 30 50, 60 20, 100 20 Z" 
            fill="#FF4D4D" 
            stroke="#D43F3F"
            strokeWidth="2"
          />

          {/* Seeds Layer */}
          <g ref={seedsRef} fill="#FFE680" opacity="0.8">
            <circle cx="70" cy="60" r="2.5" />
            <circle cx="130" cy="60" r="2.5" />
            <circle cx="50" cy="90" r="2.5" />
            <circle cx="100" cy="90" r="2.5" />
            <circle cx="150" cy="90" r="2.5" />
            <circle cx="45" cy="130" r="2.5" />
            <circle cx="80" cy="130" r="2.5" />
            <circle cx="120" cy="130" r="2.5" />
            <circle cx="155" cy="130" r="2.5" />
            <circle cx="70" cy="170" r="2.5" />
            <circle cx="100" cy="170" r="2.5" />
            <circle cx="130" cy="170" r="2.5" />
            <circle cx="100" cy="200" r="2.5" />
          </g>

          {/* Leaves (Top) */}
          <g ref={leavesRef}>
            <path d="M100 25 L80 5 L100 15 L120 5 Z" fill="#4CAF50" />
            <path d="M100 20 C 130 20, 140 40, 140 45 C 140 45, 120 40, 100 40 C 80 40, 60 45, 60 45 C 60 45, 70 20, 100 20 Z" fill="#4CAF50" />
            <path d="M100 10 L100 0" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Face Layer */}
          <g ref={faceRef}>
            <g ref={blushRef} opacity="0.4">
              <ellipse cx="65" cy="125" rx="8" ry="4" fill="#FFB3B3" />
              <ellipse cx="135" cy="125" rx="8" ry="4" fill="#FFB3B3" />
            </g>

            <path 
              ref={mouthRef}
              d="M90 135 Q 100 145, 110 135" 
              fill="none" 
              stroke="#800000" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />

            <g ref={eyesRef}>
              <g>
                <circle cx="75" cy="110" r="8" fill="white" />
                <circle cx="75" cy="110" r="4" fill="#330000" />
                <circle cx="73" cy="108" r="2" fill="white" />
              </g>
              <g>
                <circle cx="125" cy="110" r="8" fill="white" />
                <circle cx="125" cy="110" r="4" fill="#330000" />
                <circle cx="123" cy="108" r="2" fill="white" />
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
