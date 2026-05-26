import { useEffect, useRef, useState } from "react";
import "./index.css";

// Déclarer gtag pour TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Fonction de tracking réutilisable
const trackEvent = (eventName: string, params: Record<string, string>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params);
  }
};

const workItems = [
  { tag: "IT Services", title: "IT Services Business Development", desc: "Representing Consultim-IT in B2B events and digital marketplaces to generate qualified leads and expand the company's client portfolio internationally." },
  { tag: "Sales", title: "Lead Generation Campaigns", desc: "Designed and executed targeted international prospecting campaigns, increasing pipeline volume through LinkedIn outreach and email campaigns." },
  { tag: "Partnerships", title: "Partnership Development", desc: "Managed and optimized Microsoft Partner Center activities and built long-term relationships with strategic partners to ensure smooth collaboration." },
  { tag: "Marketing", title: "Marketing & Outreach Projects", desc: "Created and managed marketing campaigns to increase company visibility — from social media to content marketing and brand positioning." },
  { tag: "Project", title: "Client Acquisition Strategy", desc: "Qualified client needs, matched them with consultants' expertise, and built structured acquisition pipelines using Microsoft Dynamics 365 CRM." },
  { tag: "International", title: "International Market Research", desc: "Conducted global market research to identify suppliers and business opportunities, maintained supplier databases and negotiated purchasing conditions." },
];

const skills = [
  { icon: "📈", title: "Business Development", items: ["Lead generation & prospecting", "Market research & analysis", "Opportunity identification", "Partnership building", "Microsoft Partner Center", "International B2B outreach"] },
  { icon: "💼", title: "Sales & Marketing", items: ["B2B sales & client acquisition", "CRM management (Dynamics 365)", "Email & LinkedIn outreach", "Digital marketing support", "Marketing campaign creation", "Pipeline tracking & reporting"] },
  { icon: "🧠", title: "Soft Skills", items: ["Communication & negotiation", "Strategic thinking", "Relationship management", "Leadership & teamwork", "Adaptability & problem solving", "Arabic, English & French"] },
];

const testimonials = [
  { initials: "AM", name: "Ahmed M.", role: "Managing Director, IT Company", text: "Professional, proactive and results-driven. Eya consistently goes beyond expectations in identifying opportunities and building strong business relationships. A great partner to work with." },
  { initials: "SB", name: "Sara B.", role: "Sales Manager, Tech Consultancy", text: "Eya has an exceptional ability to understand client needs and match them with the right solutions. Her communication skills and drive make her a standout business developer in the IT space." },
  { initials: "KL", name: "Karim L.", role: "CEO, Digital Solutions Firm", text: "Working with Eya was a pleasure. She brought energy, strategy and real results to our partnership program. Her international outlook and multilingual skills gave us a real competitive edge." },
];

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let current = "home";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    rootRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: "#about", label: "About Me" },
    { href: "#cv", label: "My CV" },
    { href: "#work", label: "My Work" },
    { href: "#skills", label: "What I Can Do" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const closeNav = () => setNavOpen(false);

  return (
    <div ref={rootRef}>
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="nav-logo">Eya<span>.</span></a>
        <ul className={`nav-links ${navOpen ? "open" : ""}`}>
          {navItems.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={closeNav} className={active === n.href.slice(1) ? "active" : ""}>{n.label}</a>
            </li>
          ))}
          <li><a href="#contact" onClick={closeNav} className="btn-nav">Let's Work Together</a></li>
        </ul>
        <button className={`hamburger ${navOpen ? "open" : ""}`} onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <span className="hero-badge">Business Development • Marketing • Sales</span>
          <h1 className="hero-title">Driving Business Growth<br />in the <em>Digital & IT</em> World</h1>
          <p className="hero-sub">Helping companies find opportunities, build partnerships and scale their impact through smart digital solutions.</p>
          <div className="hero-btns">
           <a href="#work" className="btn-primary"
  onClick={() => trackEvent('click_cta_workview', {
    button_name: 'View My Work',
    section: 'hero',
    page_location: '/'
  })}>
  View My Work →
</a>
            <a href="#contact" className="btn-outline"
  onClick={() => trackEvent('click_cta_contact', {
    button_name: 'Contact Me',
    section: 'hero',
    page_location: '/'
  })}>
  Contact Me
