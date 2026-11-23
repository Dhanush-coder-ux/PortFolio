"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  FileText,
  Split,
  Binary,
  Database,
  Search,
  Filter,
  Cpu,
  Send,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ArchitectureNode {
  id: string;
  step: string;
  title: string;
  icon: typeof FileText;
  tech: string;
  summary: string;
  input: string;
  output: string;
  deepDive: string;
}

const pipelineNodes: ArchitectureNode[] = [
  {
    id: "ingestion",
    step: "01",
    title: "Document Ingestion",
    icon: FileText,
    tech: "pypdf / FastAPI Async",
    summary: "Asynchronous file extraction preserving table structures & code blocks.",
    input: "Raw PDFs, Markdown notes, DOCX files",
    output: "Normalized UTF-8 text streams with metadata",
    deepDive:
      "Uploaded documents are streamed into memory without writing temporary files to disk. Header metadata, page numbers, and author tags are preserved for downstream citation tracking.",
  },
  {
    id: "chunking",
    step: "02",
    title: "Table-Aware Chunking",
    icon: Split,
    tech: "LangChain Recursive Splitter",
    summary: "Semantic splitting with 600-token chunks and 120-token overlap.",
    input: "Normalized document stream",
    output: "Overlapping semantic chunks with boundary metadata",
    deepDive:
      "Prevents loss of conversational context across boundaries. Custom separators ensure markdown tables, bullet lists, and programming code snippets are not fractured mid-structure.",
  },
  {
    id: "embeddings",
    step: "03",
    title: "Vector Embeddings",
    icon: Binary,
    tech: "Gemini Text Embeddings",
    summary: "High-dimensional vector embedding transformation.",
    input: "Text chunks (strings)",
    output: "768-dimensional float32 dense vectors",
    deepDive:
      "Batches text chunks to the embedding model with exponential backoff. Vectors capture nuanced semantic intent rather than simple literal keyword matches.",
  },
  {
    id: "vector-store",
    step: "04",
    title: "Vector Storage & Index",
    icon: Database,
    tech: "ChromaDB + pgvector (HNSW)",
    summary: "High-dimensional vector indexing with cosine distance metric.",
    input: "768-dim vectors + document metadata",
    output: "HNSW indexed persistence layer in PostgreSQL",
    deepDive:
      "Uses Hierarchical Navigable Small World (HNSW) graphs in pgvector for sub-50ms nearest-neighbor lookups, backed by ChromaDB for local experimentation.",
  },
  {
    id: "retrieval",
    step: "05",
    title: "Semantic Retrieval",
    icon: Search,
    tech: "Cosine Similarity Query",
    summary: "Query embedding against indexed document vectors.",
    input: "User question embedded vector",
    output: "Top-K candidate context chunks (K=5)",
    deepDive:
      "Transforms the user question into an embedding and retrieves the top 5 nearest chunks based on cosine distance, filtering out irrelevant document partitions.",
  },
  {
    id: "reranking",
    step: "06",
    title: "Context Re-ranking",
    icon: Filter,
    tech: "Cross-Encoder Scorer",
    summary: "Confidence filtering to eliminate hallucinations.",
    input: "5 candidate context chunks",
    output: "Top 3 highest relevance snippets with citations",
    deepDive:
      "Re-scores retrieved candidates against the raw user query to prune low-confidence noise before building the prompt context window, directly preventing LLM hallucination.",
  },
  {
    id: "generation",
    step: "07",
    title: "Local LLM Inference",
    icon: Cpu,
    tech: "LLaMA 3 (8B) via Ollama",
    summary: "On-premise inference with zero external token cost.",
    input: "Augmented system prompt + retrieved context",
    output: "Streaming response token stream",
    deepDive:
      "Executes inference through a local Ollama daemon hosting quantized LLaMA 3. Keeps confidential student and enterprise documents strictly within private infrastructure.",
  },
  {
    id: "response",
    step: "08",
    title: "Streaming SSE Response",
    icon: Send,
    tech: "Server-Sent Events / React",
    summary: "Real-time token rendering with precise page citations.",
    input: "FastAPI AsyncGenerator tokens",
    output: "Interactive chat UI response with document citations",
    deepDive:
      "Streams response tokens over HTTP SSE directly into the client React state machine, keeping time-to-first-token under 800ms and rendering footnote citations.",
  },
];

