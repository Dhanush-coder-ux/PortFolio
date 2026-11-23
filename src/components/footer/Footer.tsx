"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#292D2B] bg-[#080909] py-12 px-4 sm:px-6 md:pl-36 md:pr-10 lg:pl-48 lg:pr-12">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono-tech text-[#A5A7A2]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#101312] border border-[#292D2B] flex items-center justify-center text-[10px] font-bold text-[#E8B95C]">
            DK
          </div>
          <span>&copy; {new Date().getFullYear()} Dhanush Kumar. Crafted with restraint.</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-[11px] text-[#A5A7A2]/70">
            React • Tailwind CSS v4 • GSAP • Next.js
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101312] border border-[#292D2B] hover:border-[#E8B95C]/40 text-[#F5F2E9] transition-all"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
