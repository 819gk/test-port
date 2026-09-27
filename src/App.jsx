import { useEffect, useRef, useState } from "react";
import { profile, skills, experience, projects, education } from "./data.js";
import "./App.css";

function useTypewriter(words, typingMs = 55, pauseMs = 1400, deletingMs = 30) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timeout = setTimeout(() => setText(next), deleting ? deletingMs : typingMs);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingMs, pauseMs, deletingMs]);

  return text;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, eyebrow, title, children }) {
  const [ref, visible] = useReveal();
  return (
    <section id={id} className={`section ${visible ? "is-visible" : ""}`} ref={ref}>
      <div className="section-head">
        <h2>{title}</h2>
        {eyebrow && <span className="section-note">{eyebrow}</span>}
      </div>
      {children}
    </section>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["#work", "Work"],
    ["#experience", "Experience"],
    ["#skills", "Skills"],
    ["#contact", "Contact"],
  ];
  return (
    <header className="nav">
      <a className="nav-name" href="#top">
        {profile.name}
      </a>
      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="btn btn-ghost" href="/resume.pdf" download>
          Resume
        </a>
      </nav>
      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero() {
  const role = useTypewriter(profile.roles);
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <p className="hero-kicker">{profile.location}</p>
        <h1>
          {profile.name}
          <span className="hero-role">
            {role}
            <span className="cursor" aria-hidden="true" />
          </span>
        </h1>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/resume.pdf" download>
            Download resume
          </a>
          <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
      <div className="hero-mark" aria-hidden="true">
        <svg viewBox="0 0 220 220" fill="none">
          <path
            d="M20 170 L75 60 L110 130 L140 75 L200 170"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="75" cy="60" r="4.5" fill="var(--accent)" />
          <circle cx="140" cy="75" r="4.5" fill="var(--ink)" />
          <circle cx="200" cy="170" r="4.5" fill="var(--accent)" />
        </svg>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills" eyebrow="What I build with">
      <dl className="skills-list">
        {skills.map((group) => (
          <div className="skills-row" key={group.label}>
            <dt>{group.label}</dt>
            <dd>
              {group.items.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="4+ years, shipping in production">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company + job.period}>
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-body">
              <div className="timeline-heading">
                <h3>{job.role}</h3>
                <span className="timeline-period">{job.period}</span>
              </div>
              <p className="timeline-company">
                {job.company} — {job.location}
              </p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="work" title="Selected projects">
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function EducationContact() {
  return (
    <Section id="contact" title="Education & contact">
      <div className="edu-contact">
        <div>
          <h3>{education.degree}</h3>
          <p className="timeline-company">
            {education.school} — {education.year}
          </p>
        </div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <a href="/resume.pdf" download>
        Download resume
      </a>
    </footer>
  );
}

export default function App() {
  return (
    <div className="page">
      <Nav />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <EducationContact />
      <Footer />
    </div>
  );
}
