import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroAsset from "./assets/hero.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  name: string;
  type: string;
  summary: string;
  proof: string;
  stack: string[];
  links: { label: string; href: string }[];
  image: string;
  className: string;
};

const projects: Project[] = [
  {
    name: "PersonaBridge",
    type: "AI application",
    summary:
      "A consent-aware AI assistant prototype with chat sessions, reviewable memory, approval-gated actions, and a provider-neutral realtime contract.",
    proof:
      "Kept memory disabled by default, separated browser microphone permission from server credentials, and documented API boundaries for safer AI workflows.",
    stack: ["Next.js", "React", "FastAPI", "TypeScript"],
    links: [{ label: "GitHub", href: "https://github.com/krishna-057/PersonaBridge" }],
    image: "https://picsum.photos/seed/personabridge-ai-console/1200/900",
    className: "bento-large",
  },
  {
    name: "Clinic Appointment App",
    type: "Full-stack product",
    summary:
      "A Flutter and Supabase appointment workflow for reception teams handling patients, doctors, schedules, and appointment status.",
    proof:
      "Implemented 30-minute scheduling rules, validation states, searchable appointment views, database persistence, RLS policies, and an installable Android APK.",
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    links: [{ label: "GitHub", href: "https://github.com/krishna-057/clinic-appointment-app" }],
    image: "https://picsum.photos/seed/clinic-workflow/1200/900",
    className: "bento-large",
  },
  {
    name: "HookRelay",
    type: "Developer platform",
    summary:
      "A webhook delivery platform for signed event ingestion, retry handling, delivery logs, CSV export, alerts, and replay workflows.",
    proof:
      "Designed PostgreSQL boundaries, BullMQ delivery jobs, HMAC verification examples, rate limiting, and receiver-failure classification.",
    stack: ["Next.js", "Fastify", "PostgreSQL", "Redis"],
    links: [{ label: "GitHub", href: "https://github.com/krishna-057/HookRelay" }],
    image: "https://picsum.photos/seed/hookrelay-events/1000/900",
    className: "bento-small",
  },
  {
    name: "Bazaar Gridlock",
    type: "Published Android game",
    summary:
      "A calm offline sliding-block puzzle game where players clear bazaar traffic and free the green rickshaw through handcrafted levels.",
    proof:
      "Published on Google Play with 60 offline levels, sequential unlocking, undo/restart, star ratings, local settings, and no ads, accounts, analytics, or in-app purchases.",
    stack: ["Kotlin", "Jetpack Compose", "Compose Canvas", "DataStore"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=app.binarykeys.bazaargridlock" },
      { label: "GitHub", href: "https://github.com/krishna-057/bazaar-gridlock" },
    ],
    image: "https://picsum.photos/seed/bazaar-gridlock-game/1000/900",
    className: "bento-small",
  },
  {
    name: "Pneumonia Detection Benchmark",
    type: "AI/ML benchmark",
    summary:
      "A PyTorch study for pediatric chest X-ray classification with data auditing, duplicate removal, balanced splits, model comparison, and Grad-CAM checks.",
    proof:
      "Compared DenseNet121, ResNet50+CBAM, ConvNeXt Tiny, ViT-B/16, and Swin-T; ConvNeXt Tiny reached 0.9997 ROC-AUC and 0.990 recall.",
    stack: ["Python", "PyTorch", "CNNs", "Grad-CAM"],
    links: [{ label: "GitHub", href: "https://github.com/krishna-057/pneumonia-detection-benchmark" }],
    image: "https://picsum.photos/seed/pneumonia-benchmark/1000/900",
    className: "bento-small",
  },
];

const skills = [
  "Python",
  "PyTorch",
  "FastAPI",
  "React",
  "Next.js",
  "Flutter",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "RAG",
  "Computer Vision",
  "Grad-CAM",
];

