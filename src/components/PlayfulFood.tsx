"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PlayfulFood() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avocadoRef = useRef<SVGSVGElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  
  // Refs for different layers
  const skinRef = useRef<SVGPathElement>(null);
  const fleshRef = useRef<SVGPathElement>(null);
  const pitRef = useRef<SVGGElement>(null);
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

    // 1. Idle Floating Animation
    const idleTween = gsap.to(avocadoRef.current, {
      y: "-=15",
      rotateZ: "2deg",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 2. Random Blinking
    const blink = () => {
      if (!eyesRef.current) return;
      gsap.timeline()
        .to(eyesRef.current, { scaleY: 0.1, duration: 0.1, transformOrigin: "center center" })
        .to(eyesRef.current, { scaleY: 1, duration: 0.1 });
    };

    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.6) blink();
    }, 4000);

    // 3. Mouse Parallax and Proximity
    const animateAvocado = () => {
      if (!xPosition || !yPosition || !avocadoRef.current) return;

      // Range from -50 to 50
      const x = percentage(xPosition, width) - 50;
      const y = percentage(yPosition, height) - 50;

      // Calculate distance from center for proximity effects
      const rect = avocadoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(xPosition - centerX, 2) + Math.pow(yPosition - centerY, 2));
      const maxDist = 500;
      const proximity = Math.max(0, 1 - dist / maxDist); // 0 to 1

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

      gsap.to(pitRef.current, {
        x: x / 10,
        y: y / 10,
        duration: 0.7,
        ease: "power2.out"
      });

      gsap.to(fleshRef.current, {
        x: x / 20,
        y: y / 20,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(skinRef.current, {
        x: -x / 35,
        y: -y / 35,
        duration: 1,
        ease: "power2.out"
      });

      // Body Tilt & Displacement
      gsap.to(avocadoRef.current, {
        rotateX: -y / 4,
        rotateY: x / 4,
        x: x * 1.8,
        y: y * 1.2,
        duration: 0.5,
        ease: "power2.out"
      });

      // Proximity Reactions
      // Blush gets brighter
      gsap.to(blushRef.current, {
        opacity: 0.4 + proximity * 0.6,
        scale: 1 + proximity * 0.5,
        transformOrigin: "center center",
        duration: 0.3
      });

      // Mouth changes to a small "o" or bigger smile
      if (mouthRef.current) {
        const mouthD = proximity > 0.6 
          ? "M90 125 Q 100 145, 110 125" // Big smile
          : proximity > 0.3
            ? "M90 125 Q 100 135, 110 125" // Normal smile
            : "M95 130 Q 100 135, 105 130"; // Small smile/neutral
        
        gsap.to(mouthRef.current, {
          attr: { d: mouthD },
          duration: 0.3
        });
      }

      // Shadow movement (inverse to body)
      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          x: -x * 0.5,
          scale: 1 - proximity * 0.2,
          opacity: 0.2 + proximity * 0.1,
          duration: 0.5
        });
      }
    };

    // Initial Pop In
    gsap.from(avocadoRef.current, {
      scale: 0,
      y: 200,
      rotateZ: -20,
      duration: 1.8,
      ease: "elastic.out(1, 0.4)"
    });

    window.addEventListener("resize", updateWindowSize);
    window.addEventListener("mousemove", updateMouseCoords);
    gsap.ticker.add(animateAvocado);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("mousemove", updateMouseCoords);
      gsap.ticker.remove(animateAvocado);
      clearInterval(blinkInterval);
      idleTween.kill();
    };
  }, []);

  const handleAvocadoClick = () => {
    if (!avocadoRef.current) return;
    
    // Squash and Stretch "Boing"
    gsap.timeline()
      .to(avocadoRef.current, { scaleX: 1.3, scaleY: 0.7, duration: 0.1, ease: "power2.out" })
      .to(avocadoRef.current, { scaleX: 0.8, scaleY: 1.2, duration: 0.15, ease: "power2.inOut" })
      .to(avocadoRef.current, { scaleX: 1, scaleY: 1, duration: 1, ease: "elastic.out(1.2, 0.3)" });
    
    // Wink!
    if (eyesRef.current) {
      const leftEye = eyesRef.current.children[0];
      gsap.timeline()
        .to(leftEye, { scaleY: 0.1, duration: 0.1, transformOrigin: "center center" })
        .to(leftEye, { scaleY: 1, duration: 0.1, delay: 0.2 });
    }

    // Heart Pop-up
    const heart = document.getElementById("click-heart");
    if (heart) {
      gsap.set(heart, { scale: 0, opacity: 1, y: 0, x: 0 });
      gsap.to(heart, {
        scale: 1.5,
        y: -100,
        x: (Math.random() - 0.5) * 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    }
  };

  return (
    <div ref={containerRef} className="py-32 flex flex-col items-center justify-center relative overflow-hidden bg-surface/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent opacity-50" />
      
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-3xl font-black tracking-tight uppercase mb-3">Wait, someone&apos;s watching you...</h3>
        <p className="text-white/40 text-lg font-medium max-w-md mx-auto">
          Our AI-vocado is keeping an eye on your nutritional goals.
        </p>
      </div>

      <div className="relative [perspective:1000px] cursor-pointer" onClick={handleAvocadoClick}>
        {/* Heart Pop-up element */}
        <div id="click-heart" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 z-50">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF6B6B">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Dynamic Shadow */}
        <div 
          ref={shadowRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/30 rounded-[100%] blur-2xl z-0" 
        />
        
        <svg 
          ref={avocadoRef}
          viewBox="0 0 200 280" 
          className="w-64 h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Skin Layer (Back) */}
          <path 
            ref={skinRef}
            d="M100 10 C 150 10, 180 60, 180 140 C 180 220, 150 270, 100 270 C 50 270, 20 220, 20 140 C 20 60, 50 10, 100 10 Z" 
            fill="#2D4229" 
            stroke="#1A2818"
            strokeWidth="2"
          />

          {/* Flesh Layer (Middle) */}
          <path 
            ref={fleshRef}
            d="M100 25 C 140 25, 165 70, 165 140 C 165 210, 140 255, 100 255 C 60 255, 35 210, 35 140 C 35 70, 60 25, 100 25 Z" 
            fill="#C2D96E" 
          />

          {/* Pit Layer (Inner Foreground) */}
          <g ref={pitRef}>
            <circle cx="100" cy="180" r="45" fill="#6F4E37" />
            <circle cx="85" cy="165" r="10" fill="white" opacity="0.1" />
          </g>

          {/* Face Layer (Foreground) */}
          <g ref={faceRef}>
            {/* Blush */}
            <g ref={blushRef} opacity="0.4">
              <ellipse cx="65" cy="115" rx="10" ry="5" fill="#E68A8A" />
              <ellipse cx="135" cy="115" rx="10" ry="5" fill="#E68A8A" />
            </g>

            {/* Mouth */}
            <path 
              ref={mouthRef}
              d="M90 125 Q 100 135, 110 125" 
              fill="none" 
              stroke="#2D4229" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />

            {/* Eyes */}
            <g ref={eyesRef}>
              {/* Left Eye */}
              <g>
                <circle cx="75" cy="100" r="10" fill="white" />
                <circle className="pupil" cx="75" cy="100" r="5" fill="#1A2818" />
                <circle cx="72" cy="97" r="2" fill="white" />
              </g>
              
              {/* Right Eye */}
              <g>
                <circle cx="125" cy="100" r="10" fill="white" />
                <circle className="pupil" cx="125" cy="100" r="5" fill="#1A2818" />
                <circle cx="122" cy="97" r="2" fill="white" />
              </g>
            </g>
          </g>
        </svg>
      </div>
      
      {/* Interaction prompt */}
      <div className="mt-16 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-xs font-bold tracking-widest text-white/60 uppercase animate-pulse">
        Click or move your cursor to play
      </div>
    </div>
  );
}

