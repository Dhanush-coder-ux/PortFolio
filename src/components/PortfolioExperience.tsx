"use client";

import RotaryDialNavbar from "./navigation/RotaryDialNavbar";
import HeroSection from "./hero/HeroSection";
import EditorialProjectsSection from "./projects/EditorialProjectsSection";
import TechnicalSection from "./technical/TechnicalSection";
import RagArchitectureSection from "./architecture/RagArchitectureSection";
import ExperienceSection from "./experience/ExperienceSection";
import AboutSection from "./about/AboutSection";
import ContactSection from "./contact/ContactSection";
import Footer from "./footer/Footer";

export default function PortfolioExperience() {
  return (
    <main className="min-h-screen bg-[#080909] text-[#F5F2E9] selection:bg-[#E8B95C]/20 selection:text-[#E8B95C]">
      {/* Premium Vintage Rotary Dial Navigation */}
      <RotaryDialNavbar />

      {/* Typography-Driven Cinematic Hero */}
      <HeroSection />

      {/* Selected Work (Editorial Horizontal List with Floating Mouse Preview) */}
      <EditorialProjectsSection />

      {/* Engineering Approach / Technical Expertise */}
      <TechnicalSection />

      {/* Real RAG Pipeline Architecture Visualization */}
      <RagArchitectureSection />

      {/* Verified Experience & Education Timeline */}
      <ExperienceSection />

      {/* Authentic About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
