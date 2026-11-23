"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#work" },
  { label: "Technical", href: "#technical" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const RESUME_URL = "/images/Dhanush_Kumar_Resume_ATS.pdf";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scrollspy
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const sectionTop = sectionEl.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#080909]/90 border-[#292D2B] shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "bg-[#101312]/75 border-[#292D2B]/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-lg"
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo Mark */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group pr-2"
            aria-label="Dhanush Kumar - Home"
          >
            <div className="w-8 h-8 rounded-full bg-[#101312] border border-[#292D2B] group-hover:border-[#E8B95C]/60 flex items-center justify-center transition-all duration-300">
              <span className="font-display text-xs font-bold tracking-tight text-[#F5F2E9] group-hover:text-[#E8B95C] transition-colors">
                DK
              </span>
            </div>
            <span className="hidden lg:inline text-xs font-medium tracking-wide text-[#A5A7A2] group-hover:text-[#F5F2E9] transition-colors">
              Dhanush Kumar
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#F5F2E9] bg-white/[0.08]"
                      : "text-[#A5A7A2] hover:text-[#F5F2E9] hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#E8B95C] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action: Highlighted Resume Button */}
          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E8B95C] text-[#080909] hover:bg-[#E8B95C]/90 shadow-sm transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-full bg-white/[0.05] border border-[#292D2B] text-[#A5A7A2] hover:text-[#F5F2E9]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#080909]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between border transition-all ${
                    isActive
                      ? "text-[#F5F2E9] bg-white/[0.08] border-[#292D2B]"
                      : "text-[#A5A7A2] hover:text-[#F5F2E9] border-transparent"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E8B95C]" />}
                </a>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-[#292D2B]">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#E8B95C] text-[#080909]"
            >
              <FileText className="w-4 h-4 stroke-[2.5]" />
              <span>Download ATS Resume</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
