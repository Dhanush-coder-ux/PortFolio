"use client";

import dynamic from "next/dynamic";

const PortfolioExperience = dynamic(() => import("@/components/PortfolioExperience"), {
  ssr: false,
  loading: () => <main className="canvas-fallback" aria-label="Loading Project Blackhole" />,
});

export default function ClientPage() {
  return <PortfolioExperience />;
}
