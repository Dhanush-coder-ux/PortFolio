"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Brain,
  Server,
  Database,
  Layout,
  Cpu,
  Network,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Workflow,
  Layers,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechnicalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !trackRef.current || !sectionRef.current) return;

      // Only apply horizontal scroll pinning on md/lg screens (>= 768px)
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return;

      const track = trackRef.current;
      const getScrollDist = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Main Horizontal Card Track Tween
      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.85,
          start: "top top",
          end: () => `+=${getScrollDist()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.round(self.progress * 100)}%`;
            }
          },
        },
      });

      // Subtle parallax on decorative background watermark numbers
      const watermarks = gsap.utils.toArray<HTMLElement>(".editorial-watermark");
      watermarks.forEach((wm) => {
        gsap.to(wm, {
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: true,
            start: "top top",
            end: () => `+=${getScrollDist()}`,
          },
        });
      });

      return () => {
        horizontalTween.scrollTrigger?.kill();
        horizontalTween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="technical"
      ref={sectionRef}
      className="relative bg-[#080909] text-[#F5F2E9] overflow-hidden md:min-h-screen flex flex-col justify-between"
    >
      {/* Subtle Studio Ambient Lighting */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[500px] pointer-events-none -z-10 blur-[160px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(233, 185, 87, 0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] pointer-events-none -z-10 blur-[150px] opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(49, 73, 212, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* 
        ========================================================================
        EDITORIAL SECTION HEADER (PINNED AT TOP DURING HORIZONTAL SCROLL)
        ========================================================================
      */}
      <div className="pt-16 sm:pt-20 lg:pt-22 pb-4 sm:pb-6 px-6 sm:px-10 md:pl-48 md:pr-12 lg:pl-64 lg:pr-16 max-w-[1440px] w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121413] border border-[#262A28] text-xs font-mono-tech text-[#E8B95C]">
            <Terminal className="w-3.5 h-3.5" />
            <span>03 // TECHNICAL EXPERTISE &bull; EDITORIAL CATALOG</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poster uppercase tracking-tight text-[#F5F2E9] leading-none">
            ENGINEERING DISCIPLINES
          </h2>

          <p className="text-xs sm:text-sm text-[#9A9C96] leading-relaxed font-light max-w-xl">
            Six focused technical verticals applied across distributed architectures, local inference RAG pipelines, and high-performance client systems.
          </p>
        </div>

        {/* Horizontal Scroll Indicator & Progress Bar */}
        <div className="hidden md:flex flex-col items-end gap-2 text-xs font-mono-tech text-[#8A8C86] shrink-0">
          <div className="flex items-center gap-2 tracking-wider uppercase text-[11px]">
            <span>Scroll To Inspect Specs</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8B95C] animate-pulse" />
          </div>

          <div className="w-40 h-1.5 rounded-full bg-[#1A1D1B] overflow-hidden border border-[#282C2A]">
            <div
              ref={progressBarRef}
              className="h-full bg-[#E8B95C] transition-all duration-75"
              style={{ width: "16%" }}
            />
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        HORIZONTAL EDITORIAL CARDS TRACK
        Desktop & Tablet: Pinned GSAP ScrollTrigger track
        Mobile: Native high-performance horizontal swipe container
        ========================================================================
      */}
      <div
        ref={trackRef}
        className="flex gap-6 sm:gap-8 lg:gap-10 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 md:pl-48 md:pr-16 lg:pl-64 lg:pr-24 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-none items-stretch my-auto"
      >
        {/* 
          ----------------------------------------------------------------------
          CARD 01: AI ENGINEERING & RAG
          Style: Exhibition research poster / Swiss information architecture
          Surface: Warm ash-white (#DAD9D2)
          ----------------------------------------------------------------------
        */}
        <article className="tech-card w-[86vw] sm:w-[480px] md:w-[500px] lg:w-[580px] h-[520px] sm:h-[540px] md:h-[min(540px,calc(100vh-210px))] min-h-[460px] flex-shrink-0 snap-center rounded-md bg-[#DAD9D2] text-[#171715] border border-[#171715]/20 p-6 sm:p-7 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85),0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden select-none group">
          {/* Subtle Paper Grain Overlay */}
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />

          {/* Dark Shadow Vignette at Bottom Edge */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

          {/* Massive Distressed Background Watermark "01" */}
          <div className="editorial-watermark absolute -right-6 -bottom-10 font-poster text-[170px] sm:text-[200px] text-[#171715]/[0.06] leading-none pointer-events-none select-none">
            01
          </div>

          {/* Top Metadata Header */}
          <div className="relative z-10 flex items-start justify-between border-b border-[#171715]/20 pb-3 sm:pb-3.5">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#555550] block">
                DISCIPLINE // SPEC NO. 01
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#171715] tracking-tight">
                AI SYSTEMS &bull; RETRIEVAL INFRASTRUCTURE
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-sm bg-[#171715] text-[#DAD9D2] font-mono-tech text-[10px] font-bold tracking-wider uppercase">
              ACTIVE SPEC
            </span>
          </div>

          {/* Main Typography Statement */}
          <div className="relative z-10 my-auto space-y-3 pt-1">
            <h3 className="font-poster text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-[#171715] leading-[0.94]">
              AI ENGINEERING <br />
              <span className="text-[#555550]">&amp; AGENTIC RAG</span>
            </h3>

            <p className="font-display text-xs sm:text-[13px] text-[#40403B] leading-relaxed max-w-lg font-medium">
              Architecting production-ready Retrieval-Augmented Generation pipelines: document ingestion, overlap chunking, dense semantic embeddings, hybrid vector search, and local inference runners that eliminate recurring API token expenditures.
            </p>

            {/* Architecture Dataflow Stencil Graphic */}
            <div className="p-2.5 sm:p-3 bg-[#C7C6BE]/60 border border-[#171715]/15 rounded-sm space-y-1 font-mono-tech text-[10px] text-[#22221F]">
              <div className="text-[9px] uppercase tracking-wider text-[#666660] font-bold">
                DATAFLOW PIPELINE PROTOCOL
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-semibold text-[#171715]">
                <span>INGESTION</span>
                <span className="text-[#888880]">&rarr;</span>
                <span>OVERLAP CHUNK</span>
                <span className="text-[#888880]">&rarr;</span>
                <span>COSINE RANK</span>
                <span className="text-[#888880]">&rarr;</span>
                <span className="text-[#8B5E14]">LLM SYNTHESIS</span>
              </div>
            </div>
          </div>

          {/* Bottom Technical Tag Cloud */}
          <div className="relative z-10 pt-3 border-t border-[#171715]/20 space-y-1.5">
            <div className="font-mono-tech text-[9px] tracking-wider text-[#555550] uppercase">
              TECHNOLOGY MATRIX
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {[
                "LangGraph",
                "Agentic RAG",
                "Vector Search",
                "Embeddings",
                "Gemini API",
                "Ollama / LLaMA 3",
                "ChromaDB",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-[#C7C6BE]/80 border border-[#171715]/25 font-mono-tech text-[11px] font-bold text-[#171715] tracking-tight hover:bg-[#171715] hover:text-[#DAD9D2] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* 
          ----------------------------------------------------------------------
          CARD 02: BACKEND & SYSTEMS
          Style: Brutalist technical ledger / UNIX systems schematic
          Surface: Dusty warm grey (#C7C6BE)
          ----------------------------------------------------------------------
        */}
        <article className="tech-card w-[86vw] sm:w-[480px] md:w-[500px] lg:w-[580px] h-[520px] sm:h-[540px] md:h-[min(540px,calc(100vh-210px))] min-h-[460px] flex-shrink-0 snap-center rounded-md bg-[#C7C6BE] text-[#171715] border border-[#171715]/25 p-6 sm:p-7 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85),0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden select-none group">
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

          {/* Watermark "02" */}
          <div className="editorial-watermark absolute -right-6 -bottom-10 font-poster text-[170px] sm:text-[200px] text-[#171715]/[0.06] leading-none pointer-events-none select-none">
            02
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between border-b border-[#171715]/20 pb-3 sm:pb-3.5">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#555550] block">
                DISCIPLINE // SPEC NO. 02
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#171715] tracking-tight">
                BACKEND ARCHITECTURE &bull; DISTRIBUTED QUEUES
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[#484842]">
              <span className="w-2 h-2 rounded-full bg-[#171715]" />
              <span>CORE RUNTIME</span>
            </div>
          </div>

          {/* Title & UNIX Spec Block */}
          <div className="relative z-10 my-auto space-y-3 pt-1">
            <h3 className="font-poster text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-[#171715] leading-[0.94]">
              BACKEND &amp; <br />
              <span className="text-[#555550]">SYSTEMS DESIGN</span>
            </h3>

            <p className="font-display text-xs sm:text-[13px] text-[#383833] leading-relaxed max-w-lg font-medium">
              Developing resilient asynchronous microservices with strict schema validation, role-based JWT authorization, background queue workers for non-blocking I/O, and structured PostgreSQL models.
            </p>

            {/* Terminal Ledger / Architecture Trace */}
            <div className="p-2.5 sm:p-3 bg-[#DAD9D2] border border-[#171715]/20 rounded-sm font-mono-tech text-[10px] space-y-1 text-[#171715]">
              <div className="flex items-center justify-between text-[#666660] pb-1 border-b border-[#171715]/10 text-[9px]">
                <span>ENDPOINT RUNTIME: FASTAPI ASYNC</span>
                <span>STATUS: 202 ACCEPTED</span>
              </div>
              <div className="text-[#2B3B2B] font-bold">
                POST /api/v1/jobs/dispatch &bull; 18ms latency
              </div>
              <div className="text-[#555550]">
                QUEUE: Redis Streams &rarr; Celery Background Task (ACK)
              </div>
              <div className="text-[#555550]">
                AUTH: RS256 Asymmetric JWT + Scoped RBAC Validation
              </div>
            </div>
          </div>

          {/* Bottom Tags & Barcode Decorator */}
          <div className="relative z-10 pt-3 border-t border-[#171715]/20 space-y-1.5">
            <div className="flex items-center justify-between font-mono-tech text-[9px] text-[#555550] uppercase">
              <span>STACK INVENTORY</span>
              <span>BARCODE // 7729-SYS</span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {[
                "Python 3.12",
                "FastAPI",
                "Flask",
                "SQLAlchemy",
                "REST APIs",
                "Redis",
                "Celery",
                "JWT & RBAC",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-[#DAD9D2] border border-[#171715]/25 font-mono-tech text-[11px] font-bold text-[#171715] tracking-tight hover:bg-[#171715] hover:text-[#DAD9D2] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* 
          ----------------------------------------------------------------------
          CARD 03: DATABASE ENGINEERING
          Style: Inverted darkroom negative / vector blueprint (Rhythm variation!)
          Surface: Dark card variation (#252522)
          ----------------------------------------------------------------------
        */}
        <article className="tech-card w-[86vw] sm:w-[480px] md:w-[500px] lg:w-[580px] h-[520px] sm:h-[540px] md:h-[min(540px,calc(100vh-210px))] min-h-[460px] flex-shrink-0 snap-center rounded-md bg-[#252522] text-[#F2F0E6] border border-[#3D3D36] p-6 sm:p-7 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.95),0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden select-none group">
          <div className="absolute inset-0 paper-grain-dark pointer-events-none opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

          {/* Watermark "03" in Wireframe Gold Accent */}
          <div className="editorial-watermark absolute -right-6 -bottom-10 font-poster text-[170px] sm:text-[200px] text-[#E8B95C]/[0.05] leading-none pointer-events-none select-none">
            03
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between border-b border-[#3D3D36] pb-3 sm:pb-3.5">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#8A8980] block">
                DISCIPLINE // SPEC NO. 03
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#E8B95C] tracking-tight">
                DATABASE ENGINEERING &bull; VECTOR &amp; RELATIONAL
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-sm bg-[#353530] text-[#E8B95C] border border-[#E8B95C]/30 font-mono-tech text-[10px] font-bold tracking-wider uppercase">
              ACID STORE
            </span>
          </div>

          {/* Title & Archival Database Grid */}
          <div className="relative z-10 my-auto space-y-3 pt-1">
            <h3 className="font-poster text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-[#F2F0E6] leading-[0.94]">
              DATABASE <br />
              <span className="text-[#8A8980]">ENGINEERING</span>
            </h3>

            <p className="font-display text-xs sm:text-[13px] text-[#B5B3A8] leading-relaxed max-w-lg font-light">
              Relational schema modeling with normalized foreign keys, ACID compliance, Redis session caching, and pgvector cosine distance indices for high-dimensional vector search.
            </p>

            {/* Archival Store Blueprint Table */}
            <div className="p-2.5 sm:p-3 bg-[#1B1B18] border border-[#3A3A34] rounded-sm font-mono-tech text-[10px] space-y-1 text-[#DAD9D2]">
              <div className="flex items-center justify-between text-[#8A8980] text-[9px] border-b border-[#2C2C27] pb-1">
                <span>STORE ARCHITECTURE</span>
                <span>INDEXING ALGORITHM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E8B95C] font-semibold">PostgreSQL + pgvector</span>
                <span className="text-[#8A8980]">HNSW Cosine Vector Index</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Redis Key-Value</span>
                <span className="text-[#8A8980]">In-Memory Eviction / Cache</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ChromaDB Embedded</span>
                <span className="text-[#8A8980]">Dense Semantic Collection</span>
              </div>
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="relative z-10 pt-3 border-t border-[#3D3D36] space-y-1.5">
            <div className="font-mono-tech text-[9px] tracking-wider text-[#8A8980] uppercase">
              DATA ENGINE STACK
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {[
                "PostgreSQL",
                "pgvector",
                "MySQL",
                "Redis",
                "Supabase",
                "ChromaDB",
                "Query Optimization",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-[#1A1A17] border border-[#3D3D36] font-mono-tech text-[11px] font-bold text-[#F2F0E6] tracking-tight hover:border-[#E8B95C] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* 
          ----------------------------------------------------------------------
          CARD 04: FRONTEND ENGINEERING
          Style: Contemporary streetwear typographic poster / Swiss grid
          Surface: Warm ash-white (#DAD9D2)
          ----------------------------------------------------------------------
        */}
        <article className="tech-card w-[86vw] sm:w-[480px] md:w-[500px] lg:w-[580px] h-[520px] sm:h-[540px] md:h-[min(540px,calc(100vh-210px))] min-h-[460px] flex-shrink-0 snap-center rounded-md bg-[#DAD9D2] text-[#171715] border border-[#171715]/20 p-6 sm:p-7 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85),0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden select-none group">
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

          {/* Watermark "04" */}
          <div className="editorial-watermark absolute -right-6 -bottom-10 font-poster text-[170px] sm:text-[200px] text-[#171715]/[0.06] leading-none pointer-events-none select-none">
            04
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between border-b border-[#171715]/20 pb-3 sm:pb-3.5">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#555550] block">
                DISCIPLINE // SPEC NO. 04
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#171715] tracking-tight">
                FLUID MOTION &bull; COMPONENT ARCHITECTURE
              </span>
            </div>

            <div className="flex items-center gap-1 font-mono-tech text-[10px] text-[#171715] font-bold">
              <span>+</span>
              <span>60 FPS</span>
              <span>+</span>
            </div>
          </div>

          {/* Title & Streetwear Editorial Layout */}
          <div className="relative z-10 my-auto space-y-3 pt-1">
            <h3 className="font-poster text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-[#171715] leading-[0.94]">
              FRONTEND &amp; <br />
              <span className="text-[#555550]">INTERACTION</span>
            </h3>

            <p className="font-display text-xs sm:text-[13px] text-[#40403B] leading-relaxed max-w-lg font-medium">
              Developing high-speed, accessible user interfaces with strict TypeScript contracts, fluid mathematical clamp typography, responsive SVG graphics, and hardware-accelerated GSAP ScrollTrigger motion.
            </p>

            {/* Specimen Principles Block */}
            <div className="grid grid-cols-2 gap-2 font-mono-tech text-[10px]">
              <div className="p-2 sm:p-2.5 bg-[#C7C6BE]/70 border border-[#171715]/15 rounded-sm">
                <span className="text-[#666660] block text-[9px] uppercase">PRINCIPLE 01</span>
                <span className="font-bold text-[#171715]">HARDWARE ACCELERATION</span>
              </div>
              <div className="p-2 sm:p-2.5 bg-[#C7C6BE]/70 border border-[#171715]/15 rounded-sm">
                <span className="text-[#666660] block text-[9px] uppercase">PRINCIPLE 02</span>
                <span className="font-bold text-[#171715]">FLUID MATHEMATICAL CLAMP</span>
              </div>
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="relative z-10 pt-3 border-t border-[#171715]/20 space-y-1.5">
            <div className="font-mono-tech text-[9px] tracking-wider text-[#555550] uppercase">
              INTERACTION ENGINE
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {[
                "React",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS v4",
                "GSAP",
                "Framer Motion",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-[#C7C6BE]/80 border border-[#171715]/25 font-mono-tech text-[11px] font-bold text-[#171715] tracking-tight hover:bg-[#171715] hover:text-[#DAD9D2] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* 
          ----------------------------------------------------------------------
          CARD 05: DEVOPS & INFRASTRUCTURE
          Style: Industrial shipping manifest / containerized stencil
          Surface: Dusty grey (#C7C6BE)
          ----------------------------------------------------------------------
        */}
        <article className="tech-card w-[86vw] sm:w-[480px] md:w-[500px] lg:w-[580px] h-[520px] sm:h-[540px] md:h-[min(540px,calc(100vh-210px))] min-h-[460px] flex-shrink-0 snap-center rounded-md bg-[#C7C6BE] text-[#171715] border border-[#171715]/25 p-6 sm:p-7 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85),0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden select-none group">
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

          {/* Watermark "05" */}
          <div className="editorial-watermark absolute -right-6 -bottom-10 font-poster text-[170px] sm:text-[200px] text-[#171715]/[0.06] leading-none pointer-events-none select-none">
            05
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between border-b border-[#171715]/20 pb-3 sm:pb-3.5">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#555550] block">
                DISCIPLINE // SPEC NO. 05
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#171715] tracking-tight">
                CONTAINERIZATION &bull; AUTOMATION PIPELINES
              </span>
            </div>

            <span className="px-2 py-0.5 rounded-sm bg-[#171715]/10 border border-[#171715]/30 font-mono-tech text-[10px] font-bold text-[#171715]">
              STENCIL: DKR-26
            </span>
          </div>

          {/* Title & Industrial Manifest Table */}
          <div className="relative z-10 my-auto space-y-3 pt-1">
            <h3 className="font-poster text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-[#171715] leading-[0.94]">
              DEVOPS &amp; <br />
              <span className="text-[#555550]">INFRASTRUCTURE</span>
            </h3>

            <p className="font-display text-xs sm:text-[13px] text-[#383833] leading-relaxed max-w-lg font-medium">
              Creating containerized multi-stage Docker builds, automated GitHub Actions CI/CD workflows, reverse proxy configurations, and Linux server provisioning for reproducible software delivery.
            </p>

            {/* Manifest Specifications Table */}
            <div className="p-2.5 sm:p-3 bg-[#DAD9D2] border border-[#171715]/20 rounded-sm font-mono-tech text-[10px] space-y-1 text-[#171715]">
              <div className="flex items-center justify-between border-b border-[#171715]/10 pb-1 text-[9px] text-[#666660]">
                <span>MANIFEST RECORD</span>
                <span>SPECIFICATION TARGET</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">OS ENVIRONMENT</span>
                <span>Linux Ubuntu 24.04 LTS (POSIX)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">CONTAINER RUNTIME</span>
                <span>Docker &bull; Multi-Stage Alpine</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">PIPELINE AUTOMATION</span>
                <span>GitHub Actions (Test, Build, Deploy)</span>
              </div>
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="relative z-10 pt-3 border-t border-[#171715]/20 space-y-1.5">
            <div className="font-mono-tech text-[9px] tracking-wider text-[#555550] uppercase">
              DEPLOYMENT SUITE
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {[
                "Linux (Ubuntu)",
                "Docker",
                "Docker Compose",
                "GitHub Actions",
                "CI/CD",
                "Kubernetes",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-[#DAD9D2] border border-[#171715]/25 font-mono-tech text-[11px] font-bold text-[#171715] tracking-tight hover:bg-[#171715] hover:text-[#DAD9D2] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* 
          ----------------------------------------------------------------------
          CARD 06: NETWORKING & SECURITY
          Style: Telecommunication blueprint / security protocol manifest
          Surface: Warm ash-white with cobalt highlights (#DAD9D2)
          ----------------------------------------------------------------------
        */}
        <article className="tech-card w-[86vw] sm:w-[480px] md:w-[500px] lg:w-[580px] h-[520px] sm:h-[540px] md:h-[min(540px,calc(100vh-210px))] min-h-[460px] flex-shrink-0 snap-center rounded-md bg-[#DAD9D2] text-[#171715] border border-[#171715]/20 p-6 sm:p-7 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85),0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden select-none group">
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

          {/* Watermark "06" */}
          <div className="editorial-watermark absolute -right-6 -bottom-10 font-poster text-[170px] sm:text-[200px] text-[#171715]/[0.06] leading-none pointer-events-none select-none">
            06
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between border-b border-[#171715]/20 pb-3 sm:pb-3.5">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#555550] block">
                DISCIPLINE // SPEC NO. 06
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#171715] tracking-tight">
                NETWORKING PROTOCOLS &bull; NETWORK SECURITY
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[#2842C8] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CCNA GROUNDED</span>
            </div>
          </div>

          {/* Title & Telecommunications Spec Block */}
          <div className="relative z-10 my-auto space-y-3 pt-1">
            <h3 className="font-poster text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-[#171715] leading-[0.94]">
              NETWORKING &amp; <br />
              <span className="text-[#555550]">INFRA SECURITY</span>
            </h3>

            <p className="font-display text-xs sm:text-[13px] text-[#40403B] leading-relaxed max-w-lg font-medium">
              Rigorous understanding of layered network protocols (TCP/IP), IP subnetting, VLAN isolation, firewall Access Control Lists (ACLs), DHCP/DNS resolution, and modern cryptographic authentication.
            </p>

            {/* Packet Inspection Trace Graphic */}
            <div className="p-2.5 sm:p-3 bg-[#C7C6BE]/60 border border-[#171715]/15 rounded-sm font-mono-tech text-[10px] space-y-1 text-[#171715]">
              <div className="text-[9px] uppercase tracking-wider text-[#666660] font-bold flex justify-between">
                <span>PACKET INSPECTION &bull; OSI LAYER 2-4</span>
                <span className="text-[#2842C8]">POLICY: PERMIT</span>
              </div>
              <div className="font-semibold text-[10.5px]">
                192.168.20.0/24 &bull; 802.1Q VLAN 20 (ISOLATED)
              </div>
              <div className="text-[#555550] text-[9.5px]">
                TRAFFIC: TCP SYN ──▶ PORT 443 ──▶ FIREWALL ACL 101 [ACCEPTED]
              </div>
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="relative z-10 pt-3 border-t border-[#171715]/20 space-y-1.5">
            <div className="font-mono-tech text-[9px] tracking-wider text-[#555550] uppercase">
              NETWORK PROTOCOL SUITE
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {[
                "TCP/IP",
                "VLANs",
                "Routing",
                "Switching",
                "ACLs",
                "DHCP & DNS",
                "CCNA Fundamentals",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-[#C7C6BE]/80 border border-[#171715]/25 font-mono-tech text-[11px] font-bold text-[#171715] tracking-tight hover:bg-[#171715] hover:text-[#DAD9D2] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