function App() {
  const root = useRef<HTMLElement | null>(null);
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(".hero-copy > *, .bento-card, .capability-card, .skill-pill", {
          opacity: 1,
          transform: "none",
        });
        return;
      }

      gsap.fromTo(
        ".hero-art",
        { transform: "translateY(18px)", opacity: 0.86 },
        {
          transform: "translateY(0px)",
          opacity: 1,
          duration: 0.48,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".bento-card",
        { transform: "translateY(22px)", opacity: 0.78 },
        {
          transform: "translateY(0px)",
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 82%",
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <main ref={root} className="portfolio-shell overflow-x-hidden w-full max-w-full">
      <nav className="top-nav" aria-label="Portfolio navigation">
        <a className="brand focus-ring" href="#top" aria-label="Back to top">
          Krishna Sharma
        </a>
        <div className="nav-links">
          <a className="focus-ring" href="#work">
            Work
          </a>
          <a className="focus-ring" href="#capability">
            Skills
          </a>
          <a className="focus-ring" href="#contact">
            Contact
          </a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Full-stack and AI/ML developer - HSR Bengaluru</p>
          <h1>Full-stack developer building practical AI/ML systems.</h1>
          <p>
            I build web products, backend services, mobile workflows, and AI features that are
            useful beyond the demo. My work spans RAG search, computer vision, FastAPI services,
            React/Next.js interfaces, Flutter apps, and PostgreSQL-backed systems.
          </p>
          <div className="availability-row" aria-label="Availability">
            <span>Remote</span>
            <span>On-site</span>
            <span>Hybrid</span>
            <span>Full-time</span>
            <span>Contract</span>
          </div>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="primary-action focus-ring" href="#work">
              View selected work
            </a>
            <a className="secondary-action focus-ring" href={resumeHref}>
              Resume
            </a>
            <a className="secondary-action focus-ring" href="mailto:krishnasharmacit@gmail.com">
              Email me
            </a>
          </div>
        </div>

        <aside className="hero-art" aria-label="Portfolio visual summary">
          <img src={heroAsset} alt="" aria-hidden="true" />
          <div className="trace-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-proof">
            <strong>Current focus</strong>
            <p>AI search, model evaluation, full-stack product workflows, and shipped mobile apps.</p>
          </div>
        </aside>
      </section>

      <section className="interest-section" id="work" aria-labelledby="work-heading">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading">Projects with product shape and engineering proof.</h2>
          </div>
          <p>
            A recruiter should be able to see the product problem, the technical contribution, and
            the evidence quickly. These are the projects I would lead with right now.
          </p>
        </div>

        <div className="bento-grid">
          {projects.map((project) => (
            <article className={`bento-card group ${project.className}`} key={project.name}>
              <div className="bento-media">
                <img src={project.image} alt="" aria-hidden="true" loading="lazy" />
              </div>
              <div className="bento-content">
                <span>{project.type}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <strong>{project.proof}</strong>
                <ul aria-label={`${project.name} stack`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a className="focus-ring" href={link.href} key={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capability-section" id="capability" aria-labelledby="capability-heading">
        <div className="section-intro compact">
          <div>
            <p className="eyebrow">Capability</p>
            <h2 id="capability-heading">Strongest where AI meets usable software.</h2>
          </div>
          <p>
            The portfolio should feel bold, but the claims should stay grounded: build, measure,
            document, and ship.
          </p>
        </div>
        <div className="capability-grid">
          <article className="capability-card">
            <h3>AI and ML systems</h3>
            <p>PyTorch computer-vision pipelines, transfer learning, Grad-CAM review, RAG search, embeddings, BM25, and model evaluation.</p>
          </article>
          <article className="capability-card">
            <h3>Product engineering</h3>
            <p>React, Next.js, Flutter, FastAPI, REST APIs, SQL-backed workflows, Supabase, authentication, dashboards, and deployment-ready UI.</p>
          </article>
          <article className="capability-card">
            <h3>Production habits</h3>
            <p>Documented architecture, testable rules, monitoring with Prometheus, clean API contracts, validation states, and failure-aware workflows.</p>
          </article>
        </div>
        <div className="skill-cloud" aria-label="Skills">
          {skills.map((skill) => (
            <span className="skill-pill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="experience-section" aria-labelledby="experience-heading">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-heading">Recent work</h2>
        <div className="timeline">
          <article>
            <span>Nov 2025 - Present</span>
            <h3>Full Stack AI Developer - RentMyStay</h3>
            <p>Built FAQ-focused RAG search with hybrid BM25 and embedding retrieval, FastAPI workflows, SQL-backed operations, Flutter app maintenance, and Prometheus monitoring for 1,000+ daily requests.</p>
          </article>
          <article>
            <span>Jan 2025 - Jul 2025</span>
            <h3>Software Engineering Intern - Saral Startup Schools</h3>
            <p>Built a responsive wedding-service booking platform with Next.js, authentication, dashboards, Drizzle ORM, and Cloudflare SQLite/D1 data flows.</p>
          </article>
          <article>
            <span>Aug 2021 - Jun 2025</span>
            <h3>B.Tech CSE - Central Institute of Technology Kokrajhar</h3>
            <p>Graduated with CGPA 8.80/10.</p>
          </article>
        </div>
      </section>

      <footer className="action-footer" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Open to full-stack and AI/ML roles.</h2>
          <p>
            Based in HSR Bengaluru, available for remote, on-site, hybrid, full-time, and contract
            work.
          </p>
        </div>
        <div className="footer-actions">
          <a className="primary-action focus-ring" href="mailto:krishnasharmacit@gmail.com">
            Email me
          </a>
          <a className="secondary-action focus-ring" href="https://github.com/krishna-057" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="secondary-action focus-ring" href="https://www.linkedin.com/in/krishna-sharma-a502aa234" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
