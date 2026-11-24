"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, FileText, ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon } from "../projects/Icons";

const RESUME_URL = "/images/Dhanush_Kumar_Resume_ATS.pdf";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineLine1 = useRef<HTMLDivElement>(null);
  const headlineLine2 = useRef<HTMLDivElement>(null);
  const headlineLine3 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Small metadata tag
      tl.fromTo(
        ".hero-meta-badge",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // 2. Headline line-by-line reveal via text masking
      tl.fromTo(
        [headlineLine1.current, headlineLine2.current, headlineLine3.current],
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.14 },
        "-=0.5"
      );

      // 3. Description reveal
      tl.fromTo(
        ".hero-description",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      );

      // 4. Tech focus pills
      tl.fromTo(
        ".hero-tech-pills",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      // 5. CTAs
      tl.fromTo(
        ".hero-cta-group",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 md:pl-48 md:pr-10 lg:pl-64 lg:pr-16 max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[400px] pointer-events-none -z-10 blur-[130px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(232, 185, 92, 0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[450px] h-[350px] pointer-events-none -z-10 blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(69, 205, 179, 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Main Hero Content - Unobstructed Spacious Editorial Layout */}
      <div className="flex flex-col space-y-7 sm:space-y-8 max-w-4xl">
        {/* Metadata & Availability Badge */}
        <div className="hero-meta-badge flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101312] border border-[#292D2B] text-xs font-medium text-[#A5A7A2]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#45CDB3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45CDB3]" />
            </span>
            <span className="text-[#F5F2E9]">Available for opportunities</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101312]/60 border border-[#292D2B]/80 text-xs font-mono-tech text-[#A5A7A2]">
            <Terminal className="w-3.5 h-3.5 text-[#E8B95C]" />
            <span>Full-Stack &amp; AI Engineering</span>
          </div>
        </div>

        {/* Oversized Headline with Text Masking */}
        <div className="space-y-1 sm:space-y-2 select-none">
          <div className="overflow-hidden">
            <div
              ref={headlineLine1}
              className="text-hero-headline font-display text-[#F5F2E9] tracking-tight"
            >
              Hi, I&apos;m Dhanush.
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={headlineLine2}
              className="text-hero-headline font-display text-[#F5F2E9] tracking-tight"
            >
              I build software that
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={headlineLine3}
              className="text-hero-headline font-display tracking-tight text-[#E8B95C] italic font-medium"
            >
              solves real problems.
            </div>
          </div>
        </div>

        {/* Supporting Description */}
        <p className="hero-description text-base sm:text-xl text-[#A5A7A2] leading-relaxed max-w-2xl font-light">
          Computer Science Engineer building full-stack applications, AI-powered systems,
          and scalable backend experiences.
        </p>

        {/* Compact Technology Identity Row */}
        <div className="hero-tech-pills flex flex-wrap items-center gap-2 pt-1 font-mono-tech text-xs sm:text-[13px] text-[#A5A7A2]">
          <span className="text-[#E8B95C] font-semibold tracking-wider uppercase text-[11px]">
            Stack:
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#101312] border border-[#292D2B] text-[#F5F2E9]">
            React
          </span>
          <span className="text-[#292D2B]">/</span>
          <span className="px-2.5 py-1 rounded-md bg-[#101312] border border-[#292D2B] text-[#F5F2E9]">
            FastAPI
          </span>
          <span className="text-[#292D2B]">/</span>
          <span className="px-2.5 py-1 rounded-md bg-[#101312] border border-[#292D2B] text-[#F5F2E9]">
            Python
          </span>
          <span className="text-[#292D2B]">/</span>
          <span className="px-2.5 py-1 rounded-md bg-[#101312] border border-[#292D2B] text-[#F5F2E9]">
            PostgreSQL
          </span>
          <span className="text-[#292D2B]">/</span>
          <span className="px-2.5 py-1 rounded-md bg-[#101312] border border-[#292D2B] text-[#45CDB3]">
            AI Engineering
          </span>
        </div>

        {/* Action CTAs & Profile Links */}
        <div className="hero-cta-group flex flex-wrap items-center gap-3 pt-3">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-[#E8B95C] text-[#080909] hover:bg-[#E8B95C]/90 shadow-lg transition-all duration-200"
          >
            <span>View Selected Work</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium bg-[#101312] hover:bg-[#101312]/90 border border-[#292D2B] hover:border-[#E8B95C]/40 text-[#F5F2E9] transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-[#E8B95C]" />
            <span>Download Resume</span>
          </a>

          <div className="flex items-center gap-2 pl-2">
            <a
              href="https://github.com/Dhanush-coder-ux"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3 rounded-full bg-[#101312] border border-[#292D2B] hover:border-[#F5F2E9]/40 text-[#A5A7A2] hover:text-[#F5F2E9] transition-all"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/dhanush-kumar15/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3 rounded-full bg-[#101312] border border-[#292D2B] hover:border-[#F5F2E9]/40 text-[#A5A7A2] hover:text-[#F5F2E9] transition-all"
              title="LinkedIn Profile"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