</a>
          </div>
        </div>
        <div className="hero-scroll">Scroll
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div>
            <span className="section-tag reveal">About Me</span>
            <h2 className="section-title reveal reveal-delay-1">Connecting Technology<br />with Business Needs</h2>
            <div className="divider reveal reveal-delay-2" />
            <div className="about-text reveal reveal-delay-2">
              <p>I am a Business Developer in an IT company passionate about connecting technology with real business needs. With experience in sales, marketing and client relationship management, I focus on creating value, identifying opportunities and building long-term partnerships.</p>
              <p>My mission is simple: help companies grow through smart digital solutions and strategic collaboration.</p>
            </div>
            <ul className="about-bullets reveal reveal-delay-3">
              <li>Business Development & Lead Generation</li>
              <li>B2B Sales & Client Relationship</li>
              <li>Marketing & Growth Strategy</li>
              <li>IT Services & Digital Solutions</li>
              <li>CRM Management & Reporting</li>
              <li>International Prospecting</li>
            </ul>
          </div>
          <div className="about-visual reveal reveal-delay-2">
            <div className="about-card">
              <div className="about-avatar">EJ</div>
              <h3>Eya Jbeli</h3>
              <p className="role">Business Developer — IT Services & Digital Solutions</p>
              <p className="loc">Based in Sousse, Tunisia · Open to international opportunities</p>
              <div className="about-stats">
                <div className="stat"><div className="stat-num">3+</div><div className="stat-label">Years Exp.</div></div>
                <div className="stat"><div className="stat-num">4</div><div className="stat-label">Roles</div></div>
                <div className="stat"><div className="stat-num">3</div><div className="stat-label">Languages</div></div>
              </div>
            </div>
            <div className="accent-block" />
          </div>
        </div>
      </section>

      {/* CV */}
      <section id="cv">
        <div className="cv-inner max-1100">
          <span className="section-tag reveal">My Resume</span>
          <h2 className="section-title reveal reveal-delay-1">Professional Journey</h2>
          <p className="section-sub reveal reveal-delay-2" style={{ margin: "0 auto 2.5rem" }}>Discover my professional journey, experience and achievements in business development, sales and marketing.</p>
          <a href="#contact" className="btn-primary reveal reveal-delay-3"
  onClick={() => trackEvent('click_cta_download', {
    button_name: 'Download Resume',
    section: 'cv',
    page_location: '/'
  })}>
  ↓ Download Resume (PDF)
</a>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="max-1100">
          <span className="section-tag reveal">My Work</span>
          <h2 className="section-title reveal reveal-delay-1">Projects & Achievements</h2>
          <div className="divider reveal reveal-delay-2" />
        </div>
        <div className="work-grid">
          {workItems.map((w, i) => (
            <div key={w.title} className={`work-card reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="work-tag">{w.tag}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <a href="#contact" className="work-link">View details →</a>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="max-1100">
          <span className="section-tag reveal">What I Can Do</span>
          <h2 className="section-title reveal reveal-delay-1">My Expertise</h2>
          <div className="divider reveal reveal-delay-2" />
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={s.title} className={`skill-col reveal reveal-delay-${i + 1}`}>
              <div className="skill-col-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <ul className="skill-list">
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div className="max-1100">
          <span className="section-tag reveal">Testimonials</span>
          <h2 className="section-title reveal reveal-delay-1">What People Say</h2>
          <div className="divider reveal reveal-delay-2" />
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testi-card reveal reveal-delay-${i + 1}`}>
              <div className="quote-mark">"</div>
              <div className="stars">★★★★★</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div>
            <span className="section-tag reveal">Contact Me</span>
            <h2 className="section-title reveal reveal-delay-1">Let's Build Something<br />Great Together</h2>
            <p className="section-sub reveal reveal-delay-2">Open to new opportunities, partnerships and collaborations. Feel free to reach out.</p>
            <div className="contact-items">
              <a href="mailto:jbely.eyaa@gmail.com" className="contact-item reveal reveal-delay-1">
                <div className="contact-icon">✉</div>
                <div><div className="contact-label">Email</div><div className="contact-value">jbely.eyaa@gmail.com</div></div>
              </a>
              <a href="tel:+21655835212" className="contact-item reveal reveal-delay-2">
                <div className="contact-icon">☏</div>
                <div><div className="contact-label">Phone</div><div className="contact-value">+216 55 835 212</div></div>
              </a>
              <a href="https://linkedin.com/in/eya-jbeli" target="_blank" rel="noreferrer" className="contact-item reveal reveal-delay-3">
                <div className="contact-icon">in</div>
                <div><div className="contact-label">LinkedIn</div><div className="contact-value">linkedin.com/in/eya-jbeli</div></div>
              </a>
              <div className="contact-item reveal reveal-delay-4">
                <div className="contact-icon">◎</div>
                <div><div className="contact-label">Location</div><div className="contact-value">Sousse, Tunisia</div></div>
              </div>
            </div>
          </div>
          <div className="contact-right reveal reveal-delay-2">
            <h3>Ready to grow your <span>business together?</span></h3>
            <p>Whether you need a business development expert, a strategic marketing partner, or someone who can bridge IT capabilities with real client value — let's talk.</p>
            <a href="mailto:jbely.eyaa@gmail.com" className="btn-primary"
  onClick={() => trackEvent('click_cta_mail', {
    button_name: 'Send Email',
    section: 'contact',
    page_location: '/'
  })}>
  ✉ Send Email
</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-name">Eya<span>.</span> Jbeli</div>
        <div className="footer-copy">© 2026 Eya Jbeli. All rights reserved.</div>
        <div className="footer-social">
         <a href="https://linkedin.com/in/eya-jbeli" 
  target="_blank"
  rel="noreferrer"
  title="LinkedIn"
  onClick={() => trackEvent('click_social', {
    platform: 'LinkedIn',
    section: 'footer',
    page_location: '/'
  })}>
  in
</a>
          <a href="mailto:jbely.eyaa@gmail.com" title="Email">✉</a>
          <a href="tel:+21655835212" title="Phone">☏</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
