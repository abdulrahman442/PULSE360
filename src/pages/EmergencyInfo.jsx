import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { NIGERIA_EMERGENCY_LINES } from "../data/nigeriaGeo";
import { healthcareFacilities } from "../data/facilities";

function EmergencyInfo() {
  const emergencyFacilities = healthcareFacilities.filter((f) => f.isOpen24x7 && (f.type === "Hospital" || f.type === "Emergency"));

  return (
    <div className="emergency-info-page">
      {/* Critical Red Banner */}
      <section className="emergency-hero-banner">
        <div className="container">
          <Reveal>
            <div className="emergency-hero-grid">
              <div>
                <span className="emergency-pill-tag">
                  <i className="bi bi-lightning-charge-fill me-1"></i>
                  NIGERIA EMERGENCY RESPONSE DIRECTORY
                </span>
                <h1>Immediate Medical &amp; Public Health Emergency Numbers</h1>
                <p className="emergency-hero-lead">
                  In a life-threatening emergency anywhere in Nigeria, dial <strong>112</strong> (toll-free on all networks) or contact the designated federal &amp; state response desks below.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a href="tel:112" className="button btn-emergency-solid">
                    <i className="bi bi-telephone-fill me-2"></i>
                    Call 112 (National Emergency)
                  </a>
                  <a href="tel:6232" className="button button-outline" style={{ background: "#fff" }}>
                    <i className="bi bi-broadcast me-2 text-danger"></i>
                    Call 6232 (NCDC Outbreak Line)
                  </a>
                </div>
              </div>

              <div className="emergency-triage-card">
                <h4><i className="bi bi-exclamation-octagon-fill text-danger me-2"></i>When to Seek Immediate ER Care</h4>
                <ul>
                  <li>Unconsciousness, fainting, or difficulty breathing</li>
                  <li>Sudden chest pain, facial drooping, or slurred speech</li>
                  <li>Severe bleeding, road traffic trauma, or deep burns</li>
                  <li>Profuse watery diarrhea with inability to keep fluids down</li>
                  <li>High fever with convulsions or bleeding gums/nose</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Emergency Hotlines Grid */}
      <section className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="section-eyebrow">VERIFIED TOLL-FREE &amp; DISPATCH LINES</span>
            <h2 style={{ fontSize: "26px", fontWeight: 800 }}>National &amp; State Emergency Helplines</h2>
          </div>

          <div className="emergency-lines-grid">
            {NIGERIA_EMERGENCY_LINES.map((line) => (
              <div key={line.name} className="emergency-line-card">
                <div className="elc-top">
                  <span className="elc-agency">{line.agency}</span>
                  <span className="elc-avail">{line.available}</span>
                </div>
                <h3>{line.name}</h3>
                <p>{line.description}</p>
                <div className="elc-footer">
                  <div className="elc-number">{line.number}</div>
                  <a href={`tel:${line.number.replace(/[^0-9+]/g, "")}`} className="button button-primary" style={{ minHeight: "38px", fontSize: "12px" }}>
                    <i className="bi bi-telephone-fill me-1"></i> Dial Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Verified Emergency Hospitals */}
      <section className="py-5" style={{ background: "var(--pulse-surface)", borderTop: "1px solid var(--pulse-border)" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
            <div>
              <span className="section-eyebrow">24/7 ACCIDENT &amp; EMERGENCY CENTRES</span>
              <h2 style={{ fontSize: "26px", fontWeight: 800 }} className="mb-0">Verified 24-Hour Trauma &amp; Referral Hospitals</h2>
            </div>
            <Link to="/find-healthcare" className="strip-view-all">
              Search All Facilities <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="facilities-grid-view">
            {emergencyFacilities.map((fac) => (
              <article key={fac.id} className="facility-card">
                <div className="card-top-row">
                  <span className="facility-type-tag type-hospital">{fac.state} · {fac.lga} LGA</span>
                  <span className="badge-247">24/7 OPEN</span>
                </div>
                <h3 className="facility-name">{fac.name}</h3>
                <p className="facility-category">{fac.tier}</p>
                <div className="facility-meta-list">
                  <div className="meta-item">
                    <i className="bi bi-geo-alt-fill text-primary"></i>
                    <span>{fac.address}, {fac.city}</span>
                  </div>
                  <div className="meta-item">
                    <i className="bi bi-telephone-fill text-danger"></i>
                    <strong>Emergency: {fac.emergencyPhone}</strong>
                  </div>
                </div>
                <div className="card-actions-row">
                  <a href={`tel:${fac.phone}`} className="btn-call-facility">
                    <i className="bi bi-telephone"></i> Call
                  </a>
                  <Link to={`/find-healthcare?id=${fac.id}`} className="button button-primary btn-details">
                    View Profile <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmergencyInfo;
