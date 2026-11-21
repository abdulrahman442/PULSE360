import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { healthAlerts } from "../data/alerts";
import { healthcareFacilities } from "../data/facilities";

const services = [
  {
    icon: "bi-hospital",
    title: "Healthcare Finder",
    description:
      "Discover hospitals, emergency clinics, pharmacies, and diagnostic laboratories near you with verified operating hours.",
    color: "teal",
    href: "/find-healthcare",
    actionText: "Search Facilities",
  },
  {
    icon: "bi-bell",
    title: "Health Alerts",
    description:
      "Stay informed about public health advisories, seasonal disease outbreaks, pharmaceutical recalls, and emergency updates.",
    color: "orange",
    href: "/alerts",
    actionText: "View Advisories",
  },
  {
    icon: "bi-capsule",
    title: "Medicines & Supplies",
    description:
      "Connect with accredited pharmaceutical suppliers, medical equipment distributors, and verified logistics partners.",
    color: "blue",
    href: "/register-company",
    actionText: "Explore Suppliers",
  },
  {
    icon: "bi-heart-pulse",
    title: "Health Education",
    description:
      "Access certified public health guidance, interactive first aid protocols, and disease prevention education.",
    color: "purple",
    href: "/awareness",
    actionText: "Learn More",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover Facilities",
    description:
      "Find verified healthcare providers, 24/7 emergency rooms, and pharmacies suited to your immediate needs.",
  },
  {
    number: "02",
    title: "Stay Informed",
    description:
      "Receive real-time surveillance alerts, vector warnings, and clean water guidelines from public health authorities.",
  },
  {
    number: "03",
    title: "Take Decisive Action",
    description:
      "Use verified medical information to protect your loved ones, seek prompt care, and build resilient communities.",
  },
];

