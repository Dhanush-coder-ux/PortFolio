"use client";

import { lazy, Suspense, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlackholeCanvas = lazy(() => import("./BlackholeScene"));
const MotionP = motion.p;
const MotionH1 = motion.h1;
const MotionDiv = motion.div;
const resumeUrl = "/images/Dhanush_Kumar_Resume_ATS.pdf";

const navItems = [
  ["Signal", "#hero"],
  ["Case Studies", "#work"],
  ["Architecture", "#architecture"],
  ["Timeline", "#timeline"],
  ["Resume", "#resume"],
  ["Contact", "#contact"],
];

const stats = [
  ["800ms", "RAG answer latency target"],
  ["90%+", "retrieval precision uplift"],
  ["60%", "faster retail checkout"],
  ["5 hrs", "weekly ops work saved"],
];

const projects = [
  {
    title: "RAG-Powered AI Learning Platform",
    eyebrow: "Agentic RAG / Local LLM / Vector Search",
    url: "https://rag-chat-ui-sooty.vercel.app/",
    image: "/images/vaathi-rag.png",
    stack: ["FastAPI", "LLaMA 3", "Ollama", "Gemini", "ChromaDB", "pgvector"],
    impact:
      "Architected document ingestion, chunking, embeddings, semantic retrieval, and LLM response flow with local inference to remove per-query API cost.",
    result: "Sub-800ms response goal on commodity hardware with 90%+ retrieval precision versus keyword search.",
  },
  {
    title: "CRM & Order Management System",
    eyebrow: "Enterprise CRM / Azure Delivery / RBAC",
    url: "https://tibos-crm.vercel.app/login",
    image: "/images/crm.png",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Redis", "ARQ"],
    impact:
      "Centralized customer management, subscriptions, payments, distributors, bulk imports, and background analytics into one operations surface.",
    result: "Reduced administrative overhead with JWT/RBAC, Excel workflows, and automated payment tracking.",
  },
  {
    title: "Inventory Billing & Digital Store",
    eyebrow: "Retail System / Barcode Engine / Analytics",
    url: "https://market-place-ismv.vercel.app/",
    image: "/images/Inventory.png",
    stack: ["React", "FastAPI", "PostgreSQL", "Tailwind", "QR Engine"],
    impact:
      "Built automated billing, barcode and QR scanning, inventory tracking, sales analytics, and CSV exports.",
    result: "Cut checkout time by roughly 60% and saved around 5 hours per week in reconciliation work.",
  },
  {
    title: "Hotel Conversion Landing Experience",
    eyebrow: "Premium Web UI / Responsive Frontend",
    url: "https://hotel-landingpage-theta.vercel.app/",
    image: "/images/hotel.png",
    stack: ["React", "Tailwind", "Responsive UI", "Performance"],
    impact:
      "Designed a polished hospitality landing page focused on clear offer hierarchy, booking intent, and fast mobile browsing.",
    result: "Shows production-ready UI taste across non-AI, customer-facing product surfaces.",
  },
  {
    title: "Sling Bag E-Commerce",
    eyebrow: "E-Commerce / Payment Integration / Product Store",
    url: "https://sling-bag-ten.vercel.app/",
    image: "/images/slingbag.png",
    stack: ["React", "Payment Integration", "E-Commerce", "Web UI"],
    impact:
      "Developed a focused e-commerce experience for a sling bag product featuring a seamless checkout flow and payment integration.",
    result: "Delivers a clean, conversion-optimized shopping experience.",
  },
];

const timeline = [
  {
    date: "Feb 2026 - May 2026",
    title: "Web Development Intern, TIBOS Solutions",
    body: "Contributed to a production CRM platform, debugging, testing, and deploying through Azure DevOps CI/CD pipelines.",
  },
  {
    date: "2025",
    title: "Cyberthan Hackathon Winner",
    body: "Placed 1st with a WebAuthn/FIDO2 passwordless authentication system in the cybersecurity category.",
  },
  {
    date: "Sep 2024 - Nov 2024",
    title: "Backend Development Intern, CodTech IT Solutions",
    body: "Built real-time chat APIs using Socket.IO and Flask, connecting frontend interfaces with bidirectional communication.",
  },
  {
    date: "Sep 2024 - Oct 2024",
    title: "Web Development Intern, SkillUpU",
    body: "Improved responsive web pages, UI quality, and frontend performance in a team delivery environment.",
  },
  {
    date: "Expected Jun 2026",
    title: "B.E. Computer Science and Engineering",
    body: "Latha Mathavan Engineering College, with coursework in DSA, DBMS, AI, Web Development, and Computer Networks.",
  },
];

const architectureNodes = [
  ["Ingest", "PDFs, docs, CRM data, retail records"],
  ["Reason", "LangGraph agents, retrieval routing, prompt policy"],
  ["Retrieve", "ChromaDB, pgvector, cosine ranking"],
  ["Serve", "FastAPI, async Python, Redis queues"],
  ["Interface", "React, Next.js, Tailwind, shadcn/ui"],
  ["Ship", "Azure, Docker, GitHub Actions, Nginx"],
];

const skills = [
  "Agentic RAG",
  "LangGraph",
  "LangChain",
  "LLaMA 3",
  "Ollama",
  "Gemini",
  "FastAPI",
  "PostgreSQL",
  "pgvector",
  "ChromaDB",
  "Redis",
  "ARQ",
  "JWT/RBAC",
  "WebAuthn",
  "React",
  "Next.js 14",
  "Tailwind CSS",
  "Azure DevOps",
  "Docker",
  "GitHub Actions",
];

const testimonials = [
  {
    quote:
      "Dhanush moved comfortably between product requirements, backend constraints, and UI delivery during CRM work.",
    name: "Production CRM Collaboration",
    role: "TIBOS Solutions internship signal",
  },
  {
    quote:
      "His strongest pattern is turning messy systems into simple interfaces with measurable operational impact.",
    name: "Project Review",
    role: "Retail and CRM systems",
  },
  {
    quote:
      "A sharp final-year engineer with practical AI systems experience beyond classroom projects.",
    name: "Recruiter Takeaway",
    role: "AI engineering portfolio summary",
  },
];

const blogPosts = [
  ["How I Design RAG Pipelines That Recruiters Can Understand", "Case-study notes on ingestion, retrieval, evals, and latency budgets."],
  ["FastAPI Backends That Feel Calm Under Load", "Schema design, async jobs, Redis queues, and API surfaces that scale."],
  ["From Student Portfolio to AI Engineer Brand", "Why impact, architecture, and decision logs beat generic skill cards."],
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div ref={container} style={{ height: "100vh", position: "relative", marginBottom: "-15vh" }}>
      <motion.article
        className={`project-card reveal ${index === 0 ? "featured-project" : ""}`}
        style={{
          scale,
          opacity,
          top: `calc(10vh + ${index * 30}px)`,
          position: "sticky",
          transformOrigin: "top center",
        }}
      >
        <div className="project-media">
          <img src={project.image} alt={`${project.title} interface preview`} />
        </div>
        <div className="project-body">
          <p>{project.eyebrow}</p>
          <h3>{project.title}</h3>
          <span>{project.impact}</span>
          <strong>{project.result}</strong>
          <div className="tag-row">
            {project.stack.map((tag: string) => (
              <small key={tag}>{tag}</small>
            ))}
          </div>
          <a href={project.url} target="_blank" rel="noreferrer">
            Open live demo
          </a>
        </div>
      </motion.article>
    </div>
  );
};

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      role: "bot",
      text: "Ask about Dhanush's RAG work, FastAPI backends, internships, achievements, or best-fit roles.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
        }
      );
    });
  }, []);

  const answerResumeQuestion = (question) => {
    const q = question.toLowerCase();
    if (q.includes("rag") || q.includes("ai") || q.includes("llm")) {
      return "Dhanush has built an Agentic RAG platform using FastAPI, LLaMA 3 via Ollama, Gemini embeddings, ChromaDB, and pgvector. The pipeline covers ingestion, chunking, embeddings, semantic retrieval, and local LLM responses.";
    }
    if (q.includes("backend") || q.includes("fastapi") || q.includes("api")) {
      return "His backend strengths are FastAPI, async Python, PostgreSQL, SQLAlchemy, JWT/RBAC, Redis, ARQ workers, REST APIs, WebAuthn, and production-style deployment workflows.";
    }
    if (q.includes("intern") || q.includes("experience")) {
      return "He interned at TIBOS Solutions on a production CRM from Feb-May 2026, SkillUpU in frontend development, and CodTech IT Solutions building real-time chat APIs.";
    }
    if (q.includes("achievement") || q.includes("award") || q.includes("hackathon")) {
      return "He won 1st place at Cyberthan Hackathon 2025 with a WebAuthn/FIDO2 passwordless auth system, ranked strongly in Codify Challenge, and spoke on blockchain to 100+ students.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
      return "You can reach Dhanush at dhanushsubbia703@gmail.com or +91 8825773207. He is based in Madurai, India.";
    }
    if (q.includes("role") || q.includes("hire") || q.includes("fit")) {
      return "Best-fit roles: AI Engineer intern, Backend Engineer intern, Full-Stack Engineer, RAG application developer, or FastAPI/React product engineer.";
    }
    return "Useful signal: Dhanush is a final-year CSE student graduating in 2026 with production CRM exposure, AI/RAG systems, FastAPI backends, React/Next.js frontends, and Azure CI/CD experience.";
  };

  const sendChat = (event) => {
    event.preventDefault();
    const cleanInput = chatInput.trim();
    if (!cleanInput) return;
    setChatMessages((messages) => [
      ...messages,
      { role: "user", text: cleanInput },
      { role: "bot", text: answerResumeQuestion(cleanInput) },
    ]);
    setChatInput("");
  };

  return (
    <main className="site-shell">
      <nav className="top-nav">
        <a className="brand-mark" href="#hero" aria-label="Dhanush Kumar portfolio home">
          <span>DK</span>
          <strong>Project Blackhole</strong>
        </a>
        <div className="nav-links">
          {navItems.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href={resumeUrl} target="_blank" rel="noreferrer">
          Resume
        </a>
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-canvas" aria-hidden="true">
          <Suspense fallback={<div className="canvas-fallback" />}>
            <BlackholeCanvas />
          </Suspense>
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <MotionP className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            AI Engineer Portfolio / FastAPI / Agentic RAG / Production CRM
          </MotionP>
          <MotionH1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            Dhanush Kumar builds AI systems that turn product complexity into calm software.
          </MotionH1>
          <MotionP className="hero-copy" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.22 }}>
            Final-year CSE engineer shipping Agentic RAG, FastAPI backends, React/Next.js interfaces, and Azure-deployed product workflows with measurable operational impact.
          </MotionP>
          <MotionDiv className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.34 }}>
            <a className="primary-action" href="#work">
              View case studies
            </a>
            <a className="secondary-action" href="#chatbot">
              Ask resume AI
            </a>
          </MotionDiv>
        </div>
        <div className="hero-metrics" aria-label="portfolio performance metrics">
          {stats.map(([value, label]) => (
            <div className="metric-tile" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-strip reveal">
        <p className="section-kicker">Recruiter Signal</p>
        <h2>Not another skill grid. A portfolio built around evidence, decisions, and outcomes.</h2>
        <div className="signal-grid">
          <div>
            <span>01</span>
            <h3>AI systems depth</h3>
            <p>RAG architecture, embeddings, local LLM inference, vector search, and answer quality tradeoffs.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Backend seriousness</h3>
            <p>FastAPI, async Python, SQLAlchemy, JWT/RBAC, Redis workers, PostgreSQL, and CI/CD deployment.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Product taste</h3>
            <p>Premium interfaces that explain the work clearly for hiring managers, founders, and engineering teams.</p>
          </div>
        </div>
      </section>

      <section id="work" className="content-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Selected Case Studies</p>
          <h2>Production-minded projects with business impact.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="architecture" className="content-section architecture-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Architecture Visualization</p>
          <h2>How Dhanush thinks through an AI product surface.</h2>
        </div>
        <div className="architecture-board reveal">
          <div className="architecture-core">
            <span>Blackhole Core</span>
            <strong>Reasoned retrieval engine</strong>
          </div>
          {architectureNodes.map(([title, body], index) => (
            <div className={`architecture-node node-${index + 1}`} key={title}>
              <b>{title}</b>
              <span>{body}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="timeline" className="content-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Career Timeline</p>
          <h2>A fast-moving path from web foundations to AI engineering.</h2>
        </div>
        <div className="timeline-list">
          {timeline.map((item) => (
            <article className="timeline-item reveal" key={`${item.date}-${item.title}`}>
              <time>{item.date}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split-section">
        <div className="github-panel reveal">
          <p className="section-kicker">GitHub Dashboard</p>
          <h2>Contribution rhythm built for consistent shipping.</h2>
          <div className="github-stats">
            <span><b>2026</b> graduation year</span>
            <span><b>20+</b> core technologies</span>
            <span><b>3</b> internships</span>
          </div>
          <img src="/images/git-hub.png" alt="GitHub Contributions" className="w-full mt-4 rounded-lg object-cover" />
          <a href="https://github.com/Dhanush-coder-ux" target="_blank" rel="noreferrer">
            Visit GitHub profile
          </a>
        </div>
        <div id="chatbot" className="chatbot-panel reveal">
          <p className="section-kicker">Resume-Trained Chatbot</p>
          <h2>Ask the portfolio what matters.</h2>
          <div className="chat-window">
            {chatMessages.map((message, index) => (
              <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={sendChat}>
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Ask: What makes Dhanush a fit for AI engineering?"
              aria-label="Ask the resume chatbot"
            />
            <button type="submit">Ask</button>
          </form>
        </div>
      </section>

      <section id="resume" className="content-section resume-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Resume Page</p>
          <h2>ATS-clean background, presented for humans.</h2>
        </div>
        <div className="resume-grid">
          <div className="resume-card reveal">
            <h3>Professional Summary</h3>
            <p>
              Final-year CSE student with internship and production experience building AI-powered web systems, Agentic RAG pipelines, and high-throughput REST backends.
            </p>
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              Download ATS resume
            </a>
          </div>
          <div className="resume-card reveal">
            <h3>Core Stack</h3>
            <div className="tag-row expanded">
              {skills.map((skill) => (
                <small key={skill}>{skill}</small>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Testimonials</p>
          <h2>Signals framed around work quality.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure className="testimonial-card reveal" key={testimonial.name}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="blog" className="content-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Blog System</p>
          <h2>Writing topics that extend the portfolio story.</h2>
        </div>
        <div className="blog-grid">
          {blogPosts.map(([title, body]) => (
            <article className="blog-card reveal" key={title}>
              <span>Draft essay</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section reveal">
        <div>
          <p className="section-kicker">Contact Page</p>
          <h2>Bring Dhanush into AI product work.</h2>
          <p>
            Available for AI engineering internships, backend roles, RAG application work, and full-stack product builds.
          </p>
        </div>
        <div className="contact-actions">
          <a className="primary-action" href="mailto:dhanushsubbia703@gmail.com">
            Email Dhanush
          </a>
          <a className="secondary-action" href="tel:+918825773207">
            Call
          </a>
          <a className="secondary-action" href="https://www.linkedin.com/in/dhanush-kumar15/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}


export default App;