export default function RagArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeNode = pipelineNodes[activeStepIndex];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".architecture-flow-node",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
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
      id="architecture"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:pl-36 md:pr-10 lg:pl-48 lg:pr-12 max-w-[1400px] mx-auto border-t border-[#292D2B]/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101312] border border-[#292D2B] text-xs font-mono-tech text-[#45CDB3]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 / System Architecture</span>
          </div>

          <h2 className="text-section-heading font-display text-[#F5F2E9] tracking-tight">
            How I architect an enterprise RAG pipeline.
          </h2>

          <p className="text-base sm:text-lg text-[#A5A7A2] leading-relaxed font-light">
            Interactive visualization of the actual production pipeline from my Vaathi LMS / AI
            RAG platform — from document ingestion through local LLaMA 3 inference.
          </p>
        </div>

        <div className="text-xs font-mono-tech text-[#A5A7A2] pb-2">
          <span>Click any node to inspect engineering details</span>
        </div>
      </div>

      {/* 8-Stage Interactive Pipeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-10">
        {pipelineNodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = index === activeStepIndex;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveStepIndex(index)}
              className={`architecture-flow-node text-left flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-200 relative group ${
                isActive
                  ? "bg-[#101312] border-[#E8B95C] shadow-[0_4px_24px_rgba(232,185,92,0.2)]"
                  : "bg-[#080909] border-[#292D2B] hover:border-[#3D4441] hover:bg-[#101312]/60"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={`text-[10px] font-mono-tech font-bold ${
                    isActive ? "text-[#E8B95C]" : "text-[#A5A7A2]"
                  }`}
                >
                  {node.step}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#E8B95C]" : "text-[#A5A7A2] group-hover:text-[#F5F2E9]"
                  }`}
                />
              </div>

              <div>
                <p
                  className={`text-xs font-bold leading-tight ${
                    isActive ? "text-[#F5F2E9]" : "text-[#A5A7A2] group-hover:text-[#F5F2E9]"
                  }`}
                >
                  {node.title}
                </p>
                <span className="text-[10px] font-mono-tech text-[#A5A7A2]/80 mt-1 block truncate">
                  {node.tech.split("/")[0]}
                </span>
              </div>

              {isActive && (
                <div className="absolute -bottom-[2px] inset-x-3 h-[2px] bg-[#E8B95C] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Inspection Panel */}
      <div className="rounded-2xl bg-[#101312] border border-[#292D2B] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute top-0 right-0 w-80 h-80 pointer-events-none -z-10 blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #E8B95C 0%, transparent 70%)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#080909] border border-[#292D2B] text-xs font-mono-tech text-[#E8B95C]">
                Stage {activeNode.step} of 08
              </span>
              <span className="text-xs font-mono-tech text-[#45CDB3]">{activeNode.tech}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F2E9]">
              {activeNode.title}
            </h3>

            <p className="text-sm text-[#A5A7A2] leading-relaxed font-light">
              {activeNode.summary}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    prev > 0 ? prev - 1 : pipelineNodes.length - 1
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-[#080909] border border-[#292D2B] hover:border-[#3D4441] text-xs font-mono-tech text-[#A5A7A2] hover:text-[#F5F2E9] transition-colors"
              >
                ← Previous Stage
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    prev < pipelineNodes.length - 1 ? prev + 1 : 0
                  )
                }
                className="px-3.5 py-1.5 rounded-lg bg-[#E8B95C] text-[#080909] text-xs font-bold font-mono-tech hover:bg-[#E8B95C]/90 transition-colors"
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* Right Technical Specification */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Input Contract */}
            <div className="p-4 rounded-xl bg-[#080909] border border-[#292D2B]">
              <div className="text-[10px] font-mono-tech uppercase text-[#A5A7A2] mb-1">
                Data Ingest Contract
              </div>
              <p className="text-xs sm:text-sm font-mono-tech text-[#F5F2E9]">
                {activeNode.input}
              </p>
            </div>

            {/* Output Contract */}
            <div className="p-4 rounded-xl bg-[#080909] border border-[#292D2B]">
              <div className="text-[10px] font-mono-tech uppercase text-[#A5A7A2] mb-1">
                Output Payload Contract
              </div>
              <p className="text-xs sm:text-sm font-mono-tech text-[#45CDB3]">
                {activeNode.output}
              </p>
            </div>

            {/* Implementation Notes */}
            <div className="sm:col-span-2 p-5 rounded-xl bg-[#080909] border border-[#292D2B] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#E8B95C]">
                <Info className="w-3.5 h-3.5" />
                <span className="uppercase">Engineering Implementation Details</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A5A7A2] leading-relaxed font-light">
                {activeNode.deepDive}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
