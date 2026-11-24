"use client";

import { useEffect, useRef } from "react";
import { EditorialProject } from "./editorialProjectsData";

interface FloatingProjectPreviewProps {
  projects: EditorialProject[];
  activeIndex: number | null;
  isVisible: boolean;
}

export default function FloatingProjectPreview({
  projects,
  activeIndex,
  isVisible,
}: FloatingProjectPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth lerp loop
    const tick = () => {
      const lerp = 0.12;
      pos.current.x += (pos.current.targetX - pos.current.x) * lerp;
      pos.current.y += (pos.current.targetY - pos.current.y) * lerp;

      if (containerRef.current) {
        // Smart offset: display preview to the right of the cursor so underlying text remains completely visible.
        // If cursor approaches the right viewport boundary, flip preview to the left of the cursor.
        const previewWidth = 380;
        const isNearRightEdge = pos.current.x > window.innerWidth - (previewWidth + 60);
        const offsetX = isNearRightEdge ? -(previewWidth + 28) : 28;
        
        // Clamp vertical position so preview stays comfortably within the viewport
        const clampedY = Math.max(130, Math.min(window.innerHeight - 130, pos.current.y));

        containerRef.current.style.transform = `translate3d(${Math.round(pos.current.x + offsetX)}px, ${Math.round(clampedY)}px, 0) translateY(-50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-40 hidden md:block will-change-transform"
      style={{
        opacity: isVisible && activeIndex !== null ? 1 : 0,
        transform: "translate3d(-500px, -500px, 0)",
        transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), scale 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        scale: isVisible && activeIndex !== null ? 1 : 0.85,
      }}
    >
      {/* Floating Image Preview Container with Elegant Aspect Ratio */}
      <div className="relative w-[320px] sm:w-[380px] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.08)] bg-neutral-900">
        {/* Layered Crossfading Images */}
        {projects.map((proj, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={proj.id}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(1.08)",
                visibility: isActive ? "visible" : "hidden",
              }}
            >
              <picture>
                <source srcSet={proj.image} type="image/webp" />
                <img
                  src={proj.fallbackImage}
                  alt={proj.name}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            </div>
          );
        })}

        {/* Custom Centered Circular "View" Cursor Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-[#4B50E8] shadow-[0_10px_25px_rgba(75,80,232,0.45)] flex items-center justify-center transform transition-transform duration-300 scale-100 group-hover:scale-110">
            <span className="text-white text-xs font-bold tracking-wider uppercase font-mono-tech">
              View
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
