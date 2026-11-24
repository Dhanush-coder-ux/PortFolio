"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Briefcase, Award, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  id: string;
  type: "internship" | "award" | "education";
  date: string;
  role: string;
  organization: string;
  location?: string;
  responsibilities: string[];
  technologies?: string[];
  achievementBadge?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: "tibos",
    type: "internship",
    date: "Feb 2026 — May 2026",
    role: "Web Development Intern",
    organization: "TIBOS Solutions",
    location: "Remote / Hybrid",
    responsibilities: [
      "Contributed to an enterprise CRM platform managing distributors, subscriptions, and billing workflows.",
      "Integrated asynchronous FastAPI backend endpoints with Next.js/React frontend interfaces.",
      "Tested, debugged, and shipped code continuously through Azure DevOps CI/CD pipelines.",
      "Maintained JWT/RBAC authorization policies across admin and agent user roles.",
    ],
    technologies: ["React", "Next.js", "FastAPI", "PostgreSQL", "Redis", "Azure DevOps"],
  },
  {
    id: "cyberthan",
    type: "award",
    date: "2025",
    role: "1st Place Winner — Cybersecurity Category",
    organization: "Cyberthan Hackathon",
    location: "Tamil Nadu, IN",
    responsibilities: [
      "Engineered an end-to-end passwordless authentication prototype using WebAuthn and FIDO2 standards.",
      "Eliminated shared credential theft vectors using public-key cryptography and browser biometric APIs.",
      "Awarded 1st place across competing engineering college teams for security architecture depth.",
    ],
    technologies: ["WebAuthn", "FIDO2", "Python", "React", "Public-Key Cryptography"],
    achievementBadge: "1st Place Gold",
  },
  {
    id: "codtech",
    type: "internship",
    date: "Sep 2024 — Nov 2024",
    role: "Backend Development Intern",
    organization: "CodTech IT Solutions",
    location: "Remote",
    responsibilities: [
      "Engineered real-time chat APIs using Python, Flask, and Socket.IO for bidirectional communication.",
      "Implemented asynchronous event handlers for user presence, typing indicators, and message broadcasts.",
      "Designed normalized relational database schemas for message storage and conversation threading.",
    ],
    technologies: ["Python", "Flask", "Socket.IO", "REST APIs", "WebSocket Protocols"],
  },
  {
    id: "skillupu",
    type: "internship",
    date: "Sep 2024 — Oct 2024",
    role: "Web Development Intern",
    organization: "SkillUpU",
    location: "Remote",
    responsibilities: [
      "Improved responsive layouts, typography hierarchy, and frontend rendering across user-facing pages.",
      "Optimized asset delivery pipeline, reducing page weight through modern image formatting.",
      "Collaborated in a team environment using Git version control and pull request code reviews.",
    ],
    technologies: ["React", "JavaScript", "Responsive Design", "Performance Optimization"],
  },
  {
    id: "education",
    type: "education",
    date: "2022 — Expected Jun 2026",
    role: "B.E. Computer Science and Engineering",
    organization: "Latha Mathavan Engineering College",
    location: "Madurai, India",
    responsibilities: [
      "Core coursework: Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, and Artificial Intelligence.",
      "Active participant in technical symposiums, coding competitions, and cybersecurity hackathons.",
      "Delivered a technical presentation on blockchain and cryptographic distributed systems to 100+ students.",
    ],
    technologies: ["DSA", "DBMS", "Computer Networks", "Operating Systems", "Python", "SQL"],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const items = gsap.utils.toArray<HTMLElement>(".timeline-card");
      gsap.fromTo(
        items,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:pl-48 md:pr-10 lg:pl-64 lg:pr-12 max-w-[1440px] mx-auto border-t border-[#292D2B]/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101312] border border-[#292D2B] text-xs font-mono-tech text-[#E8B95C]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>04 / Experience &amp; Education</span>
          </div>

          <h2 className="text-section-heading font-display text-[#F5F2E9] tracking-tight">
            Verified experience, real responsibilities.
          </h2>

          <p className="text-base sm:text-lg text-[#A5A7A2] leading-relaxed font-light">
            An audited timeline of software engineering internships, hackathon achievements,
            and academic foundations in Computer Science.
          </p>
        </div>

        <div className="text-xs font-mono-tech text-[#A5A7A2] pb-2">
          <span>100% Authentic History • Zero Fictional Credentials</span>
        </div>
      </div>

      {/* Vertical Refined Timeline */}
      <div className="relative border-l border-[#292D2B] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12 sm:space-y-14">
        {timelineData.map((item) => {
          return (
            <div key={item.id} className="timeline-card relative group">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                  item.type === "award"
                    ? "bg-[#E8B95C] border-[#E8B95C]"
                    : item.type === "education"
                    ? "bg-[#45CDB3] border-[#45CDB3]"
                    : "bg-[#101312] border-[#A5A7A2] group-hover:border-[#E8B95C]"
                }`}
              />

              {/* Main Timeline Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#101312] border border-[#292D2B] group-hover:border-[#3D4441] transition-all duration-300">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#E8B95C]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>

                  {item.achievementBadge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B95C]/10 border border-[#E8B95C]/30 text-xs font-bold text-[#E8B95C]">
                      <Award className="w-3 h-3" />
                      <span>{item.achievementBadge}</span>
                    </span>
                  )}
                </div>

                {/* Role and Organization */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F2E9]">
                    {item.role}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-[#A5A7A2] mt-0.5">
                    {item.organization}
                    {item.location && <span className="text-xs opacity-70"> • {item.location}</span>}
                  </p>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2 mb-5 text-xs sm:text-sm text-[#A5A7A2] font-light leading-relaxed">
                  {item.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B95C]/70 mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                {item.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#292D2B]/70">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-[#080909] border border-[#292D2B] text-[#F5F2E9]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
