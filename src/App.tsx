import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroAsset from "./assets/hero.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  name: string;
  summary: string;
  proof: string;
  stack: string[];
  image: string;
  className: string;
};

const projects: Project[] = [
  {
    name: "Retrieval Quality Bench",
    summary: "A reproducible harness for comparing chunking, ranking, and prompt variants.",
    proof: "Turns subjective LLM answers into traceable review sheets.",
    stack: ["Python", "FastAPI", "Postgres"],
    image: "https://picsum.photos/seed/retrieval-lab/1200/900",
    className: "bento-large",
  },
  {
    name: "Vision Defect Console",
    summary: "A review UI that pairs model confidence with the image regions behind the decision.",
    proof: "Makes false positives visible before downstream triage.",
    stack: ["PyTorch", "React", "ONNX"],
    image: "https://picsum.photos/seed/vision-console/1200/900",
    className: "bento-large",
  },
  {
    name: "Agent Ops Notebook",
    summary: "A local-first runbook for prompts, traces, tool calls, and recovery decisions.",
    proof: "Keeps every run attached to evidence.",
    stack: ["TypeScript", "SQLite", "Motion"],
    image: "https://picsum.photos/seed/agent-notebook/1000/900",
    className: "bento-small",
  },
  {
    name: "Evaluation UX",
    summary: "Interfaces that make model uncertainty legible to humans.",
    proof: "Designed around judgment, not decoration.",
    stack: ["UX", "Evals", "A11y"],
    image: "https://picsum.photos/seed/eval-interface/1000/900",
    className: "bento-small",
  },
  {
    name: "Systems Craft",
    summary: "Frontend, API, and data workflows that survive outside the demo.",
    proof: "Readable code paths and fast iteration loops.",
    stack: ["React", "APIs", "Deploy"],
    image: "https://picsum.photos/seed/systems-craft/1000/900",
    className: "bento-small",
  },
];

const capabilityWords = [
  "I",
  "build",
  "AI",
  "interfaces",
  "that",
  "show",
  "their",
  "reasoning,",
  "surface",
  "failure",
  "modes,",
  "and",
  "help",
  "teams",
  "decide",
  "what",
  "to",
  "trust.",
];

function App() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(".scrub-word, .bento-card, .hero-copy > *", { opacity: 1, transform: "none" });
        return;
      }

      gsap.fromTo(
        ".hero-copy > *",
        { transform: "translateY(18px)", opacity: 0 },
        {
          transform: "translateY(0px)",
          opacity: 1,
          duration: 0.42,
          ease: "power3.out",
          stagger: 0.055,
        },
      );

      gsap.fromTo(
        ".bento-card",
        { transform: "scale(0.94)", opacity: 0.72 },
        {
          transform: "scale(1)",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 82%",
            end: "bottom 18%",
            scrub: true,
          },
          stagger: 0.08,
        },
      );

      gsap.fromTo(
        ".scrub-word",
        { opacity: 0.2, transform: "translateY(8px)" },
        {
          opacity: 1,
          transform: "translateY(0px)",
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".desire-panel",
            start: "top 72%",
            end: "bottom 38%",
            scrub: true,
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
          Aniket
        </a>
        <div className="nav-links">
          <a className="focus-ring" href="#work">
            Work
          </a>
          <a className="focus-ring" href="#capability">
            Capability
          </a>
          <a className="focus-ring" href="#contact">
            Contact
          </a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <h1>
            AI systems portfolio for builders who make models{" "}
            <span
              className="inline-image"
              aria-hidden="true"
              style={{ backgroundImage: "url(https://picsum.photos/seed/model-trace/480/220)" }}
            />
            answer with evidence.
          </h1>
          <p>
            A sharper developer portfolio demo for AI/ML and software engineering roles:
            project proof, readable systems thinking, and interfaces that make uncertainty inspectable.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="primary-action focus-ring" href="#work">
              View selected work
            </a>
            <a className="secondary-action focus-ring" href="mailto:your-email@example.com">
              Start a conversation
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
        </aside>
      </section>

      <section className="interest-section" id="work" aria-labelledby="work-heading">
        <div className="section-intro">
          <h2 id="work-heading">Selected systems, arranged like evidence.</h2>
          <p>
            Each slot is written so you can replace it with real work later without losing the
            hierarchy: problem, technical contribution, proof, and stack.
          </p>
        </div>

        <div className="bento-grid">
          {projects.map((project) => (
            <article className={`bento-card group ${project.className}`} key={project.name}>
              <div className="bento-media">
                <img src={project.image} alt="" aria-hidden="true" loading="lazy" />
              </div>
              <div className="bento-content">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <strong>{project.proof}</strong>
                <ul aria-label={`${project.name} stack`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="desire-section" id="capability" aria-labelledby="capability-heading">
        <div className="desire-panel">
          <h2 id="capability-heading">
            {capabilityWords.map((word) => (
              <span className="scrub-word" key={word}>
                {word}{" "}
              </span>
            ))}
          </h2>
        </div>
        <div className="accordion-set" aria-label="Capability areas">
          <article>
            <h3>Model behavior</h3>
            <p>Evaluation loops, failure analysis, prompt systems, and reviewer-facing evidence.</p>
          </article>
          <article>
            <h3>Product engineering</h3>
            <p>React surfaces, API paths, persistence, deployment, and performance budgets.</p>
          </article>
          <article>
            <h3>Decision design</h3>
            <p>Interfaces shaped around what people need to compare, verify, and trust.</p>
          </article>
        </div>
      </section>

      <footer className="action-footer" id="contact">
        <div>
          <h2>Bring the real links, resume, and projects. The frame is ready.</h2>
          <p>
            Replace the placeholders with your email, GitHub, LinkedIn, resume, and strongest
            shipped projects to turn this demo into a production portfolio.
          </p>
        </div>
        <div className="footer-actions">
          <a className="primary-action focus-ring" href="mailto:your-email@example.com">
            Email
          </a>
          <a className="secondary-action focus-ring" href="https://github.com/your-username">
            GitHub
          </a>
          <a className="secondary-action focus-ring" href="https://www.linkedin.com/in/your-profile">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
