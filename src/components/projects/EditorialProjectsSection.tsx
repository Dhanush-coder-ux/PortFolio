"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { editorialProjects, EditorialProject } from "./editorialProjectsData";
import FloatingProjectPreview from "./FloatingProjectPreview";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EditorialProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isHoveringList, setIsHoveringList] = useState(false);

  // GSAP scroll reveals for project rows
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const rows = gsap.utils.toArray<HTMLElement>(".editorial-project-row");

      gsap.fromTo(
        rows,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 82%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#F8F8F5] text-[#111111] pt-28 sm:pt-36 pb-32 sm:pb-44 transition-colors duration-500 overflow-hidden"
    >
      {/* Floating Project Image Preview (Desktop/Tablet) */}
      <FloatingProjectPreview
        projects={editorialProjects}
        activeIndex={activeProjectIndex}
        isVisible={isHoveringList}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:pl-48 md:pr-10 lg:pl-64 lg:pr-16 relative z-10">
        {/* Section Introduction Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.05] border border-black/15 text-xs font-mono-tech tracking-wider uppercase text-neutral-800 font-medium">
            <span>SELECTED WORK — 2026</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium tracking-tight text-[#111111]">
            Things I&apos;ve built.
          </h2>

          <p className="text-base sm:text-xl text-neutral-700 leading-relaxed font-light max-w-xl">
            A selection of software systems, applications and experiments I&apos;ve worked on.
          </p>
        </div>

        {/* Project List: Editorial Horizontal Rows */}
        <div
          ref={listRef}
          className="border-t border-[#D0CFC8]"
          onMouseEnter={() => setIsHoveringList(true)}
          onMouseLeave={() => {
            setIsHoveringList(false);
            setActiveProjectIndex(null);
          }}
        >
          {editorialProjects.map((project, index) => {
            const isHovered = activeProjectIndex === index;

            return (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setActiveProjectIndex(index);
                  setIsHoveringList(true);
                }}
                onFocus={() => {
                  setActiveProjectIndex(index);
                  setIsHoveringList(true);
                }}
                onBlur={() => {
                  setActiveProjectIndex(null);
                  setIsHoveringList(false);
                }}
                className="editorial-project-row group block py-8 sm:py-12 lg:py-14 border-b border-[#D0CFC8] transition-colors duration-300 relative focus:outline-none"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                  {/* LEFT: Project Number, Oversized Title & Description */}
                  <div className="flex items-start gap-4 sm:gap-8 max-w-3xl">
                    <span className="font-mono-tech text-sm sm:text-base text-neutral-500 group-hover:text-neutral-950 font-semibold transition-colors duration-300 shrink-0 select-none pt-1 sm:pt-2">
                      {project.number}
                    </span>

                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1A1A18] group-hover:text-[#000000] transition-all duration-300 transform group-hover:translate-x-3 sm:group-hover:translate-x-4">
                        {project.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 group-hover:text-neutral-800 font-light max-w-xl leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: Category, Tech & Arrow Icon */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 md:text-right pl-8 md:pl-0 shrink-0">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 group-hover:text-neutral-950 transition-colors duration-300">
                        {project.category}
                      </p>
                      <p className="text-xs sm:text-sm font-mono-tech text-neutral-600 group-hover:text-neutral-900 transition-colors duration-300">
                        {project.technologies}
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-black/15 group-hover:border-black/40 group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center text-neutral-500 transition-all duration-300 shrink-0">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Mobile / Small Screen Static Thumbnail Preview */}
                <div className="mt-4 md:hidden block rounded-xl overflow-hidden border border-black/10 aspect-[16/10] bg-neutral-100">
                  <picture>
                    <source srcSet={project.image} type="image/webp" />
                    <img
                      src={project.fallbackImage}
                      alt={project.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </picture>
                </div>
              </a>
            );
          })}
        </div>

        {/* More Projects Button */}
        <div className="flex justify-center mt-16 sm:mt-24">
          <a
            href="https://github.com/Dhanush-coder-ux"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-black/15 hover:border-black/40 text-sm font-medium text-[#111111] hover:bg-[#111111] hover:text-white shadow-sm transition-all duration-300 group"
          >
            <span>More work</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Smooth Organic Curved Boundary into Dark Sections */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-16 sm:h-24 lg:h-28"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C320,80 720,120 1120,60 C1280,36 1380,18 1440,0 L1440,120 L0,120 Z"
            fill="#080909"
          />
        </svg>
      </div>
    </section>
  );
}