function Home() {
  const [heroSearch, setHeroSearch] = useState("");
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/find-healthcare?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate("/find-healthcare");
    }
  };

  const recentAlerts = healthAlerts.slice(0, 3);
  const featuredFacilities = healthcareFacilities.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-content">
            <Reveal direction="down">
              <div className="eyebrow">
                <span className="eyebrow-dot"></span>
                HEALTHCARE. INFORMATION. CONNECTION.
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1>
                Better health
                <br />
                starts with <span>access.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="hero-description">
                Your connection to healthcare facilities, real-time public health
                surveillance advisories, and essential medical resources—all through one
                unified public health network.
              </p>
            </Reveal>

            {/* Quick Facility Search Box */}
            <Reveal delay={0.25}>
              <form onSubmit={handleHeroSearch} className="hero-search-box">
                <div className="search-input-wrapper">
                  <i className="bi bi-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search hospitals, clinics, or specialties (e.g. Pediatrics, 24/7 Emergency)..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="hero-search-input"
                  />
                </div>
                <button type="submit" className="button button-primary hero-search-btn">
                  <span>Find Care</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="hero-actions">
                <Link to="/find-healthcare" className="button button-primary">
                  Explore All Facilities
                  <i className="bi bi-arrow-right"></i>
                </Link>

                <Link to="/alerts" className="button button-outline">
                  <i className="bi bi-bell-fill me-1 text-danger"></i>
                  Active Alerts ({healthAlerts.length})
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="hero-note">
                <span className="hero-note-icon">
                  <i className="bi bi-shield-check"></i>
                </span>
                <p>
                  <strong>Information that empowers.</strong>
                  <br />
                  Connecting citizens, healthcare professionals, and response teams in real time.
                </p>
              </div>
            </Reveal>
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

                <Link to="/find-healthcare" className="art-arrow" aria-label="Find Healthcare">
                  <i className="bi bi-arrow-up-right"></i>
                </Link>
              </div>
            </div>

            <div className="floating-badge badge-alerts">
              <span className="badge-icon amber">
                <i className="bi bi-bell-fill"></i>
              </span>
              <span>
                <strong>Public Alerts</strong>
                <small>Real-time surveillance</small>
              </span>
            </div>

            <div className="floating-badge badge-care">
              <span className="badge-icon mint">
                <i className="bi bi-hospital-fill"></i>
              </span>
              <span>
                <strong>Healthcare Access</strong>
                <small>Find verified facilities</small>
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

      {/* Breaking Surveillance Alerts Preview Section */}
      <section className="home-alerts-strip">
        <div className="container">
          <div className="strip-header">
            <div className="strip-title-group">
              <span className="section-eyebrow">DISEASE SURVEILLANCE & ADVISORIES</span>
              <h2>Active Public Health Alerts</h2>
            </div>
            <Link to="/alerts" className="strip-view-all">
              View All Advisories ({healthAlerts.length})
              <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="alerts-preview-grid">
            {recentAlerts.map((alert) => (
              <article key={alert.id} className={`home-alert-card severity-${alert.severity}`}>
                <div className="alert-card-header">
                  <span className={`severity-tag ${alert.severity}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="alert-category">{alert.category}</span>
                </div>
                <h3 className="alert-title">
                  <Link to={`/alerts/${alert.id}`}>{alert.title}</Link>
                </h3>
                <p className="alert-summary">{alert.summary}</p>
                <div className="alert-card-footer">
                  <span className="alert-region">
                    <i className="bi bi-geo-alt"></i> {alert.region}
                  </span>
                  <Link to={`/alerts/${alert.id}`} className="alert-read-link">
                    Read Guidance <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Platform Services */}
      <section className="section services-section" id="services">
        <div className="container">
          <Reveal>
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
                essential public health directories, verified supplies, and epidemiological
                guidance together in one accessible space.
              </p>
            </div>
          </Reveal>

          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.1}>
                <article className="service-card">
                  <div className={`service-icon ${service.color}`}>
                    <i className={`bi ${service.icon}`}></i>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <Link to={service.href} className="service-link">
                    {service.actionText} <i className="bi bi-arrow-right"></i>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight: Healthcare Finder Feature */}
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
                <strong>Healthcare Facilities</strong>
                <small>Over 450+ verified locations</small>
              </span>
            </div>

            <div className="finder-mini-card finder-mini-bottom">
              <i className="bi bi-heart-pulse-fill"></i>
              <span>
                <strong>24/7 Emergency Care</strong>
                <small>Instant triage & routing</small>
              </span>
            </div>
          </div>

          <div className="finder-content">
            <Reveal>
              <span className="section-eyebrow">HEALTHCARE ACCESS</span>

              <h2>
                Finding healthcare
                <br />
                should be <span>simpler.</span>
              </h2>

              <p>
                Discover general hospitals, specialized clinics, 24/7 urgent care
                units, and pharmacies right in your neighborhood. Filter by accepted
                health insurance, available trauma beds, and emergency status.
              </p>

              <ul className="check-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Discover verified 24/7 trauma & general hospital facilities
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Search by specialty: Pediatrics, Cardiology, Maternity & Urgent Care
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Filter by accepted insurance and immediate bed capacity
                </li>
              </ul>

              <div className="finder-actions">
                <Link to="/find-healthcare" className="button button-primary">
                  Launch Healthcare Directory
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Featured Facilities Cards */}
        <div className="container mt-5">
          <div className="featured-facilities-preview">
            <div className="featured-header">
              <h4>Verified Regional Healthcare Centers</h4>
              <Link to="/find-healthcare" className="link-subtle">
                Browse full directory <i className="bi bi-chevron-right"></i>
              </Link>
            </div>
            <div className="facility-preview-row">
              {featuredFacilities.map((facility) => (
                <div key={facility.id} className="preview-facility-card">
                  <div className="pfc-top">
                    <span className="pfc-type">{facility.type}</span>
                    {facility.isOpen24x7 && <span className="pfc-badge-247">24/7 OPEN</span>}
                  </div>
                  <h5>{facility.name}</h5>
                  <p className="pfc-addr">
                    <i className="bi bi-geo-alt"></i> {facility.address}, {facility.city}
                  </p>
                  <div className="pfc-footer">
                    <span className="pfc-rating">
                      <i className="bi bi-star-fill text-warning"></i> {facility.rating} ({facility.reviewCount})
                    </span>
                    <Link to={`/find-healthcare?id=${facility.id}`} className="pfc-btn">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health Awareness & Education Banner */}
      <section className="section awareness-section" id="awareness">
        <div className="container awareness-panel">
          <div className="awareness-content">
            <Reveal>
              <span className="section-eyebrow light-eyebrow">
                PUBLIC HEALTH AWARENESS
              </span>

              <h2>
                Stay informed.
                <br />
                Stay prepared.
              </h2>

              <p>
                Access clinical guidance, interactive first aid protocols (CPR, Choking, Severe Bleeding), and preventative habits that save lives before emergency teams arrive.
              </p>

              <div className="awareness-actions">
                <Link to="/awareness" className="button button-white">
                  Explore Health Knowledge Library
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/awareness#first-aid" className="button button-transparent-light">
                  <i className="bi bi-heart-pulse-fill me-1"></i>
                  First Aid Protocols
                </Link>
              </div>
            </Reveal>
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
                Follow evidence-based guidelines verified by recognized public health
                authorities and certified medical professionals.
              </p>

              <div className="awareness-card-footer">
                <i className="bi bi-shield-check"></i>
                <span>Awareness · Prevention · Preparedness</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Organisations & Providers Section */}
      <section className="section company-section" id="companies">
        <div className="container company-panel">
          <div className="company-icon">
            <i className="bi bi-buildings-fill"></i>
          </div>

          <div className="company-copy">
            <Reveal>
              <span className="section-eyebrow">FOR ORGANISATIONS</span>

              <h2>
                Are you a healthcare provider
                <br className="desktop-break" /> or medical supplier?
              </h2>

              <p>
                Connect your hospital, clinic, pharmacy, or diagnostic laboratory to
                PULSE360. Streamline patient discovery, broadcast service availability,
                and collaborate with national public health networks.
              </p>

              <div className="company-categories">
                <span>Hospitals & clinics</span>
                <span>Pharmacies</span>
                <span>Medical suppliers</span>
                <span>Diagnostic Labs</span>
              </div>
            </Reveal>
          </div>

          <div className="company-actions">
            <Link to="/register-company" className="button button-primary">
              Register Your Organisation
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link to="/register-company#guidelines" className="company-learn">
              Learn about verification
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-section" id="about">
        <div className="container">
          <Reveal>
            <div className="center-heading">
              <span className="section-eyebrow">HOW IT WORKS</span>

              <h2>
                A more connected approach
                <br />
                to <span className="heading-accent">public health.</span>
              </h2>

              <p>
                PULSE360 aims to make healthcare facilities, epidemiological intelligence,
                and emergency resources easier to discover, verify, and use.
              </p>
            </div>
          </Reveal>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.15}>
                <article className="step-card">
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Call To Action */}
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

          <div className="get-started-btns">
            <Link to="/signup" className="button button-white">
              Create Free Account
              <i className="bi bi-person-plus-fill ms-2"></i>
            </Link>
            <Link to="/find-healthcare" className="button button-outline-light">
              Find Facilities Near You
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
