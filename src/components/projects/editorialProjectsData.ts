export interface EditorialProject {
  id: string;
  number: string;
  name: string;
  category: string;
  technologies: string;
  description: string;
  image: string;
  fallbackImage: string;
  url: string;
  githubUrl: string;
}

export const editorialProjects: EditorialProject[] = [
  {
    id: "inventq",
    number: "01",
    name: "InventQ",
    category: "Inventory & Billing SaaS",
    technologies: "React / FastAPI / PostgreSQL",
    description: "Hardware-free barcode/QR retail billing engine with Web Workers and atomic transaction reconciliation.",
    image: "/images/optimized/Inventory.webp",
    fallbackImage: "/images/Inventory.png",
    url: "https://market-place-ismv.vercel.app/",
    githubUrl: "https://github.com/Dhanush-coder-ux",
  },
  {
    id: "vaathi-ai",
    number: "02",
    name: "Vaathi AI",
    category: "Agentic RAG / AI Engineering",
    technologies: "Python / LangGraph / Gemini",
    description: "Enterprise RAG system with local LLaMA 3 inference via Ollama, table-aware chunking, and pgvector cosine ranking.",
    image: "/images/optimized/vaathi-rag.webp",
    fallbackImage: "/images/vaathi-rag.png",
    url: "https://rag-chat-ui-sooty.vercel.app/",
    githubUrl: "https://github.com/Dhanush-coder-ux",
  },
  {
    id: "ecommerce",
    number: "03",
    name: "E-commerce Platform",
    category: "Full-Stack Development",
    technologies: "React / FastAPI / PostgreSQL",
    description: "Lifestyle direct-to-consumer store with interactive 360 material inspectors and express checkout flow.",
    image: "/images/optimized/slingbag.webp",
    fallbackImage: "/images/slingbag.png",
    url: "https://sling-bag-ten.vercel.app/",
    githubUrl: "https://github.com/Dhanush-coder-ux",
  },
  {
    id: "crm-operations",
    number: "04",
    name: "CRM Operations Platform",
    category: "Enterprise CRM / Azure Delivery",
    technologies: "Next.js / FastAPI / Redis / Azure",
    description: "Operations platform centralizing subscriber hierarchies, bulk CSV parsers, and background ARQ queues.",
    image: "/images/optimized/crm.webp",
    fallbackImage: "/images/crm.png",
    url: "https://tibos-crm.vercel.app/login",
    githubUrl: "https://github.com/Dhanush-coder-ux",
  },
  {
    id: "passwordless-auth",
    number: "05",
    name: "Passwordless Security System",
    category: "Application Development & Security",
    technologies: "Python / WebAuthn / FIDO2",
    description: "Cyberthan Hackathon 1st place prototype replacing passwords with browser cryptographic credentials.",
    image: "/images/optimized/biometric.webp",
    fallbackImage: "/images/biometric.png",
    url: "https://github.com/Dhanush-coder-ux",
    githubUrl: "https://github.com/Dhanush-coder-ux",
  },
];
