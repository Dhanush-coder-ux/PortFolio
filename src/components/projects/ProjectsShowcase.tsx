"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projectsData, ProjectItem } from "./projectsData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectCursor from "./ProjectCursor";
import { Sparkles, Layers, ArrowDownRight } from "lucide-react";
import "./projects.css";

// Ensure GSAP plugins are registered in client environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Filter categories
  const categories = useMemo(() => {
    return ["All", "AI / RAG", "Enterprise CRM", "Retail POS", "Frontend UI"];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    if (activeFilter === "AI / RAG")
      return projectsData.filter((p) => p.category.includes("RAG") || p.category.includes("AI"));
    if (activeFilter === "Enterprise CRM")
      return projectsData.filter((p) => p.category.includes("CRM"));
    if (activeFilter === "Retail POS")
      return projectsData.filter((p) => p.category.includes("Retail"));
    if (activeFilter === "Frontend UI")
      return projectsData.filter(
        (p) => p.category.includes("Landing") || p.category.includes("E-Commerce")
      );
    return projectsData;
  }, [activeFilter]);

  // Current active theme colors (fallback to default dark theme)
  const activeTheme = hoveredProject?.theme;

  // GSAP ScrollTrigger Animations
  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const cards = gsap.utils.toArray<HTMLElement>(".project-card-container");

      // Progressive reveal animation as section enters viewport
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: (i % 2) * 0.15, // stagger columns
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Subtle vertical parallax movement while scrolling for column 2
        if (i % 2 === 1 && window.innerWidth >= 1024) {
          gsap.to(card, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      // Refresh ScrollTrigger after elements render
      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [filteredProjects] }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden projects-showcase-bg transition-colors duration-1000"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => {
        setIsSectionHovered(false);
        setHoveredProject(null);
        setIsHoveringCard(false);
      }}
      style={{
        backgroundColor: activeTheme ? activeTheme.background : "#030305",
      }}
    >
      {/* Dynamic Ambient Background Mesh */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out -z-10"
        style={{
          background: activeTheme
            ? `radial-gradient(ellipse 80% 60% at 50% 30%, ${activeTheme.glow} 0%, ${activeTheme.background} 60%, #030305 100%)`
            : "radial-gradient(circle at 50% 20%, rgba(98, 230, 196, 0.05) 0%, transparent 60%)",
          opacity: activeTheme ? 1 : 0.6,
        }}
      />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
        }}
      />

      {/* Section Container */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Editorial Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Selected Case Studies</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f7f5ee] leading-[1.05]">
              Production-minded systems with measurable impact.
            </h2>

            <p className="text-base sm:text-lg text-[#a7a6a0] leading-relaxed max-w-xl">
              An editorial gallery of full-stack AI engineering, production CRM deployments, and
              high-performance web interfaces with layered website mockups.
            </p>
          </div>

          {/* Project count indicator & Quick Filter tabs */}
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                SHOWING {filteredProjects.length} OF {projectsData.length} CASE STUDIES
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeFilter === category
                      ? "bg-white text-black shadow-md font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Editorial Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start"
        >
          {filteredProjects.map((project, index) => {
            const isRightColumn = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`w-full flex ${
                  isRightColumn ? "lg:mt-16" : ""
                } transition-all duration-300`}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={(p) => setSelectedProject(p)}
                  onHover={(p) => setHoveredProject(p)}
                  isHovered={hoveredProject?.id === project.id}
                  onCardMouseEnter={() => setIsHoveringCard(true)}
                  onCardMouseLeave={() => setIsHoveringCard(false)}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Banner / Footer Note */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            <span>Interactive 3D Stacked View • Click any card for detailed architecture</span>
          </div>

          <a
            href="https://github.com/Dhanush-coder-ux"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Browse all open source repositories</span>
            <ArrowDownRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Custom Follower Cursor */}
      <ProjectCursor
        isVisible={isSectionHovered}
        isHoveringCard={isHoveringCard}
        cursorText="VIEW PROJECT"
        accentColor={activeTheme ? activeTheme.accent : "#f0c56f"}
      />

      {/* Detailed Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
