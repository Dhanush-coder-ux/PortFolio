"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Transition } from "framer-motion";
import {
  FileText,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Compass,
  X,
} from "lucide-react";
import {
  playMechanicalTick,
  toggleRotarySound,
  isRotarySoundEnabled,
} from "./rotaryAudio";

export interface NavSection {
  id: string;
  indexStr: string;
  label: string;
  shortLabel: string;
  href: string;
  subtitle: string;
  code: string;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "hero",
    indexStr: "01",
    label: "HOME",
    shortLabel: "HOME",
    href: "#hero",
    subtitle: "SYSTEM ORIGIN",
    code: "STN-01",
  },
  {
    id: "work",
    indexStr: "02",
    label: "WORK",
    shortLabel: "WORK",
    href: "#work",
    subtitle: "SELECTED REPOS",
    code: "STN-02",
  },
  {
    id: "technical",
    indexStr: "03",
    label: "TECHNICAL",
    shortLabel: "TECH",
    href: "#technical",
    subtitle: "ENGINEERING STACK",
    code: "STN-03",
  },
  {
    id: "architecture",
    indexStr: "04",
    label: "ARCHITECTURE",
    shortLabel: "ARCH",
    href: "#architecture",
    subtitle: "RAG PIPELINE",
    code: "STN-04",
  },
  {
    id: "experience",
    indexStr: "05",
    label: "EXPERIENCE",
    shortLabel: "EXP",
    href: "#experience",
    subtitle: "CAREER RECORD",
    code: "STN-05",
  },
  {
    id: "about",
    indexStr: "06",
    label: "ABOUT",
    shortLabel: "ABOUT",
    href: "#about",
    subtitle: "ENGINEER PROFILE",
    code: "STN-06",
  },
  {
    id: "contact",
    indexStr: "07",
    label: "CONTACT",
    shortLabel: "CONTACT",
    href: "#contact",
    subtitle: "DIRECT DISPATCH",
    code: "STN-07",
  },
];

const RESUME_URL = "/images/Dhanush_Kumar_Resume_ATS.pdf";

// ============================================================================
// MATHEMATICALLY CALIBRATED DIAL RADIAL & ANGULAR GEOMETRY
// Parent boundary: DIAL_RADIUS = 190px (Diameter: 380px, Center: 0, 0)
//
// Semicircular visible arc on desktop: [-90 deg, +90 deg] (X >= 0)
// Safe angular envelope: [-78 deg, +78 deg]
// 7 sections, ANGLE_STEP = 13.0 deg, MID_INDEX = 3 (Architecture at 0 deg)
// Base angles: -39 deg to +39 deg (span = 78 deg).
// Rotation range: -39 deg to +39 deg.
// When Station 0 is at 0 deg stop: Station 6 is at +78 deg (cos(78) > 0, X > 0).
// When Station 6 is at 0 deg stop: Station 0 is at -78 deg (cos(-78) > 0, X > 0).
// RESULT: Every single station ALWAYS remains 100% visible, fully clickable,
// and strictly inside the circular bezel boundary across all 7 selections!
// ============================================================================
const DIAL_RADIUS = 190;
const HOLE_PITCH_RADIUS = 140; // Finger holes pitch circle radius
const HOLE_RADIUS = 11.5;      // Finger hole radius
const HOLE_CHAMFER_RADIUS = 13.5; // Outer brass chamfer ring radius
const LABEL_EVEN_RADIUS = 96;  // Staggered radius for even indices (0, 2, 4, 6)
const LABEL_ODD_RADIUS = 74;   // Staggered radius for odd indices (1, 3, 5)
const ANGLE_STEP = 13.0;       // Angular step in degrees between adjacent stations
const MID_INDEX = 3;           // Section 3 (Architecture) is center (0 deg)

// Calculate base angle on the rotor disc for section i
export function getBaseAngle(index: number): number {
  return (index - MID_INDEX) * ANGLE_STEP;
}

// Target rotor rotation in degrees to bring section index to the 0 deg station
export function getTargetRotation(index: number): number {
  return -getBaseAngle(index);
}

// Convert rotor rotation into the nearest section index
export function getIndexFromRotation(rotation: number): number {
  const rawIdx = MID_INDEX - rotation / ANGLE_STEP;
  return Math.min(NAV_SECTIONS.length - 1, Math.max(0, Math.round(rawIdx)));
}

