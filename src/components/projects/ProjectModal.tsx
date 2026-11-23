"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  BarChart3,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { ProjectItem } from "./projectsData";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Handle ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  // Compile all images into an array for gallery viewing
  const allImages = [
    {
      src: project.mainImage,
      fallback: project.mainImageFallback,
      caption: "Main Application Interface & Core Workflow",
      title: "Hero View",
    },
    ...project.supportingImages.map((img) => ({
      src: img.src,
      fallback: img.fallback,
      caption: img.caption,
      title: img.alt,
    })),
  ];

  const currentImage = allImages[activeImageIndex] || allImages[0];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop with blur & smooth fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border bg-[#08080c] shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-10 flex flex-col custom-scrollbar"
          style={{
            borderColor: `${project.theme.accent}40`,
            boxShadow: `0 25px 90px -15px rgba(0, 0, 0, 0.95), 0 0 60px ${project.theme.glow}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glow in Modal Header */}
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none -z-10 rounded-t-3xl"
            style={{
              background: `radial-gradient(ellipse at top, ${project.theme.glow} 0%, transparent 75%)`,
            }}
          />

          {/* Sticky Header with Title & Close button */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8 py-5 bg-[#08080c]/90 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                style={{
                  backgroundColor: project.theme.pillBg,
                  borderColor: project.theme.border,
                  color: project.theme.pillText,
                }}
              >
                {project.number}
              </span>
              <div>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400">
                  {project.category}
                </p>
                <h2
                  id="modal-project-title"
                  className="text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1"
                >
                  {project.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Gallery / Screenshot Showcase Carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
              {/* Browser bar top */}
              <div className="h-8 px-4 bg-[#121218] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="px-4 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-zinc-400 font-mono truncate max-w-sm">
                  {project.url}
                </div>
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {activeImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              </div>

              {/* Main Preview Container */}
              <div className="relative aspect-[16/9] w-full bg-[#050508] overflow-hidden group">
                <picture key={currentImage.src}>
                  <source srcSet={currentImage.src} type="image/webp" />
                  <img
                    src={currentImage.fallback}
                    alt={currentImage.title}
                    className="w-full h-full object-cover object-top transition-all duration-500"
                  />
                </picture>

                {/* Left/Right Carousel Controls */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous screenshot"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/65 hover:bg-black/90 border border-white/15 text-white backdrop-blur-md opacity-80 hover:opacity-100 transition-all shadow-xl"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next screenshot"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/65 hover:bg-black/90 border border-white/15 text-white backdrop-blur-md opacity-80 hover:opacity-100 transition-all shadow-xl"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs text-zinc-300">
                  <span className="font-medium">{currentImage.caption}</span>
                  <span className="font-mono text-zinc-400 text-[11px] hidden sm:inline">
                    {currentImage.title}
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 p-3 bg-[#0d0d12] border-t border-white/10 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden border transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? "ring-2 scale-105 border-transparent"
                          : "opacity-60 hover:opacity-90 border-white/15"
                      }`}
                      style={{
                        borderColor: activeImageIndex === idx ? project.theme.accent : undefined,
                      }}
                    >
                      <picture>
                        <source srcSet={img.src} type="image/webp" />
                        <img
                          src={img.fallback}
                          alt={img.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </picture>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs Bar: Live Demo & GitHub */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div>
                <p className="text-xs text-zinc-400">Interactive Production Build</p>
                <h4 className="text-base font-bold text-white">Experience it live</h4>
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-sm font-semibold text-white transition-all duration-200"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: project.theme.accent,
                      color: "#000000",
                    }}
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  </a>
                )}
              </div>
            </div>

            {/* Main Engineering Challenge Callout */}
            <div className="p-5 rounded-2xl bg-[#101312] border border-[#292D2B] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#E8B95C]">
                <Cpu className="w-4 h-4 text-[#E8B95C]" />
                <span>Primary Engineering Challenge</span>
              </div>
              <p className="text-sm text-[#F5F2E9] leading-relaxed">
                {project.engineeringChallenge}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300">
                <Sparkles className="w-4 h-4 text-[#E8B95C]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#A5A7A2]">
                  System Architecture & Objective
                </h3>
              </div>
              <p className="text-[#F5F2E9] text-sm sm:text-base leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features & Architectural Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Features */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4>Key Capabilities</h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {project.keyFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <h4>Technical Architecture</h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {project.architecture.map((arch) => (
                    <li key={arch} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Tech Stack Tags */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Technologies & Tools Employed
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/[0.04] border border-white/10 text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
