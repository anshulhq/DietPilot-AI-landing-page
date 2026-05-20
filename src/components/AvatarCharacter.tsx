"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";

gsap.registerPlugin(CustomEase, CustomWiggle);

// --- Constants ---
const SPEECH_BUBBLES = [
  "Eat your veggies! 🥦",
  "AI + Nutrition = 💪",
  "Track smarter, not harder!",
  "I count macros so you don't have to 🧠",
  "Hello there! 👋",
  "Click me again! 🎉",
  "Built with ❤️ and code",
  "10K+ recipes and counting!",
  "Feed me data 📊",
  "Who needs a dietitian? 🤖",
];

const BURST_EMOJIS = [
  "✨",
  "⭐",
  "💫",
  "🌟",
  "❤️",
  "🎉",
  "🔥",
  "💪",
  "🧠",
  "🥗",
];

// Nutrition-themed floating icon paths (small SVG path data)
const FLOAT_ICONS = [
  // Apple
  {
    path: "M12 2C9 2 7 4.5 7 7.5c0 4 3 7.5 5 9.5 2-2 5-5.5 5-9.5C17 4.5 15 2 12 2z",
    color: "#ff4757",
    size: 20,
  },
  // Leaf
  {
    path: "M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66S8 17 17 13V8z",
    color: "#2ed573",
    size: 18,
  },
  // Heart
  {
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    color: "#ff6b81",
    size: 16,
  },
  // Lightning bolt
  { path: "M13 2L3 14h9l-1 10 10-12h-9l1-10z", color: "#ccff00", size: 18 },
  // Star
  {
    path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    color: "#00f2ff",
    size: 16,
  },
  // Dumbbell simplified
  {
    path: "M6 5v14M18 5v14M6 12h12M4 7h4M16 7h4M4 17h4M16 17h4",
    color: "#a29bfe",
    size: 20,
  },
];

