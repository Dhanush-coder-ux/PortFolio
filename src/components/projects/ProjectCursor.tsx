"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCursorProps {
  isVisible: boolean;
  isHoveringCard: boolean;
  cursorText?: string;
  accentColor?: string;
}

export default function ProjectCursor({
  isVisible,
  isHoveringCard,
  cursorText = "VIEW PROJECT",
  accentColor = "#f0c56f",
}: ProjectCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth lerp loop
    const updateCursor = () => {
      const lerpFactor = 0.18;
      posRef.current.x += (targetPos.current.x - posRef.current.x) * lerpFactor;
      posRef.current.y += (targetPos.current.y - posRef.current.y) * lerpFactor;

      setPosition({
        x: Math.round(posRef.current.x * 10) / 10,
        y: Math.round(posRef.current.y * 10) / 10,
      });

      rafId.current = requestAnimationFrame(updateCursor);
    };

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="custom-cursor-badge pointer-events-none hidden md:flex items-center justify-center select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className={`flex items-center gap-2 rounded-full font-semibold transition-all duration-300 backdrop-blur-md shadow-2xl border ${
          isHoveringCard
            ? "px-4 py-2.5 bg-black/85 text-white border-white/20 scale-100"
            : "w-4 h-4 bg-white/40 border-white/30 rounded-full scale-75"
        }`}
        style={{
          boxShadow: isHoveringCard
            ? `0 10px 30px -5px rgba(0,0,0,0.8), 0 0 20px ${accentColor}33`
            : undefined,
          borderColor: isHoveringCard ? `${accentColor}66` : undefined,
        }}
      >
        {isHoveringCard && (
          <>
            <span
              className="text-[11px] font-bold tracking-wider uppercase whitespace-nowrap"
              style={{ color: "#ffffff" }}
            >
              {cursorText}
            </span>
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <ArrowUpRight className="w-3 h-3 text-black stroke-[2.5]" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
