import type { Metadata, Viewport } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Dhanush Kumar | AI Engineer Portfolio",
  description:
    "Project Blackhole: a premium AI engineer portfolio for Dhanush Kumar, focused on Agentic RAG, FastAPI, React, and production systems.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030305",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
