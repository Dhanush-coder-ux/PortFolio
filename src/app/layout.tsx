import type { Metadata, Viewport } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Dhanush Kumar | Full-Stack & AI Systems Engineer",
  description:
    "Portfolio of Dhanush Kumar — Computer Science Engineer building full-stack applications, Agentic RAG pipelines, FastAPI backends, and responsive React interfaces.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080909",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