export default function AvatarCharacter() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const clickCountRef = useRef(0);
  const initDone = useRef(false);

  // Store DOM refs for the parallax animation loop
  const domRefs = useRef<{
    face: SVGGElement | null;
    eye: NodeListOf<SVGElement> | null;
    innerFace: SVGGElement | null;
    hairFront: SVGPathElement | null;
    hairBack: SVGPathElement | null;
    shadow: NodeListOf<SVGPathElement> | null;
    ear: NodeListOf<SVGGElement> | null;
    eyebrowLeft: SVGPathElement | null;
    eyebrowRight: SVGPathElement | null;
  }>({
    face: null,
    eye: null,
    innerFace: null,
    hairFront: null,
    hairBack: null,
    shadow: null,
    ear: null,
    eyebrowLeft: null,
    eyebrowRight: null,
  });

  const mouseState = useRef({
    xPosition: 0,
    yPosition: 0,
    storedX: 0,
    storedY: 0,
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
    dizzyIsPlaying: false,
  });

  const percentage = useCallback(
    (partialValue: number, totalValue: number) =>
      (100 * partialValue) / totalValue,
    [],
  );

  // --- Click: Emoji burst ---
  const emitParticleBurst = useCallback(() => {
    const container = particleContainerRef.current;
    if (!container) return;

    const count = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent =
        BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)];
      el.style.cssText =
        "position:absolute;top:50%;left:50%;font-size:20px;pointer-events:none;will-change:transform,opacity;";
      container.appendChild(el);

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 80 + Math.random() * 120;

      gsap.fromTo(
        el,
        { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          scale: 0.6 + Math.random() * 0.8,
          opacity: 0,
          rotation: (Math.random() - 0.5) * 360,
          duration: 0.8 + Math.random() * 0.5,
          ease: "power2.out",
          onComplete: () => el.remove(),
        },
      );
    }
  }, []);

  // --- Click: Speech bubble ---
  const showSpeechBubble = useCallback(() => {
    const bubble = speechRef.current;
    if (!bubble) return;

    const msg =
      SPEECH_BUBBLES[Math.floor(Math.random() * SPEECH_BUBBLES.length)];
    bubble.textContent = msg;

    gsap.killTweensOf(bubble);
    gsap.fromTo(
      bubble,
      { opacity: 0, y: 10, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
        onComplete: () => {
          gsap.to(bubble, {
            opacity: 0,
            y: -15,
            scale: 0.9,
            duration: 0.4,
            delay: 2,
            ease: "power2.in",
          });
        },
      },
    );
  }, []);

  // --- Click handler ---
  const handleClick = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    clickCountRef.current += 1;

    // Squish bounce
    gsap
      .timeline()
      .to(svg, {
        scaleX: 1.12,
        scaleY: 0.88,
        duration: 0.1,
        ease: "power2.out",
      })
      .to(svg, {
        scaleX: 0.92,
        scaleY: 1.1,
        duration: 0.12,
        ease: "power2.inOut",
      })
      .to(svg, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.8,
        ease: "elastic.out(1.2, 0.3)",
      });

    // Glasses bounce
    const glasses = containerRef.current?.querySelector(".avatar-glasses");
    if (glasses) {
      gsap
        .timeline()
        .to(glasses, { yPercent: -20, duration: 0.15, ease: "power2.out" })
        .to(glasses, { yPercent: 0, duration: 0.6, ease: "bounce.out" });
    }

    // Eyebrows raise
    const brows = containerRef.current?.querySelectorAll(
      ".avatar-eyebrow-left, .avatar-eyebrow-right",
    );
    if (brows?.length) {
      gsap
        .timeline()
        .to(brows, { yPercent: -80, duration: 0.15, ease: "power2.out" })
        .to(brows, { yPercent: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    }

    // Background blob color flash
    const bg = containerRef.current?.querySelector(".avatar-bg");
    if (bg) {
      const colors = ["#1b3a4b", "#2d1b4e", "#1a3328", "#3b1a1a", "#1a1a2e"];
      gsap.to(bg, {
        fill: colors[clickCountRef.current % colors.length],
        duration: 0.6,
        ease: "power2.out",
      });
    }

    emitParticleBurst();
    showSpeechBubble();

    // Pulse ring on click
    const section = sectionRef.current;
    if (section) {
      const ring = document.createElement("div");
      ring.style.cssText =
        "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;border:2px solid rgba(204,255,0,0.5);pointer-events:none;z-index:5;";
      section.appendChild(ring);
      gsap.to(ring, {
        width: 350,
        height: 350,
        opacity: 0,
        borderWidth: 0.5,
        duration: 1,
        ease: "power2.out",
        onComplete: () => ring.remove(),
      });
    }
  }, [emitParticleBurst, showSpeechBubble]);

  // === Main GSAP setup ===
  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    const root = containerRef.current;
    const section = sectionRef.current;
    if (!root || !section) return;

    const q = gsap.utils.selector(root);

    // Cache DOM elements
    domRefs.current = {
      face: root.querySelector<SVGGElement>(".avatar-face"),
      eye: root.querySelectorAll<SVGElement>(".avatar-eye"),
      innerFace: root.querySelector<SVGGElement>(".avatar-inner-face"),
      hairFront: root.querySelector<SVGPathElement>(".avatar-hair-front"),
      hairBack: root.querySelector<SVGPathElement>(".avatar-hair-back"),
      shadow: root.querySelectorAll<SVGPathElement>(".avatar-shadow"),
      ear: root.querySelectorAll<SVGGElement>(".avatar-ear"),
      eyebrowLeft: root.querySelector<SVGPathElement>(".avatar-eyebrow-left"),
      eyebrowRight: root.querySelector<SVGPathElement>(".avatar-eyebrow-right"),
    };

    const state = mouseState.current;

    // ==========================================
    //  ENTRANCE
    // ==========================================
    gsap.set(q(".avatar-bg"), { transformOrigin: "50% 50%" });
    gsap.set(q(".avatar-ear-right"), { transformOrigin: "0% 50%" });
    gsap.set(q(".avatar-ear-left"), { transformOrigin: "100% 50%" });
    gsap.set(q(".avatar-me"), { opacity: 1 });

    const meTl = gsap.timeline({
      onComplete: addMouseEvent,
      delay: 0.3,
    });

    meTl
      .from(
        q(".avatar-me"),
        {
          duration: 1,
          yPercent: 100,
          ease: "elastic.out(0.5, 0.4)",
        },
        0.5,
      )
      .from(
        q(".avatar-head, .avatar-hair, .avatar-shadow"),
        {
          duration: 0.9,
          yPercent: 20,
          ease: "elastic.out(0.58, 0.25)",
        },
        0.6,
      )
      .from(
        q(".avatar-ear-right"),
        {
          duration: 1,
          rotate: 40,
          yPercent: 10,
          ease: "elastic.out(0.5, 0.2)",
        },
        0.7,
      )
      .from(
        q(".avatar-ear-left"),
        {
          duration: 1,
          rotate: -40,
          yPercent: 10,
          ease: "elastic.out(0.5, 0.2)",
        },
        0.7,
      )
      .to(
        q(".avatar-glasses"),
        {
          duration: 1,
          keyframes: [{ yPercent: -10 }, { yPercent: 0 }],
          ease: "elastic.out(0.5, 0.2)",
        },
        0.75,
      )
      .from(
        q(".avatar-eyebrow-right, .avatar-eyebrow-left"),
        {
          duration: 1,
          yPercent: 300,
          ease: "elastic.out(0.5, 0.2)",
        },
        0.7,
      )
      .to(
        q(".avatar-eye-right, .avatar-eye-left"),
        {
          duration: 0.01,
          opacity: 1,
        },
        0.85,
      )
      .to(
        q(".avatar-eye-right-2, .avatar-eye-left-2"),
        {
          duration: 0.01,
          opacity: 0,
        },
        0.85,
      );

    // ==========================================
    //  BLINK
    // ==========================================
    const blink = gsap.timeline({
      repeat: -1,
      repeatDelay: 5,
      paused: true,
    });

    blink
      .to(
        q(".avatar-eye-right, .avatar-eye-left"),
        {
          duration: 0.01,
          opacity: 0,
        },
        0,
      )
      .to(
        q(".avatar-eye-right-2, .avatar-eye-left-2"),
        {
          duration: 0.01,
          opacity: 1,
        },
        0,
      )
      .to(
        q(".avatar-eye-right, .avatar-eye-left"),
        {
          duration: 0.01,
          opacity: 1,
        },
        0.15,
      )
      .to(
        q(".avatar-eye-right-2, .avatar-eye-left-2"),
        {
          duration: 0.01,
          opacity: 0,
        },
        0.15,
      );

    // ==========================================
    //  CUSTOM WIGGLES
    // ==========================================
    CustomWiggle.create("avatarWiggle", {
      wiggles: 6,
      type: "easeOut",
    });
    CustomWiggle.create("avatarLessWiggle", {
      wiggles: 4,
      type: "easeInOut",
    });

    // ==========================================
    //  DIZZY
    // ==========================================
    const dizzy = gsap.timeline({
      paused: true,
      onComplete: () => {
        state.dizzyIsPlaying = false;
      },
    });

    dizzy
      .to(q(".avatar-eyes"), { duration: 0.01, opacity: 0 }, 0)
      .to(q(".avatar-dizzy"), { duration: 0.01, opacity: 0.3 }, 0)
      .to(q(".avatar-mouth"), { duration: 0.01, opacity: 0 }, 0)
      .to(q(".avatar-oh"), { duration: 0.01, opacity: 0.85 }, 0)
      .to(
        q(".avatar-head, .avatar-hair-back, .avatar-shadow"),
        {
          duration: 6,
          rotate: 2,
          transformOrigin: "50% 50%",
          ease: "avatarWiggle",
        },
        0,
      )
      .to(
        q(".avatar-me"),
        {
          duration: 6,
          rotate: -2,
          transformOrigin: "50% 100%",
          ease: "avatarWiggle",
        },
        0,
      )
      .to(
        q(".avatar-me"),
        {
          duration: 4,
          scale: 0.99,
          transformOrigin: "50% 100%",
          ease: "avatarLessWiggle",
        },
        0,
      )
      .to(
        q(".avatar-dizzy-1"),
        {
          rotate: -360,
          duration: 1,
          repeat: 5,
          transformOrigin: "50% 50%",
          ease: "none",
        },
        0.01,
      )
      .to(
        q(".avatar-dizzy-2"),
        {
          rotate: 360,
          duration: 1,
          repeat: 5,
          transformOrigin: "50% 50%",
          ease: "none",
        },
        0.01,
      )
      .to(q(".avatar-eyes"), { duration: 0.01, opacity: 1 }, 4)
      .to(q(".avatar-dizzy"), { duration: 0.01, opacity: 0 }, 4)
      .to(q(".avatar-oh"), { duration: 0.01, opacity: 0 }, 4)
      .to(q(".avatar-mouth"), { duration: 0.01, opacity: 1 }, 4);

    // ==========================================
    //  MOUSE TRACKING
    // ==========================================
    function updateScreenCoords(event: MouseEvent) {
      if (!state.dizzyIsPlaying) {
        state.xPosition = event.clientX;
        state.yPosition = event.clientY;
      }
      if (!state.dizzyIsPlaying && Math.abs(event.movementX) > 500) {
        state.dizzyIsPlaying = true;
        dizzy.restart();
      }
    }

    function animateFace() {
      if (!state.xPosition) return;
      if (
        state.storedX === state.xPosition &&
        state.storedY === state.yPosition
      )
        return;

      const d = domRefs.current;
      const x = percentage(state.xPosition, state.width) - 50;
      const y = percentage(state.yPosition, state.height) - 50;
      const yHigh = percentage(state.yPosition, state.height) - 20;
      const yLow = percentage(state.yPosition, state.height) - 80;

      gsap.to(d.face, { yPercent: yLow / 30, xPercent: x / 30 });
      gsap.to(d.eye, { yPercent: yHigh / 3, xPercent: x / 2 });
      gsap.to(d.innerFace, { yPercent: y / 6, xPercent: x / 8 });
      gsap.to(d.hairFront, { yPercent: yHigh / 15, xPercent: x / 22 });
      gsap.to([d.hairBack, ...(d.shadow ? Array.from(d.shadow) : [])], {
        yPercent: (yLow / 20) * -1,
        xPercent: (x / 20) * -1,
      });
      gsap.to(d.ear, {
        yPercent: (y / 1.5) * -1,
        xPercent: (x / 10) * -1,
      });
      gsap.to([d.eyebrowLeft, d.eyebrowRight], { yPercent: y * 2.5 });

      // Parallax on floating icons
      if (section) {
        const floaters =
          section.querySelectorAll<HTMLElement>(".avatar-float-icon");
        floaters.forEach((el, i) => {
          const speed = 0.3 + (i % 3) * 0.15;
          gsap.to(el, {
            x: x * speed,
            y: y * speed * 0.6,
            duration: 1.2,
            ease: "power2.out",
          });
        });
      }

      state.storedX = state.xPosition;
      state.storedY = state.yPosition;
    }

    function addMouseEvent() {
      const safeToAnimate = window.matchMedia(
        "(prefers-reduced-motion: no-preference)",
      ).matches;

      if (safeToAnimate) {
        window.addEventListener("mousemove", updateScreenCoords);
        gsap.ticker.add(animateFace);
        blink.play();
        startIdleBreathing();
        startOrbitals();
        startAmbientPulses();
      }
    }

    function updateWindowSize() {
      state.height = window.innerHeight;
      state.width = window.innerWidth;
    }
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    // ==========================================
    //  IDLE BREATHING (subtle bobbing)
    // ==========================================
    let breathTl: gsap.core.Timeline | null = null;
    function startIdleBreathing() {
      breathTl = gsap.timeline({ repeat: -1, yoyo: true });
      breathTl.to(q(".avatar-me"), {
        yPercent: -1.5,
        duration: 2.5,
        ease: "sine.inOut",
      });
    }

    // ==========================================
    //  ORBITAL PARTICLES (6 glowing dots)
    // ==========================================
    const orbitalTimelines: gsap.core.Tween[] = [];
    function startOrbitals() {
      const orbitContainer = section?.querySelector(".avatar-orbit-container");
      if (!orbitContainer) return;

      const particleCount = 6;
      for (let i = 0; i < particleCount; i++) {
        const dot = document.createElement("div");
        const hue = (i / particleCount) * 360;
        const radius = 140 + (i % 3) * 35;
        const size = 4 + Math.random() * 4;

        dot.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: hsl(${hue}, 80%, 65%);
          box-shadow: 0 0 ${size * 3}px hsl(${hue}, 80%, 65%), 0 0 ${size * 6}px hsl(${hue}, 80%, 45%);
          top: 50%;
          left: 50%;
          pointer-events: none;
          will-change: transform;
        `;
        orbitContainer.appendChild(dot);

        const duration = 6 + i * 1.2;
        const startAngle = (Math.PI * 2 * i) / particleCount;
        const obj = { angle: startAngle };

        const tw = gsap.to(obj, {
          angle: startAngle + Math.PI * 2,
          duration,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            const x = Math.cos(obj.angle) * radius;
            const y = Math.sin(obj.angle) * (radius * 0.35);
            dot.style.transform = `translate(${x}px, ${y}px)`;
            // Fade when behind (simulated depth)
            dot.style.opacity = String(
              0.3 + 0.7 * ((Math.sin(obj.angle) + 1) / 2),
            );
          },
        });
        orbitalTimelines.push(tw);
      }
    }

    // ==========================================
    //  AMBIENT PULSING RINGS
    // ==========================================
    let pulseInterval: ReturnType<typeof setInterval> | null = null;
    function startAmbientPulses() {
      const orbitContainer = section?.querySelector(".avatar-orbit-container");
      if (!orbitContainer) return;

      pulseInterval = setInterval(() => {
        const ring = document.createElement("div");
        ring.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1px solid rgba(204, 255, 0, 0.12);
          pointer-events: none;
        `;
        orbitContainer.appendChild(ring);

        gsap.to(ring, {
          width: 500,
          height: 500,
          opacity: 0,
          duration: 3,
          ease: "power1.out",
          onComplete: () => ring.remove(),
        });
      }, 4000);
    }

    // ==========================================
    //  FLOATING NUTRITION ICONS (ambient)
    // ==========================================
    const floatIcons =
      section?.querySelectorAll<HTMLElement>(".avatar-float-icon") ?? [];
    const floatTweens: gsap.core.Tween[] = [];
    floatIcons.forEach((icon, i) => {
      // Individual floating motion
      const tw = gsap.to(icon, {
        y: `+=${15 + (i % 3) * 8}`,
        duration: 3 + (i % 4) * 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.4,
      });
      floatTweens.push(tw);

      // Slow rotation
      const tw2 = gsap.to(icon, {
        rotation: (i % 2 === 0 ? 1 : -1) * 15,
        duration: 5 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      floatTweens.push(tw2);
    });

    // ==========================================
    //  CLEANUP
    // ==========================================
    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("mousemove", updateScreenCoords);
      gsap.ticker.remove(animateFace);
      meTl.kill();
      blink.kill();
      dizzy.kill();
      breathTl?.kill();
      orbitalTimelines.forEach((t) => t.kill());
      floatTweens.forEach((t) => t.kill());
      if (pulseInterval) clearInterval(pulseInterval);
    };
  }, [percentage]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* ===== Decorative glow background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] opacity-20"
          style={{
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(204,255,0,0.25) 0%, rgba(0,242,255,0.15) 50%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] opacity-10"
          style={{ background: "#00f2ff" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[120px] opacity-10"
          style={{ background: "#ccff00" }}
        />
      </div>

      {/* ===== Floating nutrition icons (ambient, parallax-reactive) ===== */}
      {FLOAT_ICONS.map((icon, i) => {
        // Position them around the edges
        const positions = [
          { top: "15%", left: "8%" },
          { top: "70%", left: "5%" },
          { top: "20%", right: "10%" },
          { top: "75%", right: "7%" },
          { top: "45%", left: "3%" },
          { top: "40%", right: "4%" },
        ];
        const pos = positions[i % positions.length];
        return (
          <div
            key={i}
            className="avatar-float-icon absolute pointer-events-none hidden md:block"
            style={{
              ...pos,
              opacity: 0.15,
              zIndex: 2,
              willChange: "transform",
            }}
          >
            <svg
              width={icon.size * 1.5}
              height={icon.size * 1.5}
              viewBox="0 0 24 24"
              fill={icon.path.includes("M6 5") ? "none" : icon.color}
              stroke={icon.path.includes("M6 5") ? icon.color : "none"}
              strokeWidth={icon.path.includes("M6 5") ? "2" : "0"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={icon.path} />
            </svg>
          </div>
        );
      })}

      {/* ===== Grid line decoration (subtle) ===== */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ===== Heading ===== */}
      <div className="text-center mb-20 relative z-10">
        <h3 className="text-3xl font-black tracking-tight uppercase mb-3 text-gradient">
          Meet the Creator, Anshul Kumar
        </h3>
        <p className="text-white/40 text-lg font-medium max-w-md mx-auto">
          The mind behind DietPilot AI.
        </p>
      </div>

      {/* ===== Orbital container (rings + dots live here) ===== */}
      <div className="avatar-orbit-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-0 h-0 pointer-events-none z-[3]" />

      {/* ===== Speech Bubble ===== */}
      <div
        ref={speechRef}
        className="absolute left-1/2 -translate-x-1/2 z-20 opacity-0 pointer-events-none"
        style={{ top: "calc(50% - 160px)" }}
      >
        <div
          className="relative px-5 py-3 rounded-2xl text-sm font-bold tracking-wide whitespace-nowrap"
          style={{
            background: "rgba(204, 255, 0, 0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(204, 255, 0, 0.25)",
            color: "#ccff00",
            boxShadow: "0 4px 30px rgba(204, 255, 0, 0.1)",
          }}
        >
          <span>Hello!</span>
          {/* Tail */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
            style={{
              background: "rgba(204, 255, 0, 0.12)",
              borderRight: "1px solid rgba(204, 255, 0, 0.25)",
              borderBottom: "1px solid rgba(204, 255, 0, 0.25)",
            }}
          />
        </div>
      </div>

      {/* ===== Character SVG ===== */}
      <div
        ref={containerRef}
        className="flex items-center justify-center relative z-10 cursor-pointer"
        onClick={handleClick}
      >
        {/* Emoji particle burst container */}
        <div
          ref={particleContainerRef}
          className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center"
        />

        <svg
          ref={svgRef}
          viewBox="0 10 211.73 180"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 w-[500px] max-w-[85vw] transition-[filter] duration-300 hover:drop-shadow-[0_0_40px_rgba(204,255,0,0.15)]"
        >
          <defs>
            <clipPath id="avatar-background-clip">
              <path
                d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-8.82-80.28-33.59-86.29C136.84-6.57 114.13-5.82 88-2.82S34.73 11.45 16.71 48.24C-1.5 66.64-4.88 125.2 39 153.73z"
                fill="none"
              />
            </clipPath>

            <linearGradient
              id="avatar-hair-grad"
              x1="102.94"
              y1="154.47"
              x2="102.94"
              y2="36.93"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#1a1615" />
              <stop offset="1" stopColor="#2d2522" />
            </linearGradient>
          </defs>

          {/* Background blob */}
          <path
            className="avatar-bg"
            d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-10.51-57-35.28-63-50.22 17-76.31 20-60.12-15.88-78.32 2.51S-4.88 125.2 39 153.73z"
            fill="#1a1a2e"
          />

          <g clipPath="url(#avatar-background-clip)">
            <g className="avatar-me" opacity="0">
              <g className="avatar-body">
                <path
                  className="avatar-hair-back avatar-hair"
                  d="M62 48c0 0 15-18 45-18s44 15 44 15 5 18 1 35-12 30-12 30l-5 25s-10 12-30 12-32-15-32-15l-7-24s-9-20-8-37 4-23 4-23z"
                  fill="url(#avatar-hair-grad)"
                />
                <path
                  className="avatar-neck"
                  d="M114.26 143.16v-14a9.22 9.22 0 10-18.43 0v14c-15.27 2.84-24.74 15.08-24.74 27.33H139c0-12.24-9.5-24.49-24.74-27.33z"
                  fill="#eacfa8"
                />
                <path
                  className="avatar-top"
                  d="M105.61 167c-30.17 0-25.36-40-25.36 15.84h25.35l25-2.14c-.05-55.79 5.17-13.7-24.99-13.7z"
                  fill="#e5e7eb"
                  stroke="#1f2937"
                  strokeWidth=".5"
                />
                <path
                  className="avatar-shoulder"
                  d="M95.82 142.87c-18 2-32 22-32 45h32z"
                  fill="#242526"
                />
                <path
                  className="avatar-shoulder"
                  d="M114.23 142.67c18 2 32 22 32 45.2h-32z"
                  fill="#242526"
                />
              </g>

              <path
                className="avatar-shadow"
                d="M95.82 122.36h18.41v14.31s-10.5 5.54-18.41 0z"
                fill="#cca37b"
              />

              <g className="avatar-head">
                <g className="avatar-ear-left avatar-ear">
                  <path
                    d="M63.52 105.14A8.21 8.21 0 0072 113.2a8.36 8.36 0 008.51-8.1A8.21 8.21 0 0072 97a8.36 8.36 0 00-8.48 8.14z"
                    fill="#eacfa8"
                  />
                  <path
                    d="M68.54 104.48a17 17 0 014.14.41c1.07.31 1.94 1 3 1.31a.39.39 0 00.43-.57c-1.15-2.38-5.49-1.86-7.58-1.67a.26.26 0 000 .52z"
                    fill="#bc9a78"
                  />
                </g>
                <g className="avatar-ear-right avatar-ear">
                  <path
                    d="M144.37 105.24a8.2 8.2 0 01-8.37 8.06 8.35 8.35 0 01-8.51-8.1 8.21 8.21 0 018.42-8.06 8.35 8.35 0 018.46 8.1z"
                    fill="#eacfa8"
                  />
                  <path
                    d="M139.6 104c-2.1-.19-6.43-.72-7.59 1.67a.39.39 0 00.44.57c1.07-.26 1.92-1 3-1.31a17.51 17.51 0 014.15-.41.26.26 0 000-.52z"
                    fill="#bc9a78"
                  />
                </g>

                <g className="avatar-face">
                  <rect
                    x="73.99"
                    y="48.26"
                    width="61.54"
                    height="80.49"
                    rx="18"
                    transform="rotate(180 104.76 88.5)"
                    fill="#eacfa8"
                  />

                  <g className="avatar-inner-face">
                    <path
                      className="avatar-eyebrow-right"
                      d="M123 77a9 9 0 00-5-2 9.8 9.8 0 00-5.5 1.5"
                      fill="none"
                      stroke="#2d2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      className="avatar-eyebrow-left"
                      d="M95 76.5a9.53 9.53 0 00-5.5-1.5 10.58 10.58 0 00-5 2"
                      fill="none"
                      stroke="#2d2522"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <path
                      className="avatar-mouth"
                      d="M96 109s5.5 1.5 12-2.5"
                      fill="none"
                      stroke="#967152"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      className="avatar-oh"
                      opacity="0"
                      d="M105.56,117.06c4-.14,5-2.89,4.7-5.64s-1.88-6.7-4.84-6.62-4.73,4.36-4.9,6.72S101.57,117.19,105.56,117.06Z"
                      fill="#262528"
                    />

                    <g className="avatar-eyes">
                      <path
                        className="avatar-eye-left avatar-eye"
                        d="M89.48 87.37c-.07 2.08 1.25 3.8 2.94 3.85s3.1-1.59 3.16-3.67-1.25-3.8-2.94-3.85-3.1 1.59-3.16 3.67z"
                        fill="#2b343b"
                      />
                      <path
                        className="avatar-eye-right avatar-eye"
                        d="M113.67 87.37c-.07 2.08 1.25 3.8 2.94 3.85s3.1-1.59 3.16-3.67-1.25-3.8-2.94-3.85-3.1 1.59-3.16 3.67z"
                        fill="#2b343b"
                      />
                      <path
                        className="avatar-eye-right-2 avatar-eye"
                        d="M114.11 88a5.72 5.72 0 002.48.72 6.46 6.46 0 002.59-.45"
                        opacity="0"
                        fill="none"
                        stroke="#282828"
                        strokeWidth="1.04"
                      />
                      <path
                        className="avatar-eye-left-2 avatar-eye"
                        d="M89.85 88a5.77 5.77 0 002.56.3 6.48 6.48 0 002.49-.87"
                        fill="none"
                        opacity="0"
                        stroke="#282828"
                        strokeWidth="1.04"
                      />
                    </g>

                    <path
                      className="avatar-dizzy avatar-dizzy-1"
                      opacity="0"
                      d="M113.61,87.6c.54-2.66,2.66-3.84,4.63-3.37A3.3,3.3,0,0,1,117,90.71a2.53,2.53,0,0,1-2-3,2.48,2.48,0,0,1,2.73-1.92A1.71,1.71,0,0,1,119.32,88a1.59,1.59,0,0,1-1.75,1.34c-.79-.1-1.41-.59-1-1.42s1-.72,1.22-.24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="0.75"
                    />
                    <path
                      className="avatar-dizzy avatar-dizzy-2"
                      opacity="0"
                      d="M96.15,87.27c-.54-2.66-2.66-3.84-4.63-3.37s-2.89,1.9-2.46,4a3.11,3.11,0,0,0,3.68,2.45,2.53,2.53,0,0,0,2-3A2.49,2.49,0,0,0,92,85.49a1.71,1.71,0,0,0-1.57,2.13A1.57,1.57,0,0,0,92.19,89c.79-.11,1.41-.6,1-1.43s-1-.72-1.22-.23"
                      fill="none"
                      stroke="#000"
                      strokeWidth="0.75"
                    />

                    <path
                      className="avatar-nose"
                      d="M102.5 96.5s2.5 1 5 0"
                      fill="none"
                      stroke="#cca37b"
                      strokeWidth="1.5"
                    />

                    <g className="avatar-glasses">
                      <rect
                        x="83"
                        y="79"
                        width="19"
                        height="16"
                        rx="5"
                        fill="#1e293b"
                        fillOpacity="0.35"
                        stroke="#111827"
                        strokeWidth="1.8"
                      />
                      <rect
                        x="107"
                        y="79"
                        width="19"
                        height="16"
                        rx="5"
                        fill="#1e293b"
                        fillOpacity="0.35"
                        stroke="#111827"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M81 79 h22"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M106 79 h22"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M102 82.5 Q104.5 80.5 107 82.5"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="86"
                        y1="81"
                        x2="91"
                        y2="91"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        opacity="0.4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="110"
                        y1="81"
                        x2="115"
                        y2="91"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        opacity="0.4"
                        strokeLinecap="round"
                      />
                    </g>

                    <path
                      className="avatar-blush-left avatar-eye"
                      d="M80 100l4-2"
                      fill="none"
                      stroke="#cca37b"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                    <path
                      className="avatar-blush-right avatar-eye"
                      d="M125 100l-4-2"
                      fill="none"
                      stroke="#cca37b"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  </g>

                  <path
                    className="avatar-hair-front"
                    d="M71 58c-3-10 2-23 15-26 15-3 28 2 34-4 4 6 12 1 17 6s5 15-2 20c-4 3-10-2-15-1-8 2-11 9-22 8s-17-4-22-1c-2-1-3-1-5-2z"
                    fill="#2d2522"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* ===== Interactive hint ===== */}
      <div className="mt-16 flex justify-center relative z-10">
        <div
          className="px-6 py-2 rounded-full text-xs font-bold tracking-widest text-white/50 uppercase animate-pulse"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Click &amp; move your cursor to play
        </div>
      </div>
    </section>
  );
}
