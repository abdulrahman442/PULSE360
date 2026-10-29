
import "./index.css";
import { useState } from "react";
import Reveal from "./components/animations/Reveal";
import { motion } from "motion/react";
const services = [
  {
    icon: "bi-hospital"
    title: "Healthcare Finder",
    description:
      "Discover hospitals, clinics, and healthcare facilities to help you find the care you need.",
    color: "teal",
    href: "#healthcare",
  },
  {
    icon: "bi-bell",
    title: "Health Alerts",
    description:
      "Stay informed about public health advisories, disease outbreaks, and emergency updates.",
    color: "orange",
    href: "#alerts",
  },
  {
    icon: "bi-capsule",
    title: "Medicines & Supplies",
    description:
      "Explore essential medicines, medical equipment, and healthcare supply resources.",
    color: "blue",
    href: "#companies",
  },
  {
    icon: "bi-heart-pulse",
    title: "Health Education",
    description:
      "Access useful health information that supports informed decisions and healthier communities.",
    color: "purple",
    href: "#awareness",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Find healthcare facilities, essential resources, and reliable health information.",
  },
  {
    number: "02",
    title: "Stay informed",
    description:
      "Explore public health guidance and stay aware of important health developments.",
  },
  {
    number: "03",
    title: "Take action",
    description:
      "Use accessible information to make informed decisions for yourself and your community.",
  },
];

