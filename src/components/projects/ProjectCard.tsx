"use client";

import { useState, useRef, useCallback, MouseEvent } from "react";
import { ExternalLink, ArrowUpRight, Layers } from "lucide-react";
import { GithubIcon } from "./Icons";
import { ProjectItem } from "./projectsData";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
  onHover: (project: ProjectItem | null) => void;
  isHovered: boolean;
  onCardMouseEnter: () => void;
  onCardMouseLeave: () => void;
}

export default function ProjectCard({
  project,
  index,
  onSelect,
  onHover,
  isHovered,
  onCardMouseEnter,
  onCardMouseLeave,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isMouseInside, setIsMouseInside] = useState(false);

  // Smooth 3D tilt calculation based on cursor relative to card center
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX; // -1 to 1
    const normY = (y - centerY) / centerY; // -1 to 1

    // Subtle 3D tilt angles (max ~8 degrees for natural elegance)
    const maxTilt = 7;
    setRotateX(-normY * maxTilt);
    setRotateY(normX * maxTilt);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsMouseInside(true);
    onHover(project);
    onCardMouseEnter();
  }, [onHover, project, onCardMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false);
    setRotateX(0);
    setRotateY(0);
    onHover(null);
    onCardMouseLeave();
  }, [onHover, onCardMouseLeave]);

  return (
    <div
      ref={cardRef}
      className="project-card-container group relative flex flex-col w-full h-full cursor-pointer perspective-1200"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      {/* 3D Transform Wrapper */}
      <div
        className="w-full flex flex-col rounded-3xl p-6 sm:p-8 transition-transform duration-500 ease-out preserve-3d project-card-glass"
        style={{
          transform: isMouseInside
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          borderColor: isHovered ? project.theme.border : "rgba(255, 255, 255, 0.08)",
          boxShadow: isHovered
            ? `0 32px 70px -15px rgba(0, 0, 0, 0.8), 0 0 35px ${project.theme.glow}`
            : undefined,
        }}
      >
        {/* Top Header inside card: Index number & Category tag */}
        <div className="flex items-center justify-between gap-4 mb-6 z-10">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-full border transition-colors duration-300"
              style={{
                borderColor: isHovered ? project.theme.border : "rgba(255, 255, 255, 0.12)",
                backgroundColor: isHovered ? project.theme.pillBg : "rgba(255, 255, 255, 0.03)",
                color: isHovered ? project.theme.pillText : "#a7a6a0",
              }}
            >
              {project.number}
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-wider transition-colors duration-300 line-clamp-1"
              style={{
                color: isHovered ? project.theme.pillText : "#a7a6a0",
              }}
            >
              {project.category}
            </span>
          </div>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border"
            style={{
              backgroundColor: isHovered ? project.theme.accent : "rgba(255, 255, 255, 0.05)",
              borderColor: isHovered ? project.theme.accent : "rgba(255, 255, 255, 0.1)",
              transform: isHovered ? "scale(1.1) rotate(45deg)" : "scale(1) rotate(0deg)",
            }}
          >
            <ArrowUpRight
              className="w-4 h-4 transition-colors duration-300"
              style={{ color: isHovered ? "#000000" : "#d9d6cc" }}
            />
          </div>
        </div>

        {/* 3D Stacked Website Mockups Showcase */}
        <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] my-2 sm:my-4 flex items-center justify-center preserve-3d select-none">
          {/* Subtle Ambient Radial Glow behind the mockup */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700 blur-2xl -z-10"
            style={{
              background: `radial-gradient(circle at center, ${project.theme.glow} 0%, transparent 70%)`,
              opacity: isHovered ? 0.9 : 0.25,
            }}
          />

          {/* Left Supporting Screenshot (Layer behind) */}
          {project.supportingImages[0] && (
            <div
              className="absolute w-[78%] aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 ease-out preserve-3d animate-float-1"
              style={{
                zIndex: 1,
                transform: isHovered
                  ? "translateX(-48px) translateY(-22px) translateZ(-30px) rotate(-11deg) scale(0.92)"
                  : "translateX(-28px) translateY(-10px) translateZ(-40px) rotate(-6.5deg) scale(0.88)",
                filter: isHovered ? "brightness(0.95)" : "brightness(0.65) blur(0.3px)",
                opacity: isHovered ? 0.95 : 0.75,
              }}
            >
              <div className="w-full h-4 bg-[#141418] border-b border-white/10 flex items-center px-2 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              </div>
              <picture>
                <source srcSet={project.supportingImages[0].src} type="image/webp" />
                <img
                  src={project.supportingImages[0].fallback}
                  alt={project.supportingImages[0].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </picture>
            </div>
          )}

          {/* Right Supporting Screenshot (Layer behind) */}
          {project.supportingImages[1] && (
            <div
              className="absolute w-[76%] aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 ease-out preserve-3d animate-float-2"
              style={{
                zIndex: 2,
                transform: isHovered
                  ? "translateX(48px) translateY(-18px) translateZ(-20px) rotate(11deg) scale(0.90)"
                  : "translateX(28px) translateY(-8px) translateZ(-30px) rotate(6.5deg) scale(0.86)",
                filter: isHovered ? "brightness(0.95)" : "brightness(0.65) blur(0.3px)",
                opacity: isHovered ? 0.95 : 0.75,
              }}
            >
              <div className="w-full h-4 bg-[#141418] border-b border-white/10 flex items-center px-2 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              </div>
              <picture>
                <source srcSet={project.supportingImages[1].src} type="image/webp" />
                <img
                  src={project.supportingImages[1].fallback}
                  alt={project.supportingImages[1].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </picture>
            </div>
          )}

          {/* Center Main Website Mockup (Primary Hero Layer) */}
          <div
            className="relative w-[84%] aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out preserve-3d"
            style={{
              zIndex: 10,
              transform: isHovered
                ? "translateZ(35px) scale(1.04) translateY(-8px)"
                : "translateZ(10px) scale(1) translateY(0px)",
              borderColor: isHovered ? project.theme.border : "rgba(255, 255, 255, 0.15)",
              boxShadow: isHovered
                ? `0 35px 70px -15px rgba(0, 0, 0, 0.95), 0 0 25px ${project.theme.glow}`
                : "0 25px 50px -15px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Sleek Browser Chrome Header */}
            <div className="browser-chrome h-6 sm:h-7 px-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
              </div>

              {/* Minimal URL Bar Mock */}
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/5 border border-white/5 max-w-[65%]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-zinc-400 font-mono truncate">
                  {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                <Layers className="w-3 h-3 text-zinc-400" />
              </div>
            </div>

            {/* Main Project Screenshot */}
            <div className="relative w-full h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)] bg-[#050508] overflow-hidden">
              <picture>
                <source srcSet={project.mainImage} type="image/webp" />
                <img
                  src={project.mainImageFallback}
                  alt={`${project.title} interface preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
                  style={{
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                />
              </picture>

              {/* Subtle glossy light sheen overlay on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-white/10"
                style={{ opacity: isHovered ? 1 : 0 }}
              />
            </div>
          </div>
        </div>

        {/* Project Information Footer */}
        <div className="flex flex-col mt-4 sm:mt-6 z-10">
          {/* Title with hover color reveal */}
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors duration-300"
            style={{
              color: isHovered ? project.theme.pillText : "#f7f5ee",
            }}
          >
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-zinc-500">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Action Links Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-200"
              style={{
                color: isHovered ? project.theme.pillText : "#d9d6cc",
              }}
            >
              <span>Explore Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View GitHub repository for ${project.title}`}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white transition-all duration-200"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open live demo for ${project.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-sm"
                  style={{
                    backgroundColor: isHovered ? project.theme.accent : "rgba(255, 255, 255, 0.08)",
                    color: isHovered ? "#000000" : "#ffffff",
                    borderColor: isHovered ? project.theme.accent : "rgba(255, 255, 255, 0.12)",
                  }}
                  title="Open Live Website"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
