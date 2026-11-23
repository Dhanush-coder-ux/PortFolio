"use client";

import { useState, useEffect } from "react";
import PortfolioExperience from "@/components/PortfolioExperience";

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#080909] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#E8B95C]/20 border-t-[#E8B95C] animate-spin" />
      </div>
    );
  }

  return <PortfolioExperience />;
}

