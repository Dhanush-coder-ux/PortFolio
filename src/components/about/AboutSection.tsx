"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { User, MapPin, GraduationCap, Compass, BookOpen, Terminal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".about-block",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:pl-48 md:pr-10 lg:pl-64 lg:pr-12 max-w-[1440px] mx-auto border-t border-[#292D2B]/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101312] border border-[#292D2B] text-xs font-mono-tech text-[#E8B95C]">
            <User className="w-3.5 h-3.5" />
            <span>05 / About Dhanush</span>
          </div>

          <h2 className="text-section-heading font-display text-[#F5F2E9] tracking-tight">
            An engineer who cares about how things actually work.
          </h2>
        </div>

        <div className="text-xs font-mono-tech text-[#A5A7A2] pb-2">
          <span>Pragmatic Systems • Measured Craft</span>
        </div>
      </div>

      {/* 2-Column Editorial About Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Natural, Conversational Engineer Narrative */}
        <div className="lg:col-span-7 space-y-6 text-[#A5A7A2] font-light leading-relaxed text-base sm:text-lg">
          <p className="about-block text-[#F5F2E9] font-normal text-lg sm:text-xl leading-relaxed">
            I’m a final-year Computer Science and Engineering student graduating in 2026. Rather
            than treating code as an abstract exercise, I’m drawn to software that sits at the
            crossroads of backend architecture, AI retrieval, and sharp user interfaces.
          </p>

          <p className="about-block">
            My experience has been shaped through practical delivery: building customer management
            modules and debugging Azure deployment pipelines as an intern at TIBOS Solutions,
            authoring bidirectional chat event systems with Socket.IO at CodTech, and taking 1st
            place at the Cyberthan Hackathon with a WebAuthn/FIDO2 passwordless auth implementation.
          </p>

          <p className="about-block">
            When building AI applications, I care deeply about latency budgets, chunking
            strategies, and eliminating runaway cloud API costs. That led me to architect my own
            RAG platform with local LLaMA 3 inference via Ollama, pgvector indices, and LangGraph
            routing — turning research concepts into reliable software running on standard
            hardware.
          </p>

          <p className="about-block">
            I also hold a solid foundation in computer networks — understanding TCP/IP packets,
            VLAN segmentation, and Linux servers gives me a much deeper appreciation for why
            distributed web applications behave the way they do under stress.
          </p>

          {/* Current Focus Note */}
          <div className="about-block p-5 rounded-xl bg-[#101312] border border-[#292D2B] mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#45CDB3]">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="uppercase">What I&apos;m Currently Exploring</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F5F2E9]">
              Multi-agent supervisory workflows in LangGraph, hybrid sparse-dense retrieval with
              BM25 + pgvector reranking, and high-performance async Python patterns.
            </p>
          </div>
        </div>

        {/* Right Column: Engineering Snapshot Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="about-block rounded-2xl bg-[#101312] border border-[#292D2B] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#292D2B]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E8B95C]/10 border border-[#E8B95C]/30 flex items-center justify-center text-[#E8B95C] text-xs font-bold font-display">
                  DK
                </div>
                <span className="text-sm font-bold text-[#F5F2E9]">Dhanush Kumar</span>
              </div>
              <span className="text-[11px] font-mono-tech text-[#45CDB3] bg-[#45CDB3]/10 border border-[#45CDB3]/30 px-2.5 py-0.5 rounded-full">
                Active Candidate
              </span>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4 text-xs font-mono-tech">
              <div>
                <span className="text-[#A5A7A2] block text-[10px] uppercase tracking-wider mb-1">
                  Location
                </span>
                <div className="flex items-center gap-1.5 text-[#F5F2E9]">
                  <MapPin className="w-3.5 h-3.5 text-[#E8B95C]" />
                  <span>Madurai, Tamil Nadu, India</span>
                </div>
              </div>

              <div>
                <span className="text-[#A5A7A2] block text-[10px] uppercase tracking-wider mb-1">
                  Education
                </span>
                <div className="flex items-center gap-1.5 text-[#F5F2E9]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#45CDB3]" />
                  <span>B.E. Computer Science (2022–2026)</span>
                </div>
              </div>

              <div>
                <span className="text-[#A5A7A2] block text-[10px] uppercase tracking-wider mb-1">
                  Target Roles
                </span>
                <div className="space-y-1 text-[#F5F2E9]">
                  <p>• AI / RAG Systems Engineer</p>
                  <p>• Backend Engineer (FastAPI / Python)</p>
                  <p>• Full-Stack Product Engineer</p>
                </div>
              </div>

              <div>
                <span className="text-[#A5A7A2] block text-[10px] uppercase tracking-wider mb-1">
                  Core Working Stack
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Python", "FastAPI", "React", "PostgreSQL", "Ollama", "Docker", "Next.js"].map(
                    (s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-[#080909] border border-[#292D2B] text-[#F5F2E9] text-[10px]"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