interface DragState {
  pointerId: number;
  prevAngle: number;
  accumulatedRotation: number;
  lastNearestIdx: number;
  svgElement: SVGSVGElement;
}

export default function RotaryDialNavbar() {
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [dialRotation, setDialRotation] = useState<number>(getTargetRotation(0));
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragRotation, setDragRotation] = useState<number>(getTargetRotation(0));

  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  const dialContainerRef = useRef<HTMLDivElement | null>(null);
  const isInteractingRef = useRef<boolean>(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const lastWheelTimeRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(getTargetRotation(0));

  useEffect(() => {
    setSoundOn(isRotarySoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = toggleRotarySound();
    setSoundOn(next);
    if (next) playMechanicalTick("snap");
  };

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      isInteractingRef.current = true;
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 700);

      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const navigateToIndex = useCallback(
    (index: number, shouldScroll = true) => {
      const clamped = Math.min(NAV_SECTIONS.length - 1, Math.max(0, index));
      setActiveIndex(clamped);
      const targetRot = getTargetRotation(clamped);
      currentRotationRef.current = targetRot;
      setDialRotation(targetRot);
      setDragRotation(targetRot);
      playMechanicalTick("snap");

      if (shouldScroll) {
        scrollToSection(NAV_SECTIONS[clamped].href);
      }
    },
    [scrollToSection]
  );

  // IntersectionObserver to auto-track active section while user scrolls page
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isInteractingRef.current || dragStateRef.current !== null) return;

      let maxRatio = 0;
      let targetSectionId = "";

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          targetSectionId = entry.target.id;
        }
      });

      if (targetSectionId) {
        const foundIdx = NAV_SECTIONS.findIndex((s) => s.id === targetSectionId);
        if (foundIdx !== -1 && foundIdx !== activeIndex) {
          setActiveIndex(foundIdx);
          const newRot = getTargetRotation(foundIdx);
          currentRotationRef.current = newRot;
          setDialRotation(newRot);
          setDragRotation(newRot);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-15% 0px -25% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75],
    });

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIndex]);

  // Robust pointer dragging engine with single source of truth
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    const svgEl = e.currentTarget;
    const rect = svgEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    try {
      svgEl.setPointerCapture(e.pointerId);
    } catch {
      // In case pointer capture is unsupported in some environments
    }

    const startRot = currentRotationRef.current;
    dragStateRef.current = {
      pointerId: e.pointerId,
      prevAngle: startAngle,
      accumulatedRotation: startRot,
      lastNearestIdx: activeIndex,
      svgElement: svgEl,
    };

    setDragRotation(startRot);
    setIsDragging(true);
    isInteractingRef.current = true;
    playMechanicalTick("click");
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const rect = drag.svgElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    // Continuous shortest-arc angular delta calculation
    let delta = ((currentAngle - drag.prevAngle + 540) % 360) - 180;
    drag.prevAngle = currentAngle;

    let computedRot = drag.accumulatedRotation + delta;

    // Bounded rotation with gentle spring resistance at extremes
    const maxRot = getTargetRotation(0) + 10;
    const minRot = getTargetRotation(NAV_SECTIONS.length - 1) - 10;

    let displayRot = computedRot;
    if (computedRot > maxRot) {
      displayRot = maxRot + (computedRot - maxRot) * 0.2;
    } else if (computedRot < minRot) {
      displayRot = minRot + (computedRot - minRot) * 0.2;
    }

    drag.accumulatedRotation = computedRot;
    setDragRotation(displayRot);

    const nearest = getIndexFromRotation(displayRot);
    if (nearest !== drag.lastNearestIdx) {
      drag.lastNearestIdx = nearest;
      playMechanicalTick("ratchet");
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    try {
      if (drag.svgElement.hasPointerCapture(e.pointerId)) {
        drag.svgElement.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    const finalRot = drag.accumulatedRotation;
    dragStateRef.current = null;
    setIsDragging(false);

    const snappedIdx = getIndexFromRotation(finalRot);
    navigateToIndex(snappedIdx, true);
  };

  // Global window fallback listeners for pointer cancellation
  useEffect(() => {
    const handleGlobalCancel = () => {
      if (dragStateRef.current) {
        const finalRot = dragStateRef.current.accumulatedRotation;
        dragStateRef.current = null;
        setIsDragging(false);
        const snappedIdx = getIndexFromRotation(finalRot);
        navigateToIndex(snappedIdx, true);
      }
    };

    window.addEventListener("pointerup", handleGlobalCancel);
    window.addEventListener("pointercancel", handleGlobalCancel);
    return () => {
      window.removeEventListener("pointerup", handleGlobalCancel);
      window.removeEventListener("pointercancel", handleGlobalCancel);
    };
  }, [navigateToIndex]);

  // Mouse wheel rotation over dial disc
  useEffect(() => {
    const dialEl = dialContainerRef.current;
    if (!dialEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 220) return;
      lastWheelTimeRef.current = now;

      if (e.deltaY > 10) {
        setActiveIndex((prev) => {
          const next = Math.min(NAV_SECTIONS.length - 1, prev + 1);
          if (next !== prev) navigateToIndex(next, true);
          return next;
        });
      } else if (e.deltaY < -10) {
        setActiveIndex((prev) => {
          const next = Math.max(0, prev - 1);
          if (next !== prev) navigateToIndex(next, true);
          return next;
        });
      }
    };

    dialEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => dialEl.removeEventListener("wheel", handleWheel);
  }, [navigateToIndex]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      navigateToIndex(activeIndex + 1, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      navigateToIndex(activeIndex - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      navigateToIndex(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      navigateToIndex(NAV_SECTIONS.length - 1, true);
    }
  };

  const currentSection = NAV_SECTIONS[activeIndex] || NAV_SECTIONS[0];
  const activeRotation = isDragging ? dragRotation : dialRotation;

  const springConfig: Transition = prefersReducedMotion
    ? { duration: 0.05 }
    : { type: "spring", stiffness: 240, damping: 25, mass: 0.85 };
  const dragTransition: Transition = { duration: 0 };

  return (
    <>
      {/* 
        ========================================================================
        DESKTOP & TABLET: FIXED SEMICIRCULAR ROTARY DIAL (LEFT VIEWPORT EDGE)
        - Clean circular boundary of diameter 380px.
        - Center aligned with left viewport edge (marginLeft: -190px).
        - Every navigation item is strictly contained inside the dial circle.
        - Console is docked neatly beneath the bottom arc.
        ========================================================================
      */}
      <aside
        ref={dialContainerRef}
        aria-label="Vintage Rotary Portfolio Navigation"
        role="navigation"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="rotary-dial-navbar fixed left-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none select-none hidden md:flex flex-col items-start outline-none focus-visible:ring-1 focus-visible:ring-[#E9B957]/50 max-h-screen py-2 overflow-visible"
      >
        {/* Main Dial Circular Boundary Container */}
        <div
          className="pointer-events-auto relative cursor-grab active:cursor-grabbing touch-none md:scale-[0.72] lg:scale-100 transition-transform duration-300"
          style={{
            transformOrigin: "190px 190px",
            marginLeft: "-190px",
            width: "380px",
            height: "380px",
          }}
        >
          {/* Ambient Warm Brass Lighting Glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none -z-10 blur-[45px] opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(233, 185, 87, 0.22) 0%, rgba(8, 9, 9, 0) 70%)",
            }}
          />

          {/* Strictly bounded SVG: viewBox="-190 -190 380 380" */}
          <svg
            viewBox="-190 -190 380 380"
            className="w-full h-full drop-shadow-[0_16px_45px_rgba(0,0,0,0.85)] filter"
            style={{ overflow: "hidden", borderRadius: "50%" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <defs>
              {/* Dial Surface Metallic Radial Gradient */}
              <radialGradient id="dialPlate" cx="40%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#1B1E1D" />
                <stop offset="45%" stopColor="#111413" />
                <stop offset="85%" stopColor="#0A0C0B" />
                <stop offset="100%" stopColor="#050606" />
              </radialGradient>

              {/* Outer Cast Metal Bezel Linear Gradient */}
              <linearGradient id="bezelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3A3F3D" />
                <stop offset="30%" stopColor="#1B1F1D" />
                <stop offset="70%" stopColor="#2A2F2D" />
                <stop offset="100%" stopColor="#121514" />
              </linearGradient>

              {/* Brass Gold Accent Gradient */}
              <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D076" />
                <stop offset="50%" stopColor="#E9B957" />
                <stop offset="100%" stopColor="#A88130" />
              </linearGradient>

              {/* Finger Hole Recessed Well Gradient */}
              <radialGradient id="holeDepth" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#050606" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#080909" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1B1E1D" stopOpacity="0.3" />
              </radialGradient>

              {/* Inner Bevel Depth Shadow */}
              <radialGradient id="innerBevel" cx="50%" cy="50%" r="50%">
                <stop offset="75%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
              </radialGradient>

              {/* Dial Boundary Protective Clip Path */}
              <clipPath id="dialBezelClip">
                <circle cx="0" cy="0" r={DIAL_RADIUS - 6} />
              </clipPath>
            </defs>

            {/* ---------------------------------------------------- */}
            {/* LAYER 1: Dial Base Plate, Rim & Vernier Scale        */}
            {/* ---------------------------------------------------- */}
            {/* Outer Cast Metal Rim */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS - 2}
              fill="#0A0C0B"
              stroke="url(#bezelGradient)"
              strokeWidth="3.5"
            />
            {/* Fine Concentric Bezel Inset */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS - 5}
              fill="none"
              stroke="#292D2B"
              strokeWidth="1"
              opacity="0.8"
            />
            {/* Charcoal Dial Plate Face */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS - 6}
              fill="url(#dialPlate)"
              stroke="#1B1F1D"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r={DIAL_RADIUS - 6} fill="url(#innerBevel)" />

            {/* Stationary Vernier Calibration Scale (r: 174px - 182px) */}
            {Array.from({ length: 61 }).map((_, i) => {
              const angleDeg = -90 + i * 3;
              const rad = (angleDeg * Math.PI) / 180;
              const isMajor = i % 10 === 0;
              const isMedium = i % 5 === 0;
              const tickLen = isMajor ? 7 : isMedium ? 4 : 2.5;
              const r1 = DIAL_RADIUS - 8;
              const r2 = r1 - tickLen;
              const x1 = r1 * Math.cos(rad);
              const y1 = r1 * Math.sin(rad);
              const x2 = r2 * Math.cos(rad);
              const y2 = r2 * Math.sin(rad);

              return (
                <line
                  key={`vernier-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? "#E9B957" : isMedium ? "#646966" : "#2E3331"}
                  strokeWidth={isMajor ? 1.25 : 0.8}
                  strokeOpacity={isMajor ? 0.75 : 0.5}
                />
              );
            })}

            {/* Concentric Precision Lathe Tracks */}
            <circle
              cx="0"
              cy="0"
              r="160"
              fill="none"
              stroke="#292D2B"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              opacity="0.6"
            />
            <circle
              cx="0"
              cy="0"
              r="114"
              fill="none"
              stroke="#292D2B"
              strokeWidth="0.6"
              opacity="0.4"
            />

            {/* ---------------------------------------------------- */}
            {/* LAYER 2: Rotating Rotor (Holes & Menu Labels)        */}
            {/* ---------------------------------------------------- */}
            <motion.g
              animate={{ rotate: activeRotation }}
              transition={isDragging ? dragTransition : springConfig}
              style={{ originX: "0px", originY: "0px" }}
              clipPath="url(#dialBezelClip)"
            >
              {/* Rotor Structural Spoke Lines */}
              {Array.from({ length: 24 }).map((_, idx) => {
                const spokeAngle = idx * 15;
                const rad = (spokeAngle * Math.PI) / 180;
                const x1 = 54 * Math.cos(rad);
                const y1 = 54 * Math.sin(rad);
                const x2 = 68 * Math.cos(rad);
                const y2 = 68 * Math.sin(rad);
                return (
                  <line
                    key={`spoke-${idx}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#232725"
                    strokeWidth="0.75"
                  />
                );
              })}

              {/* 7 Perfectly Contained Navigation Stations */}
              {NAV_SECTIONS.map((section, idx) => {
                const baseAngle = getBaseAngle(idx);
                const rad = (baseAngle * Math.PI) / 180;

                // Explicit polar coordinate calculation: x = cx + r*cos(a), y = cy + r*sin(a)
                const holeX = HOLE_PITCH_RADIUS * Math.cos(rad);
                const holeY = HOLE_PITCH_RADIUS * Math.sin(rad);

                // Staggered radii for perfect non-overlapping label layout
                const labelRadius = idx % 2 === 0 ? LABEL_EVEN_RADIUS : LABEL_ODD_RADIUS;
                const labelX = labelRadius * Math.cos(rad);
                const labelY = labelRadius * Math.sin(rad);

                const isActive = activeIndex === idx;
                const isHovered = hoveredIndex === idx;

                return (
                  <g
                    key={section.id}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToIndex(idx, true);
                    }}
                    onPointerEnter={() => setHoveredIndex(idx)}
                    onPointerLeave={() => setHoveredIndex(null)}
                  >
                    {/* Spoke Track between Hub and Hole */}
                    <line
                      x1={44 * Math.cos(rad)}
                      y1={44 * Math.sin(rad)}
                      x2={(HOLE_PITCH_RADIUS - HOLE_CHAMFER_RADIUS - 2) * Math.cos(rad)}
                      y2={(HOLE_PITCH_RADIUS - HOLE_CHAMFER_RADIUS - 2) * Math.sin(rad)}
                      stroke={isActive ? "#E9B957" : "#242927"}
                      strokeWidth={isActive ? 1.25 : 0.6}
                      strokeOpacity={isActive ? 0.75 : 0.35}
                    />

                    {/* Finger Hole Outer Chamfer Ring */}
                    <circle
                      cx={holeX}
                      cy={holeY}
                      r={HOLE_CHAMFER_RADIUS}
                      fill="none"
                      stroke={
                        isActive
                          ? "url(#brassGradient)"
                          : isHovered
                          ? "#F5F2E9"
                          : "#292E2C"
                      }
                      strokeWidth={isActive ? 1.75 : 0.85}
                      strokeOpacity={isActive ? 1 : 0.7}
                    />

                    {/* Finger Hole Recessed Well */}
                    <circle
                      cx={holeX}
                      cy={holeY}
                      r={HOLE_RADIUS}
                      fill="url(#holeDepth)"
                      stroke="#0D0F0E"
                      strokeWidth="1"
                    />

                    {/* Active Golden Highlight Ring */}
                    {isActive && (
                      <circle
                        cx={holeX}
                        cy={holeY}
                        r={HOLE_RADIUS - 1.5}
                        fill="none"
                        stroke="#E9B957"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Upright Section Number inside Finger Hole */}
                    <g
                      transform={`translate(${holeX}, ${holeY}) rotate(${-activeRotation})`}
                    >
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isActive ? "#E9B957" : isHovered ? "#F5F2E9" : "#808582"}
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                        letterSpacing="0.02em"
                        className="transition-colors duration-200"
                      >
                        {section.indexStr}
                      </text>
                    </g>

                    {/* 
                      Internal Navigation Menu Label:
                      Positioned at staggered radii (96px even / 74px odd) strictly inside safe annular band.
                      Counter-rotated for constant upright legibility.
                      Zero text overflow or clipping!
                    */}
                    <g
                      transform={`translate(${labelX}, ${labelY}) rotate(${-activeRotation})`}
                    >
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isActive ? "#E9B957" : isHovered ? "#F5F2E9" : "#6E7471"}
                        fontSize="7.5"
                        fontWeight={isActive ? "700" : "600"}
                        fontFamily="Space Grotesk, Inter, sans-serif"
                        letterSpacing="0.08em"
                        className="transition-colors duration-200"
                      >
                        {section.shortLabel}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Model Stencil Inscription */}
              <g transform="rotate(72)">
                <text
                  x="0"
                  y="-58"
                  textAnchor="middle"
                  fill="#2A302D"
                  fontSize="5.5"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.2em"
                >
                  DK-26 // IMPULSE
                </text>
              </g>
            </motion.g>

            {/* ---------------------------------------------------- */}
            {/* LAYER 3: Stationary Finger Stop Bracket (At 0 deg)   */}
            {/* ---------------------------------------------------- */}
            <g transform="translate(0, 0)">
              {/* Classic Brass Finger Stop Arm */}
              <path
                d={`M ${HOLE_PITCH_RADIUS - HOLE_CHAMFER_RADIUS - 3} -8 
                   L ${HOLE_PITCH_RADIUS + HOLE_CHAMFER_RADIUS + 6} -8 
                   L ${HOLE_PITCH_RADIUS + HOLE_CHAMFER_RADIUS + 11} 0 
                   L ${HOLE_PITCH_RADIUS + HOLE_CHAMFER_RADIUS + 6} 8 
                   L ${HOLE_PITCH_RADIUS - HOLE_CHAMFER_RADIUS - 3} 8 
                   Z`}
                fill="#0D0F0E"
                stroke="#E9B957"
                strokeWidth="1.2"
                strokeOpacity="0.9"
              />

              {/* Precision Stop Needle */}
              <polygon
                points={`${HOLE_PITCH_RADIUS - HOLE_CHAMFER_RADIUS - 5},0 ${
                  HOLE_PITCH_RADIUS - HOLE_CHAMFER_RADIUS - 1
                },-3 ${HOLE_PITCH_RADIUS - HOLE_CHAMFER_RADIUS - 1},3`}
                fill="#E9B957"
              />

              {/* Active Indicator Lamp Pip */}
              <circle
                cx={HOLE_PITCH_RADIUS + HOLE_CHAMFER_RADIUS + 8}
                cy="0"
                r="2.5"
                fill="#E9B957"
                className="animate-pulse"
              />
            </g>

            {/* ---------------------------------------------------- */}
            {/* LAYER 4: Central DK Brass & Gunmetal Medallion       */}
            {/* ---------------------------------------------------- */}
            <g
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigateToIndex(0, true);
              }}
            >
              <circle
                cx="0"
                cy="0"
                r="36"
                fill="#121514"
                stroke="url(#brassGradient)"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="32"
                fill="none"
                stroke="#A88130"
                strokeWidth="0.75"
                strokeDasharray="2 2"
                opacity="0.8"
              />
              <circle
                cx="0"
                cy="0"
                r="29"
                fill="#080909"
                stroke="#292D2B"
                strokeWidth="1.2"
              />

              {[
                [0, -24],
                [24, 0],
                [0, 24],
                [-24, 0],
              ].map(([rx, ry], i) => (
                <circle
                  key={`rivet-${i}`}
                  cx={rx}
                  cy={ry}
                  r="1.4"
                  fill="#3A3F3D"
                  stroke="#1A1D1C"
                  strokeWidth="0.4"
                />
              ))}

              <text
                x="0"
                y="-3"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#F5F2E9"
                fontSize="13.5"
                fontWeight="800"
                fontFamily="Space Grotesk, Inter, sans-serif"
                letterSpacing="0.08em"
              >
                DK
              </text>
              <text
                x="0"
                y="10"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#E9B957"
                fontSize="6"
                fontWeight="600"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="0.16em"
              >
                ENGINEER
              </text>
            </g>
          </svg>
        </div>

        {/* 
          --------------------------------------------------------------------
          STATION READOUT CONSOLE DOCKED DIRECTLY UNDERNEATH DIAL
          Responsive width and positioning ensures zero overlap with page content.
          --------------------------------------------------------------------
        */}
        <div className="pointer-events-auto pl-2.5 lg:pl-3 -mt-6 sm:-mt-5">
          <motion.div
            layout
            className="bg-[#080909]/95 backdrop-blur-xl border border-[#292D2B] rounded-xl p-2 lg:p-2.5 w-[142px] lg:w-[175px] shadow-[0_12px_36px_rgba(0,0,0,0.7)] text-left relative overflow-hidden"
          >
            {/* Top Gold Accent */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-[#E9B957]/70 via-[#E9B957]/30 to-transparent" />

            {/* Header: Station Code & Sound Toggle */}
            <div className="flex items-center justify-between gap-1 mb-1 lg:mb-1.5 pb-1 lg:pb-1.5 border-b border-[#1E2321]">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E9B957] animate-pulse" />
                <span className="font-mono-tech text-[8.5px] lg:text-[9.5px] tracking-wider text-[#A5A7A2] uppercase">
                  {currentSection.code}
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleSound}
                aria-label={soundOn ? "Mute mechanical dial clicks" : "Unmute mechanical dial clicks"}
                className="p-1 rounded text-[#6D7270] hover:text-[#E9B957] transition-colors"
                title={soundOn ? "Mute Clicks" : "Unmute Clicks"}
              >
                {soundOn ? (
                  <Volume2 className="w-3 h-3" />
                ) : (
                  <VolumeX className="w-3 h-3 text-[#555A58]" />
                )}
              </button>
            </div>

            {/* Section Name Display */}
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1 lg:gap-1.5">
                <span className="font-mono-tech text-[10px] lg:text-[11px] font-bold text-[#E9B957]">
                  {currentSection.indexStr}
                </span>
                <h3 className="font-display text-xs lg:text-sm font-bold text-[#F5F2E9] tracking-tight truncate">
                  {currentSection.label}
                </h3>
              </div>

              <p className="font-mono-tech text-[8px] lg:text-[8.5px] text-[#868A88] tracking-wide uppercase truncate">
                {currentSection.subtitle}
              </p>
            </div>

            {/* Steppers & Resume Action */}
            <div className="mt-1.5 lg:mt-2 pt-1.5 lg:pt-2 border-t border-[#1E2321] flex items-center justify-between gap-1">
              <div className="flex items-center gap-0.5 lg:gap-1">
                <button
                  type="button"
                  disabled={activeIndex <= 0}
                  onClick={() => navigateToIndex(activeIndex - 1, true)}
                  aria-label="Previous section"
                  className="p-0.5 lg:p-1 rounded bg-[#121514] border border-[#252A28] text-[#A5A7A2] hover:text-[#F5F2E9] hover:border-[#E9B957]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronUp className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                </button>

                <button
                  type="button"
                  disabled={activeIndex >= NAV_SECTIONS.length - 1}
                  onClick={() => navigateToIndex(activeIndex + 1, true)}
                  aria-label="Next section"
                  className="p-0.5 lg:p-1 rounded bg-[#121514] border border-[#252A28] text-[#A5A7A2] hover:text-[#F5F2E9] hover:border-[#E9B957]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronDown className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                </button>

                <span className="text-[8px] lg:text-[9px] font-mono-tech text-[#5A5F5D] pl-0.5">
                  {activeIndex + 1}/7
                </span>
              </div>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 lg:gap-1 px-1.5 lg:px-2 py-0.5 rounded-full bg-[#E9B957] text-[#080909] text-[8.5px] lg:text-[9.5px] font-semibold hover:bg-[#F5D076] transition-colors shadow-sm"
                title="Download ATS Resume"
              >
                <FileText className="w-2.5 h-2.5 stroke-[2.5]" />
                <span>CV</span>
                <ArrowUpRight className="w-2 h-2 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        </div>
      </aside>

      {/* 
        ========================================================================
        MOBILE & SMALL SCREENS (< 768px): COMPACT MECHANICAL NAV PUCK
        ========================================================================
      */}
      <div className="md:hidden fixed bottom-5 inset-x-4 z-50 pointer-events-none flex justify-center">
        <nav
          aria-label="Mobile Navigation"
          className="pointer-events-auto bg-[#080909]/95 border border-[#292D2B] rounded-full px-3.5 py-2 shadow-[0_12px_36px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-3 w-full max-w-sm"
        >
          <button
            type="button"
            onClick={() => setMobileExpanded(true)}
            className="flex items-center gap-2 group text-left"
            aria-label="Open vintage rotary dial navigation"
          >
            <div className="w-8 h-8 rounded-full bg-[#121514] border border-[#E9B957]/60 flex items-center justify-center relative shadow-sm">
              <span className="font-display text-[11px] font-bold text-[#E9B957]">
                DK
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E9B957] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-mono-tech text-[9px] text-[#A5A7A2] uppercase tracking-wider">
                {currentSection.code}
              </span>
              <span className="font-display text-xs font-bold text-[#F5F2E9] tracking-tight">
                {currentSection.label}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={activeIndex <= 0}
              onClick={() => navigateToIndex(activeIndex - 1, true)}
              aria-label="Previous section"
              className="p-1.5 rounded-full bg-[#161A18] border border-[#292D2B] text-[#A5A7A2] disabled:opacity-30"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <button
              type="button"
              disabled={activeIndex >= NAV_SECTIONS.length - 1}
              onClick={() => navigateToIndex(activeIndex + 1, true)}
              aria-label="Next section"
              className="p-1.5 rounded-full bg-[#161A18] border border-[#292D2B] text-[#A5A7A2] disabled:opacity-30"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileExpanded(true)}
              className="px-2.5 py-1.5 rounded-full bg-[#E9B957]/15 border border-[#E9B957]/50 text-[#E9B957] text-[11px] font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>DIAL</span>
            </button>
          </div>
        </nav>
      </div>

      {/* 
        ========================================================================
        MOBILE FULL ROTARY DIAL DRAWER / MODAL
        ========================================================================
      */}
      <AnimatePresence>
        {mobileExpanded && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="bg-[#0C0E0D] border-t border-[#292D2B] rounded-t-3xl p-5 pb-8 flex flex-col items-center shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setMobileExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.06] border border-[#292D2B] text-[#A5A7A2] hover:text-[#F5F2E9]"
                aria-label="Close rotary menu"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1 mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E9B957]/10 border border-[#E9B957]/30 text-[#E9B957] font-mono-tech text-[10px] tracking-wider uppercase">
                  <span>ROTARY TELEPHONIC SELECTOR</span>
                </div>
                <h4 className="font-display text-lg font-bold text-[#F5F2E9]">
                  {currentSection.indexStr} // {currentSection.label}
                </h4>
                <p className="font-mono-tech text-xs text-[#8A8F8C]">
                  {currentSection.subtitle}
                </p>
              </div>

              {/* Mobile Circular Dial: Strictly Bounded within 280px */}
              <div className="relative w-[280px] h-[280px] my-2 touch-none cursor-grab active:cursor-grabbing">
                <svg
                  viewBox="-190 -190 380 380"
                  className="w-full h-full drop-shadow-xl"
                  style={{ overflow: "hidden", borderRadius: "50%" }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={DIAL_RADIUS - 2}
                    fill="#101312"
                    stroke="#292D2B"
                    strokeWidth="3"
                  />

                  <motion.g
                    animate={{ rotate: activeRotation }}
                    transition={isDragging ? dragTransition : springConfig}
                    style={{ originX: "0px", originY: "0px" }}
                  >
                    {NAV_SECTIONS.map((section, idx) => {
                      const baseAngle = getBaseAngle(idx);
                      const rad = (baseAngle * Math.PI) / 180;
                      const holeX = HOLE_PITCH_RADIUS * Math.cos(rad);
                      const holeY = HOLE_PITCH_RADIUS * Math.sin(rad);
                      const labelRadius = idx % 2 === 0 ? LABEL_EVEN_RADIUS : LABEL_ODD_RADIUS;
                      const labelX = labelRadius * Math.cos(rad);
                      const labelY = labelRadius * Math.sin(rad);
                      const isActive = activeIndex === idx;

                      return (
                        <g
                          key={`mobile-${section.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToIndex(idx, true);
                            setMobileExpanded(false);
                          }}
                        >
                          <circle
                            cx={holeX}
                            cy={holeY}
                            r={HOLE_CHAMFER_RADIUS}
                            fill="#080909"
                            stroke={isActive ? "#E9B957" : "#3D4441"}
                            strokeWidth={isActive ? 1.75 : 1}
                          />
                          <g
                            transform={`translate(${holeX}, ${holeY}) rotate(${-activeRotation})`}
                          >
                            <text
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isActive ? "#E9B957" : "#A5A7A2"}
                              fontSize="10"
                              fontWeight="bold"
                              fontFamily="JetBrains Mono, monospace"
                            >
                              {section.indexStr}
                            </text>
                          </g>

                          <g
                            transform={`translate(${labelX}, ${labelY}) rotate(${-activeRotation})`}
                          >
                            <text
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={isActive ? "#E9B957" : "#7A807D"}
                              fontSize="7.5"
                              fontWeight={isActive ? "700" : "600"}
                              fontFamily="Space Grotesk, sans-serif"
                            >
                              {section.shortLabel}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </motion.g>

                  <circle
                    cx="0"
                    cy="0"
                    r="34"
                    fill="#080909"
                    stroke="#E9B957"
                    strokeWidth="1.75"
                  />
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#F5F2E9"
                    fontSize="14"
                    fontWeight="800"
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    DK
                  </text>
                </svg>
              </div>

              {/* Direct Access Section Buttons */}
              <div className="w-full grid grid-cols-2 gap-2 mt-4">
                {NAV_SECTIONS.map((section, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={`mob-btn-${section.id}`}
                      type="button"
                      onClick={() => {
                        navigateToIndex(idx, true);
                        setMobileExpanded(false);
                      }}
                      className={`px-3 py-2 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                        isActive
                          ? "bg-[#E9B957]/15 border-[#E9B957] text-[#E9B957]"
                          : "bg-[#141816] border-[#292D2B] text-[#A5A7A2] hover:text-[#F5F2E9]"
                      }`}
                    >
                      <span className="font-mono-tech font-bold mr-1">
                        {section.indexStr}
                      </span>
                      <span className="font-display font-medium truncate">
                        {section.label}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E9B957]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Download ATS Resume Action */}
              <div className="w-full mt-4 pt-3 border-t border-[#292D2B]">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#E9B957] text-[#080909] transition-transform active:scale-[0.98]"
                >
                  <FileText className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Resume (PDF)</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
