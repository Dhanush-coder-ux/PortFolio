export interface ProjectTheme {
  id: string;
  name: string;
  background: string;
  glow: string;
  border: string;
  accent: string;
  pillBg: string;
  pillText: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  engineeringChallenge: string;
  fullDescription: string;
  url: string;
  githubUrl: string;
  mainImage: string;
  mainImageFallback: string;
  supportingImages: {
    src: string;
    fallback: string;
    alt: string;
    caption: string;
  }[];
  stack: string[];
  keyFeatures: string[];
  architecture: string[];
  theme: ProjectTheme;
}

export const projectsData: ProjectItem[] = [
  {
    id: "inventq",
    number: "01",
    title: "InventQ — Inventory & Billing SaaS",
    category: "Full-Stack Retail System / Web Workers",
    shortDescription:
      "Commercial inventory control and automated point-of-sale system featuring hardware-free barcode/QR scanning, stock alerts, and instant receipt generation.",
    engineeringChallenge:
      "Implementing a client-side Web Worker barcode decoder capable of sustained 60 scans/min from commodity device cameras without locking the main UI thread, coupled with atomic PostgreSQL transactions to prevent double-selling across counter terminals.",
    fullDescription:
      "A complete commercial retail solution engineered to modernize storefront operations. Eliminates dedicated barcode hardware by processing camera streams inside Web Workers. Integrates automated low-stock warnings, thermal receipt printing, and daily CSV export pipelines.",
    url: "https://market-place-ismv.vercel.app/",
    githubUrl: "https://github.com/Dhanush-coder-ux",
    mainImage: "/images/optimized/Inventory.webp",
    mainImageFallback: "/images/Inventory.png",
    supportingImages: [
      {
        src: "/images/optimized/project5.webp",
        fallback: "/images/project5.png",
        alt: "POS Checkout Terminal & Product Catalog",
        caption: "Touch-friendly point-of-sale interface with instant search",
      },
      {
        src: "/images/optimized/project1.webp",
        fallback: "/images/project1.png",
        alt: "Inventory Stock Ledger & Alerts",
        caption: "Automated low-stock threshold warning engine",
      },
    ],
    stack: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS", "QR Engine", "Web Workers"],
    keyFeatures: [
      "Hardware-free QR & barcode scanner running inside Web Workers",
      "Instant printable invoice compilation with standard receipt layout",
      "Low-stock threshold triggers based on transaction velocity",
      "Atomic transaction locks preventing concurrency errors",
    ],
    architecture: [
      "FastAPI asynchronous backend with normalized PostgreSQL schema",
      "Optimistic frontend state cache for instant checkout response",
      "Background export jobs for daily sales reconciliation",
      "PWA offline-resilient cache strategy",
    ],
    theme: {
      id: "amber-gold",
      name: "Muted Amber",
      background: "#12100a",
      glow: "rgba(232, 185, 92, 0.16)",
      border: "rgba(232, 185, 92, 0.35)",
      accent: "#E8B95C",
      pillBg: "rgba(232, 185, 92, 0.1)",
      pillText: "#E8B95C",
    },
  },
  {
    id: "vaathi-rag",
    number: "02",
    title: "Vaathi LMS / AI RAG Assistant",
    category: "Agentic RAG / Local LLM / Vector Search",
    shortDescription:
      "End-to-end enterprise Retrieval-Augmented Generation platform with intelligent document chunking, hybrid vector search, and local LLaMA 3 inference.",
    engineeringChallenge:
      "Preserving markdown table structures, citations, and code blocks during recursive character chunking while keeping vector retrieval latency under 800ms on local inference hardware.",
    fullDescription:
      "Designed and implemented an enterprise RAG application that removes recurring external API cost by hosting local LLaMA 3 inference via Ollama. Features automated PDF/doc ingestion, Gemini embeddings, hybrid cosine search in ChromaDB and pgvector, and LangGraph fallback routing.",
    url: "https://rag-chat-ui-sooty.vercel.app/",
    githubUrl: "https://github.com/Dhanush-coder-ux",
    mainImage: "/images/optimized/vaathi-rag.webp",
    mainImageFallback: "/images/vaathi-rag.png",
    supportingImages: [
      {
        src: "/images/optimized/project1.webp",
        fallback: "/images/project1.png",
        alt: "Query Analytics & RAG Trace Dashboard",
        caption: "Real-time query trace, embedding inspect, and citation graph",
      },
      {
        src: "/images/optimized/biometric.webp",
        fallback: "/images/biometric.png",
        alt: "Vector Access Guardrails",
        caption: "Role-based document isolation & vector access guardrails",
      },
    ],
    stack: ["FastAPI", "LLaMA 3", "Ollama", "Gemini Embeddings", "ChromaDB", "pgvector", "Python"],
    keyFeatures: [
      "Local inference runner eliminating per-token API costs",
      "Table-aware chunking preserving technical documentation formatting",
      "Hybrid vector storage using pgvector and ChromaDB",
      "Server-Sent Events (SSE) streaming token output",
    ],
    architecture: [
      "FastAPI asynchronous worker layer with background queueing",
      "LangGraph agentic fallback router for domain queries",
      "Cosine similarity re-ranking step before context injection",
      "Isolated multi-document vector namespaces",
    ],
    theme: {
      id: "muted-teal",
      name: "Muted Teal",
      background: "#0a1311",
      glow: "rgba(69, 205, 179, 0.16)",
      border: "rgba(69, 205, 179, 0.35)",
      accent: "#45CDB3",
      pillBg: "rgba(69, 205, 179, 0.1)",
      pillText: "#45CDB3",
    },
  },
  {
    id: "crm-operations",
    number: "03",
    title: "Enterprise CRM & Operations Platform",
    category: "Enterprise CRM / Azure CI/CD / RBAC",
    shortDescription:
      "Production operations platform centralizing customer hierarchies, subscription billing, bulk data parsing, and role-based permissions.",
    engineeringChallenge:
      "Handling 10,000+ row Excel bulk data imports asynchronously with Celery and Redis workers without blocking FastAPI event loops or triggering timeouts on Azure Container Apps.",
    fullDescription:
      "Contributed to and deployed an enterprise CRM ecosystem during internship at TIBOS Solutions. Consolidated multi-tier customer hierarchies, recurring subscription billing, Excel bulk import pipelines, and automated order reconciliation into one mission-critical portal deployed through Azure CI/CD pipelines.",
    url: "https://tibos-crm.vercel.app/login",
    githubUrl: "https://github.com/Dhanush-coder-ux",
    mainImage: "/images/optimized/crm.webp",
    mainImageFallback: "/images/crm.png",
    supportingImages: [
      {
        src: "/images/optimized/project2.webp",
        fallback: "/images/project2.png",
        alt: "Distributor & Subscriber Directory",
        caption: "Granular hierarchy management with multi-tenant filtering",
      },
      {
        src: "/images/optimized/project3.webp",
        fallback: "/images/project3.png",
        alt: "Financial Ledger & Payment Tracking",
        caption: "Automated transaction reconciliation & billing reports",
      },
    ],
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Redis", "ARQ", "Azure DevOps"],
    keyFeatures: [
      "Strict JWT authentication with fine-grained granular RBAC",
      "High-throughput Excel/CSV bulk import parser with background async jobs",
      "Automated subscription status watcher with Redis-backed ARQ workers",
      "Interactive operations dashboards with real-time financial reporting",
    ],
    architecture: [
      "Azure Container Apps with PostgreSQL managed cluster",
      "Redis memory store for session state & distributed background tasks",
      "FastAPI asynchronous REST endpoints with Pydantic validation",
      "Next.js App Router frontend with optimistic state updates",
    ],
    theme: {
      id: "dusty-rose",
      name: "Dusty Rose",
      background: "#140c10",
      glow: "rgba(236, 72, 153, 0.16)",
      border: "rgba(236, 72, 153, 0.35)",
      accent: "#f472b6",
      pillBg: "rgba(236, 72, 153, 0.1)",
      pillText: "#f472b6",
    },
  },
  {
    id: "ecommerce-platform",
    number: "04",
    title: "D2C E-Commerce & Checkout Platform",
    category: "E-Commerce / Payment Integration / Product Store",
    shortDescription:
      "Modern lifestyle product showcase featuring multi-angle inspection, variant selectors, and a streamlined payment checkout flow.",
    engineeringChallenge:
      "Synchronizing optimistic cart state with backend inventory validation while ensuring sub-second drawer animations and secure payment gateway handshakes.",
    fullDescription:
      "Built a modern D2C product showcase tailored for lifestyle apparel and accessories. Highlights high-definition multi-angle product photography, interactive material & color variant switching, customer review filters, and a one-click checkout flow integrated with payment processing.",
    url: "https://sling-bag-ten.vercel.app/",
    githubUrl: "https://github.com/Dhanush-coder-ux",
    mainImage: "/images/optimized/slingbag.webp",
    mainImageFallback: "/images/slingbag.png",
    supportingImages: [
      {
        src: "/images/optimized/project5.webp",
        fallback: "/images/project5.png",
        alt: "Product Zoom & Material Inspector",
        caption: "Macro zoom inspector displaying fabric texture & stitching",
      },
      {
        src: "/images/optimized/project1.webp",
        fallback: "/images/project1.png",
        alt: "Slide-over Cart & Express Checkout",
        caption: "Frictionless cart drawer with live subtotal calculation",
      },
    ],
    stack: ["React", "Payment Gateway", "Tailwind CSS", "Framer Motion", "Vite"],
    keyFeatures: [
      "Smooth variant switcher with instant image cross-fades",
      "Slide-over cart drawer with persistent session storage",
      "Payment integration with order verification receipts",
      "Fluid micro-animations on cart add and quantity increments",
    ],
    architecture: [
      "Client-side state machine managing checkout flow",
      "Optimized asset delivery pipeline with next-gen image formats",
      "Framer Motion layout animations for smooth drawer gestures",
      "Cross-browser tested payment sheet with card auto-formatting",
    ],
    theme: {
      id: "indigo-slate",
      name: "Obsidian Slate",
      background: "#0b0c16",
      glow: "rgba(129, 140, 248, 0.16)",
      border: "rgba(129, 140, 248, 0.35)",
      accent: "#818cf8",
      pillBg: "rgba(129, 140, 248, 0.1)",
      pillText: "#a5b4fc",
    },
  },
  {
    id: "hotel-landing",
    number: "05",
    title: "Hotel Conversion Landing Experience",
    category: "Hospitality Web UI / Performance Frontend",
    shortDescription:
      "Luxury hospitality landing experience engineered for high direct-booking intent, responsive visual storytelling, and fast load times.",
    engineeringChallenge:
      "Delivering full-bleed high-resolution photography without exceeding a 1.2s First Contentful Paint by combining picture element srcSets, WebP compression, and font subsetting.",
    fullDescription:
      "Designed and built an editorial hospitality experience focused on maximizing booking conversions. Features responsive hero layouts, room preview drawers, interactive amenities explorers, and seamless date/guest selection.",
    url: "https://hotel-landingpage-theta.vercel.app/",
    githubUrl: "https://github.com/Dhanush-coder-ux",
    mainImage: "/images/optimized/hotel.webp",
    mainImageFallback: "/images/hotel.png",
    supportingImages: [
      {
        src: "/images/optimized/project2.webp",
        fallback: "/images/project2.png",
        alt: "Suites & Luxury Villas Preview",
        caption: "High-resolution suite photography with dynamic pricing",
      },
      {
        src: "/images/optimized/project3.webp",
        fallback: "/images/project3.png",
        alt: "Guest Reviews & Amenities Modal",
        caption: "Verified guest testimonials and experiential amenities",
      },
    ],
    stack: ["React", "Tailwind CSS", "GSAP Motion", "TypeScript", "Vite"],
    keyFeatures: [
      "Editorial typography hierarchy and bespoke layout rhythm",
      "Friction-free booking intent drawer reducing drop-off rates",
      "Sub-second First Contentful Paint with optimized WebP assets",
      "Accessible modal overlays with keyboard navigation",
    ],
    architecture: [
      "Component-driven React architecture with strict TypeScript types",
      "Tailwind styling with fluid typography clamps",
      "Lazy-loaded asset strategy for optimal Lighthouse performance",
      "GSAP scroll-triggered reveals with reduced-motion support",
    ],
    theme: {
      id: "emerald-sage",
      name: "Emerald Sage",
      background: "#0a130f",
      glow: "rgba(16, 185, 129, 0.16)",
      border: "rgba(16, 185, 129, 0.35)",
      accent: "#10b981",
      pillBg: "rgba(16, 185, 129, 0.1)",
      pillText: "#34d399",
    },
  },
];
