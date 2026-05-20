"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";

gsap.registerPlugin(CustomEase, CustomWiggle);

export default function AvatarCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
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
    []
  );

  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    const root = containerRef.current;
    if (!root) return;

    // Scope all selectors to the container
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

    // --- Entrance Timeline ---
    gsap.set(q(".avatar-bg"), { transformOrigin: "50% 50%" });
    gsap.set(q(".avatar-ear-right"), { transformOrigin: "0% 50%" });
    gsap.set(q(".avatar-ear-left"), { transformOrigin: "100% 50%" });
    gsap.set(q(".avatar-me"), { opacity: 1 });

    const meTl = gsap.timeline({
      onComplete: addMouseEvent,
      delay: 0.3,
    });

    meTl
      .from(q(".avatar-me"), {
        duration: 1,
        yPercent: 100,
        ease: "elastic.out(0.5, 0.4)",
      }, 0.5)
      .from(q(".avatar-head, .avatar-hair, .avatar-shadow"), {
        duration: 0.9,
        yPercent: 20,
        ease: "elastic.out(0.58, 0.25)",
      }, 0.6)
      .from(q(".avatar-ear-right"), {
        duration: 1,
        rotate: 40,
        yPercent: 10,
        ease: "elastic.out(0.5, 0.2)",
      }, 0.7)
      .from(q(".avatar-ear-left"), {
        duration: 1,
        rotate: -40,
        yPercent: 10,
        ease: "elastic.out(0.5, 0.2)",
      }, 0.7)
      .to(q(".avatar-glasses"), {
        duration: 1,
        keyframes: [{ yPercent: -10 }, { yPercent: 0 }],
        ease: "elastic.out(0.5, 0.2)",
      }, 0.75)
      .from(q(".avatar-eyebrow-right, .avatar-eyebrow-left"), {
        duration: 1,
        yPercent: 300,
        ease: "elastic.out(0.5, 0.2)",
      }, 0.7)
      .to(q(".avatar-eye-right, .avatar-eye-left"), {
        duration: 0.01,
        opacity: 1,
      }, 0.85)
      .to(q(".avatar-eye-right-2, .avatar-eye-left-2"), {
        duration: 0.01,
        opacity: 0,
      }, 0.85);

    // --- Blink Timeline ---
    const blink = gsap.timeline({
      repeat: -1,
      repeatDelay: 5,
      paused: true,
    });

    blink
      .to(q(".avatar-eye-right, .avatar-eye-left"), {
        duration: 0.01,
        opacity: 0,
      }, 0)
      .to(q(".avatar-eye-right-2, .avatar-eye-left-2"), {
        duration: 0.01,
        opacity: 1,
      }, 0)
      .to(q(".avatar-eye-right, .avatar-eye-left"), {
        duration: 0.01,
        opacity: 1,
      }, 0.15)
      .to(q(".avatar-eye-right-2, .avatar-eye-left-2"), {
        duration: 0.01,
        opacity: 0,
      }, 0.15);

    // --- CustomWiggle ---
    CustomWiggle.create("avatarWiggle", {
      wiggles: 6,
      type: "easeOut",
    });
    CustomWiggle.create("avatarLessWiggle", {
      wiggles: 4,
      type: "easeInOut",
    });

    // --- Dizzy Timeline ---
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
      .to(q(".avatar-head, .avatar-hair-back, .avatar-shadow"), {
        duration: 6,
        rotate: 2,
        transformOrigin: "50% 50%",
        ease: "avatarWiggle",
      }, 0)
      .to(q(".avatar-me"), {
        duration: 6,
        rotate: -2,
        transformOrigin: "50% 100%",
        ease: "avatarWiggle",
      }, 0)
      .to(q(".avatar-me"), {
        duration: 4,
        scale: 0.99,
        transformOrigin: "50% 100%",
        ease: "avatarLessWiggle",
      }, 0)
      .to(q(".avatar-dizzy-1"), {
        rotate: -360,
        duration: 1,
        repeat: 5,
        transformOrigin: "50% 50%",
        ease: "none",
      }, 0.01)
      .to(q(".avatar-dizzy-2"), {
        rotate: 360,
        duration: 1,
        repeat: 5,
        transformOrigin: "50% 50%",
        ease: "none",
      }, 0.01)
      .to(q(".avatar-eyes"), { duration: 0.01, opacity: 1 }, 4)
      .to(q(".avatar-dizzy"), { duration: 0.01, opacity: 0 }, 4)
      .to(q(".avatar-oh"), { duration: 0.01, opacity: 0 }, 4)
      .to(q(".avatar-mouth"), { duration: 0.01, opacity: 1 }, 4);

    // --- Mouse tracking ---
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

      state.storedX = state.xPosition;
      state.storedY = state.yPosition;
    }

    function addMouseEvent() {
      const safeToAnimate = window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
      ).matches;

      if (safeToAnimate) {
        window.addEventListener("mousemove", updateScreenCoords);
        gsap.ticker.add(animateFace);
        blink.play();
      }
    }

    function updateWindowSize() {
      state.height = window.innerHeight;
      state.width = window.innerWidth;
    }
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("mousemove", updateScreenCoords);
      gsap.ticker.remove(animateFace);
      meTl.kill();
      blink.kill();
      dizzy.kill();
    };
  }, [percentage]);

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Decorative glow background */}
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

      {/* Heading */}
      <div className="text-center mb-20 relative z-10">
        <h3 className="text-3xl font-black tracking-tight uppercase mb-3 text-gradient">
          Meet the Creator
        </h3>
        <p className="text-white/40 text-lg font-medium max-w-md mx-auto">
          The mind behind DietPilot AI. Move your cursor around to interact.
        </p>
      </div>

      {/* Character */}
      <div
        ref={containerRef}
        className="flex items-center justify-center relative z-10"
      >
        <svg
          ref={svgRef}
          viewBox="0 10 211.73 180"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 w-[500px] max-w-[85vw]"
        >
          <defs>
            {/* Background clipping mask */}
            <clipPath id="avatar-background-clip">
              <path
                d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-8.82-80.28-33.59-86.29C136.84-6.57 114.13-5.82 88-2.82S34.73 11.45 16.71 48.24C-1.5 66.64-4.88 125.2 39 153.73z"
                fill="none"
              />
            </clipPath>

            {/* Hair Gradient */}
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

          {/* Cool Accent Background Blob */}
          <path
            className="avatar-bg"
            d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-10.51-57-35.28-63-50.22 17-76.31 20-60.12-15.88-78.32 2.51S-4.88 125.2 39 153.73z"
            fill="#1a1a2e"
          />

          <g clipPath="url(#avatar-background-clip)">
            <g className="avatar-me" opacity="0">
              <g className="avatar-body">
                {/* Sharp Undercut Back Hair */}
                <path
                  className="avatar-hair-back avatar-hair"
                  d="M62 48c0 0 15-18 45-18s44 15 44 15 5 18 1 35-12 30-12 30l-5 25s-10 12-30 12-32-15-32-15l-7-24s-9-20-8-37 4-23 4-23z"
                  fill="url(#avatar-hair-grad)"
                />

                {/* Neck */}
                <path
                  className="avatar-neck"
                  d="M114.26 143.16v-14a9.22 9.22 0 10-18.43 0v14c-15.27 2.84-24.74 15.08-24.74 27.33H139c0-12.24-9.5-24.49-24.74-27.33z"
                  fill="#eacfa8"
                />

                {/* Inner T-Shirt */}
                <path
                  className="avatar-top"
                  d="M105.61 167c-30.17 0-25.36-40-25.36 15.84h25.35l25-2.14c-.05-55.79 5.17-13.7-24.99-13.7z"
                  fill="#e5e7eb"
                  stroke="#1f2937"
                  strokeWidth=".5"
                />

                {/* Jacket Shoulders */}
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

              {/* Neck Shadow */}
              <path
                className="avatar-shadow"
                d="M95.82 122.36h18.41v14.31s-10.5 5.54-18.41 0z"
                fill="#cca37b"
              />

              <g className="avatar-head">
                {/* Ears */}
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

                {/* Face */}
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
                    {/* Eyebrows */}
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

                    {/* Mouth */}
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

                    {/* Eyes */}
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

                    {/* Dizzy State */}
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

                    {/* Nose */}
                    <path
                      className="avatar-nose"
                      d="M102.5 96.5s2.5 1 5 0"
                      fill="none"
                      stroke="#cca37b"
                      strokeWidth="1.5"
                    />

                    {/* Glasses */}
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

                    {/* Cheek Contours */}
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

                  {/* Front Hair */}
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

      {/* Interactive hint */}
      <div className="mt-16 flex justify-center relative z-10">
        <div className="bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-xs font-bold tracking-widest text-white/60 uppercase animate-pulse">
          Move your cursor to interact
        </div>
      </div>
    </section>
  );
}