function Brand() {
  return (
    <a href="#home" className="brand" aria-label="PULSE360 homepage">
      <span className="brand-mark">
        <i className="bi bi-heart-pulse-fill" aria-hidden="true"></i>
      </span>

      <span className="brand-copy">
        <span className="brand-name">
          PULSE<span>360</span>
        </span>
        <span className="brand-caption">PUBLIC HEALTH NETWORK</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg pulse-navbar">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand" href="#home" onClick={closeMenu}>
          <span className="brand-icon">
            <i className="bi bi-heart-pulse-fill"></i>
          </span>

          <span className="brand-name">
            PULSE<span>360</span>
          </span>
        </a>

        {/* Hamburger button: visible on tablet and mobile */}
        <button
          className={`navbar-toggler ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="pulseNavbarMenu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Collapsible navigation */}
        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
          id="pulseNavbarMenu"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home" onClick={closeMenu}>
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#services" onClick={closeMenu}>
                Services
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#healthcare-finder"
                onClick={closeMenu}
              >
                Find Healthcare
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#health-awareness"
                onClick={closeMenu}
              >
                Health Awareness
              </a>
            </li>
          </ul>

          {/* Authentication buttons */}
          <div className="navbar-actions">
            <a
              href="#sign-in"
              className="btn btn-signin"
              onClick={closeMenu}
            >
              Sign In
            </a>

            <a
              href="#get-started"
              className="btn btn-get-started"
              onClick={closeMenu}
            >
              Get Started
              <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">  
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            HEALTHCARE. INFORMATION. CONNECTION.
          </div>

          <h1>
            Better health
            <br />
            starts with <span>access.</span>
          </h1>

          <p className="hero-description">
            Your connection to healthcare facilities, public health
            information, and essential medical resources—all through one
            connected platform.
          </p>

          <div className="hero-actions">
            <a href="#services" className="button button-primary">
              Explore the Platform
              <i className="bi bi-arrow-right"></i>
            </a>

            <a href="#about" className="button button-outline">
              Discover how it works
            </a>
          </div>

          <div className="hero-note">
            <span className="hero-note-icon">
              <i className="bi bi-shield-check"></i>
            </span>
            <p>
              <strong>Information that empowers.</strong>
              <br />
              Designed to connect communities with essential health resources.
            </p>
          </div>
        </div>

        <div className="hero-art" aria-label="Illustration of connected healthcare services">
          <div className="art-circle art-circle-one"></div>
          <div className="art-circle art-circle-two"></div>

          <div className="art-card">
            <div className="art-card-header">
              <span className="art-status">
                <span></span> YOUR HEALTH, CONNECTED
              </span>
              <i className="bi bi-three-dots"></i>
            </div>

            <div className="medical-art">
              <div className="medical-ring ring-one"></div>
              <div className="medical-ring ring-two"></div>

              <div className="medical-symbol">
                <i className="bi bi-plus-lg"></i>
              </div>

              <div className="art-icon art-heart">
                <i className="bi bi-heart-pulse-fill"></i>
              </div>

              <div className="art-icon art-shield">
                <i className="bi bi-shield-check"></i>
              </div>

              <div className="art-icon art-hospital">
                <i className="bi bi-hospital"></i>
              </div>
            </div>

            <div className="art-card-footer">
              <div>
                <span>ONE CONNECTED PLATFORM</span>
                <h3>Public health, simplified.</h3>
              </div>

              <span className="art-arrow">
                <i className="bi bi-arrow-up-right"></i>
              </span>
            </div>
          </div>

          <div className="floating-badge badge-alerts">
            <span className="badge-icon amber">
              <i className="bi bi-bell-fill"></i>
            </span>
            <span>
              <strong>Health awareness</strong>
              <small>Stay informed</small>
            </span>
          </div>

          <div className="floating-badge badge-care">
            <span className="badge-icon mint">
              <i className="bi bi-hospital-fill"></i>
            </span>
            <span>
              <strong>Healthcare access</strong>
              <small>Find essential services</small>
            </span>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="container hero-bottom-inner">
          <span>DISCOVER RESOURCES</span>
          <span className="bottom-line"></span>
          <span>STAY INFORMED</span>
          <span className="bottom-line"></span>
          <span>SUPPORT BETTER HEALTH</span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">EXPLORE PULSE360</span>
            <h2>
              Healthcare resources,
              <br />
              <span className="heading-accent">connected.</span>
            </h2>
          </div>

          <p>
            Start with the information or service you need. PULSE360 brings
            important public health resources together in one place.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className={`service-icon ${service.color}`}>
                <i className={`bi ${service.icon}`}></i>
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <a href={service.href} className="service-link">
                Explore service <i className="bi bi-arrow-right"></i>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HealthcareFinder() {
  return (
    <section className="finder-section" id="healthcare">
      <div className="container finder-grid">
        <div className="finder-visual">
          <div className="finder-backdrop"></div>

          <div className="finder-main-icon">
            <i className="bi bi-hospital-fill"></i>
          </div>

          <div className="finder-mini-card finder-mini-top">
            <i className="bi bi-geo-alt-fill"></i>
            <span>
              <strong>Healthcare facilities</strong>
              <small>Discover available services</small>
            </span>
          </div>

          <div className="finder-mini-card finder-mini-bottom">
            <i className="bi bi-heart-pulse-fill"></i>
            <span>
              <strong>Care within reach</strong>
              <small>Find information that matters</small>
            </span>
          </div>
        </div>

        <div className="finder-content">
          <span className="section-eyebrow">HEALTHCARE ACCESS</span>

          <h2>
            Finding healthcare
            <br />
            should be <span>simpler.</span>
          </h2>

          <p>
            Explore a connected approach to discovering hospitals, clinics,
            and other healthcare facilities. Our goal is to make healthcare
            information easier to access and understand.
          </p>

          <ul className="check-list">
            <li>
              <i className="bi bi-check-circle-fill"></i>
              Discover healthcare facilities
            </li>
            <li>
              <i className="bi bi-check-circle-fill"></i>
              Explore available healthcare services
            </li>
            <li>
              <i className="bi bi-check-circle-fill"></i>
              Access useful public health resources
            </li>
          </ul>

          <a href="#get-started" className="button button-primary">
            Explore Healthcare Access
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

function HealthAwareness() {
  return (
    <section className="section awareness-section" id="alerts">
      <div className="container awareness-panel">
        <div className="awareness-content">
          <span className="section-eyebrow light-eyebrow">
            PUBLIC HEALTH AWARENESS
          </span>

          <h2>
            Stay informed.
            <br />
            Stay prepared.
          </h2>

          <p>
            Understanding public health risks and following trusted guidance
            can help communities make informed decisions and prepare for
            emerging health challenges.
          </p>

          <a href="#get-started" className="button button-white">
            Explore Health Resources
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>

        <div className="awareness-visual">
          <div className="awareness-orbit awareness-orbit-one"></div>
          <div className="awareness-orbit awareness-orbit-two"></div>

          <div className="awareness-card">
            <div className="awareness-card-top">
              <span className="awareness-card-icon">
                <i className="bi bi-megaphone-fill"></i>
              </span>
              <span>HEALTH INFORMATION</span>
            </div>

            <h3>Knowledge supports prevention.</h3>

            <p>
              Follow information from recognized public health authorities
              and qualified healthcare professionals.
            </p>

            <div className="awareness-card-footer">
              <i className="bi bi-shield-check"></i>
              <span>Awareness · Prevention · Preparedness</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyRegistration() {
  return (
    <section className="section company-section" id="companies">
      <div className="container company-panel">
        <div className="company-icon">
          <i className="bi bi-buildings-fill"></i>
        </div>

        <div className="company-copy">
          <span className="section-eyebrow">FOR ORGANISATIONS</span>

          <h2>
            Are you a healthcare provider
            <br className="desktop-break" /> or medical supplier?
          </h2>

          <p>
            Connect your organisation to a platform designed to support
            healthcare access, public health information, and essential
            medical supply resources.
          </p>

          <div className="company-categories">
            <span>Hospitals & clinics</span>
            <span>Pharmacies</span>
            <span>Medical suppliers</span>
            <span>Logistics providers</span>
          </div>
        </div>

        <div className="company-actions">
          <a href="#register-company" className="button button-primary">
            Register Your Organisation
            <i className="bi bi-arrow-right"></i>
          </a>

          <a href="#about" className="company-learn">
            Learn about PULSE360
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section how-section" id="about">
      <div className="container">
        <div className="center-heading">
          <span className="section-eyebrow">HOW IT WORKS</span>

          <h2>
            A more connected approach
            <br />
            to <span className="heading-accent">public health.</span>
          </h2>

          <p>
            PULSE360 aims to make healthcare information and essential
            resources easier to discover, understand, and use.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GetStarted() {
  return (
    <section className="get-started-section" id="get-started">
      <div className="container get-started-content">
        <div>
          <span className="section-eyebrow light-eyebrow">
            YOUR CONNECTION TO BETTER HEALTH
          </span>

          <h2>
            Let's build healthier,
            <br />
            better-informed communities.
          </h2>
        </div>

        <a href="#services" className="button button-white">
          Explore PULSE360
          <i className="bi bi-arrow-up-right"></i>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand />

          <p>
            Connecting people with healthcare information, public health
            resources, and essential services.
          </p>

          <span className="footer-tagline">
            Connecting communities. Supporting better health.
          </span>
        </div>

        <div className="footer-column">
          <h3>Platform</h3>
          <a href="#healthcare">Healthcare Finder</a>
          <a href="#alerts">Health Alerts</a>
          <a href="#companies">Medicines & Supplies</a>
          <a href="#services">Health Education</a>
        </div>

        <div className="footer-column">
          <h3>Organisation</h3>
          <a href="#about">About PULSE360</a>
          <a href="#companies">For Healthcare Providers</a>
          <a href="#companies">For Suppliers</a>
          <a href="#about">How It Works</a>
        </div>

        <div className="footer-column">
          <h3>Get Started</h3>
          <a href="#signin">Sign In</a>
          <a href="#get-started">Explore the Platform</a>
          <a href="#alerts">Health Awareness</a>
          <a href="#about">Our Mission</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} PULSE360. All rights reserved.</p>
        <p>Designed to support better access to public health resources.</p>
      </div>
    </footer>
  );
}


function App() {
  return (
    <div className="pulse-app">
      <Navbar />

      <main>
        <Reveal>
          <Hero />
        </Reveal>

        <Reveal delay={0.1}>
          <Services />
        </Reveal>

        <Reveal delay={0.1}>
          <HealthcareFinder />
        </Reveal>

        <Reveal delay={0.1}>
          <HealthAwareness />
        </Reveal>

        <Reveal delay={0.1}>
          <CompanyRegistration />
        </Reveal>

        <Reveal delay={0.1}>
          <HowItWorks />
        </Reveal>

        <Reveal delay={0.1}>
          <GetStarted />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}


export default App;