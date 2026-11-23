"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight, Copy, Check, FileText, Phone, Send } from "lucide-react";
import { GithubIcon } from "../projects/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EMAIL = "dhanushsubbia703@gmail.com";
const PHONE = "+91 8825773207";
const RESUME_URL = "/images/Dhanush_Kumar_Resume_ATS.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/dhanush-kumar15/";
const GITHUB_URL = "https://github.com/Dhanush-coder-ux";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
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
      id="contact"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:pl-36 md:pr-10 lg:pl-48 lg:pr-12 max-w-[1400px] mx-auto border-t border-[#292D2B]/60"
    >
      {/* Ambient Radial Backlight */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none -z-10 blur-[140px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(232, 185, 92, 0.25) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Tag */}
        <div className="contact-reveal space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101312] border border-[#292D2B] text-xs font-mono-tech text-[#E8B95C]">
            <Send className="w-3.5 h-3.5" />
            <span>06 / Let&apos;s Connect</span>
          </div>

          <h2 className="text-section-heading font-display text-[#F5F2E9] tracking-tight">
            Have an interesting problem to solve?
          </h2>

          <p className="text-base sm:text-xl text-[#A5A7A2] leading-relaxed font-light max-w-2xl">
            I&apos;m open to software engineering opportunities, backend development, AI
            engineering projects, and collaborations.
          </p>
        </div>

        {/* Primary Contact Card: One-Click Email Actions */}
        <div className="contact-reveal rounded-3xl bg-[#101312] border border-[#292D2B] p-7 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#292D2B]">
            <div>
              <span className="text-[11px] font-mono-tech text-[#A5A7A2] uppercase tracking-wider block mb-1">
                Direct Email Inquiries
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg sm:text-2xl font-bold font-mono-tech text-[#F5F2E9] hover:text-[#E8B95C] transition-colors break-all"
              >
                {EMAIL}
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080909] border border-[#292D2B] hover:border-[#E8B95C]/50 text-xs font-mono-tech text-[#F5F2E9] transition-all"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#45CDB3]" />
                    <span className="text-[#45CDB3]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#A5A7A2]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8B95C] text-[#080909] text-xs font-bold font-mono-tech hover:bg-[#E8B95C]/90 shadow-md transition-all"
              >
                <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Compose Mail</span>
              </a>
            </div>
          </div>

          {/* Direct Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#080909] border border-[#292D2B] hover:border-[#3D4441] flex items-center justify-between group transition-all"
            >
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#A5A7A2] block mb-0.5">
                  Professional Profile
                </span>
                <span className="text-sm font-bold text-[#F5F2E9] group-hover:text-[#E8B95C] transition-colors">
                  LinkedIn
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A5A7A2] group-hover:text-[#E8B95C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#080909] border border-[#292D2B] hover:border-[#3D4441] flex items-center justify-between group transition-all"
            >
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#A5A7A2] block mb-0.5">
                  Open Source Code
                </span>
                <span className="text-sm font-bold text-[#F5F2E9] group-hover:text-[#E8B95C] transition-colors">
                  GitHub
                </span>
              </div>
              <GithubIcon className="w-4 h-4 text-[#A5A7A2] group-hover:text-[#E8B95C] transition-colors" />
            </a>

            {/* Resume ATS */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#080909] border border-[#292D2B] hover:border-[#E8B95C]/40 flex items-center justify-between group transition-all"
            >
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#E8B95C] block mb-0.5">
                  Verified Credentials
                </span>
                <span className="text-sm font-bold text-[#F5F2E9] group-hover:text-[#E8B95C] transition-colors">
                  ATS Resume (PDF)
                </span>
              </div>
              <FileText className="w-4 h-4 text-[#E8B95C]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
