"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PlayfulFood() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avocadoRef = useRef<SVGSVGElement>(null);
  
  // Refs for different layers
  const skinRef = useRef<SVGPathElement>(null);
  const fleshRef = useRef<SVGPathElement>(null);
  const pitRef = useRef<SVGGElement>(null);
  const faceRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const blushRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let xPosition = 0;
    let yPosition = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

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

    const animateAvocado = () => {
      if (!xPosition || !yPosition) return;

      // Range from -50 to 50
      const x = percentage(xPosition, width) - 50;
      const y = percentage(yPosition, height) - 50;

      // Different layers move at different intensities to create 3D depth
      
      // Face moves the most (foreground)
      gsap.to(faceRef.current, {
        x: x / 5,
        y: y / 5,
        duration: 0.6,
        ease: "power2.out"
      });

      // Eyes have extra movement for "looking" effect
      gsap.to(eyesRef.current, {
        x: x / 8,
        y: y / 8,
        duration: 0.4,
        ease: "power2.out"
      });

      // Pit moves slightly less than face
      gsap.to(pitRef.current, {
        x: x / 12,
        y: y / 12,
        duration: 0.7,
        ease: "power2.out"
      });

      // Flesh is the middle layer
      gsap.to(fleshRef.current, {
        x: x / 25,
        y: y / 25,
        duration: 0.8,
        ease: "power2.out"
      });

      // Skin moves the least or opposite (background)
      gsap.to(skinRef.current, {
        x: -x / 40,
        y: -y / 40,
        duration: 1,
        ease: "power2.out"
      });

      // Tilt and displace the whole SVG
      gsap.to(avocadoRef.current, {
        rotateX: -y / 5,
        rotateY: x / 5,
        x: x * 1.5, // Added body displacement
        y: y * 1.5, // Added body displacement
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Initial Animation (Pop in)
    gsap.from(avocadoRef.current, {
      scale: 0,
      y: 100,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    });

    window.addEventListener("resize", updateWindowSize);
    window.addEventListener("mousemove", updateMouseCoords);
    gsap.ticker.add(animateAvocado);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("mousemove", updateMouseCoords);
      gsap.ticker.remove(animateAvocado);
    };
  }, []);

  return (
    <div ref={containerRef} className="py-32 flex flex-col items-center justify-center relative overflow-hidden bg-surface/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent opacity-50" />
      
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-3xl font-black tracking-tight uppercase mb-3">Wait, someone's watching you...</h3>
        <p className="text-white/40 text-lg font-medium max-w-md mx-auto">
          Our AI-vocado is keeping an eye on your nutritional goals.
        </p>
      </div>

      <div className="relative [perspective:1000px]">
        <svg 
          ref={avocadoRef}
          viewBox="0 0 200 280" 
          className="w-64 h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
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
            <path d="M90 125 Q 100 135, 110 125" fill="none" stroke="#2D4229" strokeWidth="3" strokeLinecap="round" />

            {/* Eyes */}
            <g ref={eyesRef}>
              {/* Left Eye */}
              <circle cx="75" cy="100" r="10" fill="white" />
              <circle className="pupil" cx="75" cy="100" r="5" fill="#1A2818" />
              <circle cx="72" cy="97" r="2" fill="white" />
              
              {/* Right Eye */}
              <circle cx="125" cy="100" r="10" fill="white" />
              <circle className="pupil" cx="125" cy="100" r="5" fill="#1A2818" />
              <circle cx="122" cy="97" r="2" fill="white" />
            </g>
          </g>
        </svg>
      </div>
      
      {/* Interaction prompt */}
      <div className="mt-16 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-xs font-bold tracking-widest text-white/60 uppercase animate-bounce">
        Move your cursor to play
      </div>
    </div>
  );
}
