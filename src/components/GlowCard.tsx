"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glowColor?: string;
}

export default function GlowCard({ 
  children, 
  className = "", 
  innerClassName = "",
  glowColor = "rgba(120, 119, 198, 0.3)" 
}: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        ["--mouse-x" as any]: `${mousePosition.x}px`,
        ["--mouse-y" as any]: `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      {/* The Glow Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 40%)`,
        }}
      />
      
      {/* Border Glow Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-inherit border border-white/20 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), black, transparent)`,
          WebkitMaskImage: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), black, transparent)`,
          borderWidth: '1.5px',
          borderColor: glowColor.replace('0.15', '1').replace('0.1', '1').replace('0.2', '1'), 
        }}
      />

      {/* Content Layer */}
      <div className={`relative z-20 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
