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
      "Locate Teaching Hospitals, Primary Health Centres (PHCs), PCN pharmacies, and NHIA-accredited clinics by State and LGA.",
    color: "teal",
    href: "/find-healthcare",
    actionText: "Search Facilities",
  },
  {
    icon: "bi-bell",
    title: "NCDC & Health Alerts",
    description:
      "Track verified advisories on Cholera, Lassa Fever, Malaria, Diphtheria, and NAFDAC batch safety recalls across Nigeria.",
    color: "orange",
    href: "/alerts",
    actionText: "View Advisories",
  },
  {
    icon: "bi-box-seam",
    title: "Supply Chain & Logistics",
    description:
      "Digitize facility stock requests, central medical store allocations, shipment tracking, and verified proof of delivery.",
    color: "blue",
    href: "/pro/supply-chain",
    actionText: "Open Command Portal",
  },
  {
    icon: "bi-heart-pulse",
    title: "Health Education & Map",
    description:
      "Browse Nigeria-focused disease prevention guides, first aid protocols, and the interactive State-by-State Health Map.",
    color: "purple",
    href: "/health-map",
    actionText: "Explore Health Map",
  },
];

const steps = [
  {
    number: "01",
    title: "Health Signal & Discovery",
    description:
      "Citizens locate verified hospitals and PHCs across States and LGAs, while officers monitor NCDC alerts and facility indicators.",
  },
  {
    number: "02",
    title: "Request & Allocation",
    description:
      "Facilities detect stock shortages and submit digital supply requests; Central Medical Stores review and allocate available stock.",
  },
  {
    number: "03",
    title: "Logistics & Coordinated Response",
    description:
      "Logistics providers deliver supplies with digital Proof of Delivery while public health teams coordinate incident response tasks.",
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
                NIGERIA PUBLIC HEALTH &amp; SUPPLY CHAIN PLATFORM
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1>
                From health signals
                <br />
                to coordinated <span>action.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="hero-description">
                Connecting Nigerian citizens, Primary Health Centres, teaching hospitals,
                medical warehouses, and emergency response teams through one unified
                public health &amp; medical supply-chain ecosystem.
              </p>
            </Reveal>

            {/* Quick Facility Search Box */}
            <Reveal delay={0.25}>
              <form onSubmit={handleHeroSearch} className="hero-search-box">
                <div className="search-input-wrapper">
                  <i className="bi bi-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search Nigerian facilities, States, LGAs (e.g. LUTH, Abuja, Surulere, Pediatrics)..."
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
                  Find Healthcare Near You
                  <i className="bi bi-arrow-right"></i>
                </Link>

                <Link to="/pro" className="button button-outline">
                  <i className="bi bi-grid-1x2-fill me-1 text-primary"></i>
                  Professional Command Portal
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="hero-note">
                <span className="hero-note-icon">
                  <i className="bi bi-shield-check"></i>
                </span>
                <p>
                  <strong>Nigeria-First Infrastructure · 36 States &amp; FCT.</strong>
                  <br />
                  Free public health discovery for citizens; end-to-end supply &amp; incident coordination for organizations.
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
                  <span></span> NIGERIA ECOSYSTEM ACTIVE
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
                  <span>INTELLIGENCE · SUPPLY · RESPONSE</span>
                  <h3>360° Public Health Layer</h3>
                </div>

                <Link to="/health-map" className="art-arrow" aria-label="Explore Nigeria Health Map">
                  <i className="bi bi-arrow-up-right"></i>
                </Link>
              </div>
            </div>

            <div className="floating-badge badge-alerts">
              <span className="badge-icon amber">
                <i className="bi bi-bell-fill"></i>
              </span>
              <span>
                <strong>NCDC Alerts</strong>
                <small>Dial 6232 / 112</small>
              </span>
            </div>

            <div className="floating-badge badge-care">
              <span className="badge-icon mint">
                <i className="bi bi-hospital-fill"></i>
              </span>
              <span>
                <strong>State &amp; LGA Network</strong>
                <small>Hospitals, PHCs &amp; Depots</small>
              </span>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="container hero-bottom-inner">
            <span>PROVIDE &amp; UNDERSTAND</span>
            <span className="bottom-line"></span>
            <span>LOCATE &amp; SUPPLY</span>
            <span className="bottom-line"></span>
            <span>COORDINATE RESPONSE</span>
          </div>
        </div>
      </section>

      {/* Breaking Surveillance Alerts Preview Section */}
      <section className="home-alerts-strip">
        <div className="container">
          <div className="strip-header">
            <div className="strip-title-group">
              <span className="section-eyebrow">NCDC &amp; NAFDAC SURVEILLANCE</span>
              <h2>Active Nigeria Public Health Alerts</h2>
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
                  <span className="alert-category">{alert.state} · {alert.category}</span>
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
                  Public health &amp; supply chains,
                  <br />
                  <span className="heading-accent">connected.</span>
                </h2>
              </div>

              <p>
                Built for Nigeria&apos;s health ecosystem: citizens discover care without friction,
                while facilities, warehouses, logistics providers, and public health officers
                coordinate inventory and outbreak response in real time.
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
                <strong>State → LGA → Facility</strong>
                <small>Teaching Hospitals, PHCs &amp; Labs</small>
              </span>
            </div>

            <div className="finder-mini-card finder-mini-bottom">
              <i className="bi bi-heart-pulse-fill"></i>
              <span>
                <strong>NHIA &amp; HMO Ready</strong>
                <small>Verify accepted schemes &amp; 24/7 ER</small>
              </span>
            </div>
          </div>

          <div className="finder-content">
            <Reveal>
              <span className="section-eyebrow">CITIZEN HEALTHCARE ACCESS</span>

              <h2>
                Finding verified care in Nigeria
                <br />
                should be <span>simpler.</span>
              </h2>

              <p>
                Filter by State and Local Government Area (LGA) to locate federal teaching
                hospitals, Primary Health Centres (PHCs), PCN-accredited pharmacies, and
                ISO diagnostic labs—no account required.
              </p>

              <ul className="check-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Filter by State, LGA, facility tier, and 24/7 emergency availability
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Check NHIA, LASHMA (Ilera Eko), FHSS, and private HMO acceptance
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Direct access to 112 National Emergency and NCDC 6232 hotlines
                </li>
              </ul>

              <div className="finder-actions d-flex flex-wrap gap-2">
                <Link to="/find-healthcare" className="button button-primary">
                  Launch Healthcare Directory
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/health-map" className="button button-outline">
                  <i className="bi bi-map me-1"></i> View Health Map
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Featured Facilities Cards */}
        <div className="container mt-5">
          <div className="featured-facilities-preview">
            <div className="featured-header">
              <h4>Verified Nigerian Healthcare Centres</h4>
              <Link to="/find-healthcare" className="link-subtle">
                Browse full directory <i className="bi bi-chevron-right"></i>
              </Link>
            </div>
            <div className="facility-preview-row">
              {featuredFacilities.map((facility) => (
                <div key={facility.id} className="preview-facility-card">
                  <div className="pfc-top">
                    <span className="pfc-type">{facility.state} · {facility.lga} LGA</span>
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
                      Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Platform Operational Callout */}
      <section className="section awareness-section" id="professional-platform">
        <div className="container awareness-panel">
          <div className="awareness-content">
            <Reveal>
              <span className="section-eyebrow light-eyebrow">
                PROFESSIONAL COMMAND PLATFORM
              </span>

              <h2>
                Need → Request → Allocate
                <br />
                → Deliver → Verify.
              </h2>

              <p>
                Built for Hospital Supply Officers, State Medical Warehouses, Logistics
                Providers, and NCDC Public Health Officers. Track inventory, prevent
                stockouts, dispatch shipments with digital Proof of Delivery, and coordinate
                incident response.
              </p>

              <div className="awareness-actions">
                <Link to="/pro" className="button button-white">
                  Launch Command Dashboard
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/signin" className="button button-transparent-light">
                  <i className="bi bi-person-badge me-1"></i>
                  Switch Role / Demo Login
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
                  <i className="bi bi-truck"></i>
                </span>
                <span>END-TO-END TRACEABILITY</span>
              </div>

              <h3>Zero blind spots in medical supply.</h3>

              <p>
                Every supply request, warehouse allocation, shipment, and incident action
                is tracked with role-based permissions and immutable audit logs.
              </p>

              <div className="awareness-card-footer">
                <i className="bi bi-shield-check"></i>
                <span>Inventory · Logistics · Incidents · Audit</span>
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
              <span className="section-eyebrow">FOR NIGERIAN ORGANISATIONS</span>

              <h2>
                Register your hospital, PHC,
                <br className="desktop-break" /> warehouse, or logistics fleet.
              </h2>

              <p>
                Onboard your health facility, Central Medical Store, PCN pharmacy, or
                medical logistics company into the PULSE360 multi-tenant ecosystem.
              </p>

              <div className="company-categories">
                <span>Teaching &amp; General Hospitals</span>
                <span>Primary Health Centres</span>
                <span>Medical Warehouses</span>
                <span>Logistics Providers</span>
              </div>
            </Reveal>
          </div>

          <div className="company-actions">
            <Link to="/register-company" className="button button-primary">
              Register Organisation
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link to="/register-company#guidelines" className="company-learn">
              HEFAMAA / MDCN / PCN verification
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-section" id="about">
        <div className="container">
          <Reveal>
            <div className="center-heading">
              <span className="section-eyebrow">CORE WORKFLOW</span>

              <h2>
                Connecting intelligence
                <br />
                to <span className="heading-accent">coordinated action.</span>
              </h2>

              <p>
                PULSE360 bridges public health visibility with medical supply-chain
                execution across Nigeria.
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
              HEALTHCARE INFRASTRUCTURE FOR NIGERIA
            </span>

            <h2>
              Ready to explore the platform
              <br />
              or command operations?
            </h2>
          </div>

          <div className="get-started-btns">
            <Link to="/pro" className="button button-white">
              Open Command Portal
              <i className="bi bi-grid-1x2-fill ms-2"></i>
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
