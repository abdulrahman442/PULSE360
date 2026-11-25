import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { getAlertById, getFacilities } from "../services/api";

function AlertDetails() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [nearbyFacilities, setNearbyFacilities] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAlertById(id);
      setAlert(data);
      if (data) {
        // Fetch facilities that might be relevant
        const allFacilities = await getFacilities();
        setNearbyFacilities(allFacilities.slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Retrieving public health advisory...</p>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-exclamation-circle text-danger display-3"></i>
        <h2 className="mt-3">Health Advisory Not Found</h2>
        <p className="text-muted">The alert you requested does not exist or may have been retired.</p>
        <Link to="/alerts" className="button button-primary mt-3">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Health Alerts
        </Link>
      </div>
    );
  }

  return (
    <div className="alert-details-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-strip">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/alerts">Health Alerts</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {alert.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Header for Alert */}
      <section className={`alert-details-hero severity-${alert.severity}`}>
        <div className="container">
          <Reveal>
            <div className="ad-badge-row">
              <span className={`severity-indicator-pill ${alert.severity}`}>
                <i className="bi bi-shield-exclamation me-1"></i>
                {alert.severity.toUpperCase()} PRIORITY
              </span>
              <span className="ad-category">{alert.category}</span>
              <span className="ad-meta">
                <i className="bi bi-calendar-event me-1"></i> Published: {alert.publishedDate}
              </span>
              {alert.updatedDate && (
                <span className="ad-meta">
                  <i className="bi bi-arrow-clockwise me-1"></i> Updated: {alert.updatedDate}
                </span>
              )}
            </div>

            <h1 className="ad-title">{alert.title}</h1>

            <div className="ad-issuing">
              <i className="bi bi-building-check me-2"></i>
              Issuing Agency: <strong>{alert.issuingAgency}</strong>
            </div>

            <div className="ad-action-bar">
              <button onClick={handleShare} className="button button-outline ad-share-btn">
                <i className={`bi ${copied ? "bi-check2" : "bi-share"} me-1`}></i>
                {copied ? "Link Copied to Clipboard!" : "Share Official Advisory"}
              </button>

              <a href={`tel:${alert.emergencyHotline.replace(/[^0-9+]/g, "")}`} className="button button-primary">
                <i className="bi bi-telephone-fill me-1"></i>
                Contact Taskforce
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="ad-main-content py-5">
        <div className="container ad-grid">
          {/* Main Column */}
          <div className="ad-primary-col">
            {/* Executive Summary */}
            <article className="ad-content-block">
              <h3>
                <i className="bi bi-info-circle-fill text-primary me-2"></i>
                Executive Situation Summary
              </h3>
              <p className="lead-summary">{alert.summary}</p>
              <p>{alert.description}</p>
            </article>

            {/* Recognizable Clinical Symptoms */}
            {alert.symptoms && alert.symptoms.length > 0 && (
              <article className="ad-content-block symptoms-block">
                <h3>
                  <i className="bi bi-activity text-danger me-2"></i>
                  Clinical Symptoms to Watch For
                </h3>
                <p>If you or members of your community exhibit any of the following symptoms, follow isolation and treatment protocols:</p>
                <div className="symptoms-checklist">
                  {alert.symptoms.map((symptom, idx) => (
                    <div key={idx} className="symptom-item">
                      <i className="bi bi-exclamation-triangle-fill symptom-icon"></i>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* Actionable Prevention Protocols */}
            {alert.preventionSteps && alert.preventionSteps.length > 0 && (
              <article className="ad-content-block prevention-block">
                <h3>
                  <i className="bi bi-shield-check text-success me-2"></i>
                  Recommended Preventative Measures
                </h3>
                <p>Public health authorities mandate strict adherence to these measures to interrupt community transmission:</p>
                <div className="prevention-steps-list">
                  {alert.preventionSteps.map((step, idx) => (
                    <div key={idx} className="step-card-item">
                      <span className="step-num">{idx + 1}</span>
                      <p className="step-text">{step}</p>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* When to Seek Care Callout */}
            {alert.whenToSeekCare && (
              <div className="seek-care-callout">
                <div className="seek-care-header">
                  <i className="bi bi-hospital-fill text-danger me-2"></i>
                  <h4>When to Seek Immediate Medical Attention</h4>
                </div>
                <p>{alert.whenToSeekCare}</p>
                <div className="emergency-dispatch-note">
                  <i className="bi bi-telephone-fill me-1"></i>
                  Nigeria emergency dispatch: <strong>112</strong> · NCDC Surveillance Line: <strong>6232</strong> (Toll-Free, 24/7)
                </div>
              </div>
            )}

            {/* Official Updates Timeline */}
            {alert.updatesTimeline && alert.updatesTimeline.length > 0 && (
              <article className="ad-content-block timeline-block mt-4">
                <h3>
                  <i className="bi bi-clock-history text-info me-2"></i>
                  Surveillance & Operations Log
                </h3>
                <div className="ad-timeline">
                  {alert.updatesTimeline.map((item, idx) => (
                    <div key={idx} className="timeline-node">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <span className="timeline-date">{item.date}</span>
                        <p className="timeline-text">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          {/* Sidebar Column */}
          <aside className="ad-sidebar-col">
            {/* Geographic Coverage */}
            <div className="ad-sidebar-card">
              <h4>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                Geographic Scope
              </h4>
              <div className="region-name-display">{alert.region}</div>
              <p className="small text-muted mb-2">Municipalities & districts affected:</p>
              <div className="ad-areas-tags">
                {alert.affectedAreas.map((area) => (
                  <span key={area} className="ad-area-pill">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Taskforce Contact */}
            <div className="ad-sidebar-card hotline-card">
              <h4>
                <i className="bi bi-headset text-primary me-2"></i>
                Direct Incident Hotline
              </h4>
              <p className="small">Dedicated response line for this specific advisory:</p>
              <div className="taskforce-phone-box">
                {alert.emergencyHotline}
              </div>
              <a
                href={`tel:${alert.emergencyHotline.replace(/[^0-9+]/g, "")}`}
                className="button button-primary w-100 mt-2"
              >
                Call Hotline Now
              </a>
            </div>

            {/* Nearby Verified Healthcare Facilities */}
            <div className="ad-sidebar-card facilities-sidebar-card">
              <h4>
                <i className="bi bi-hospital text-info me-2"></i>
                Authorized Testing & Care
              </h4>
              <p className="small text-muted">
                Designated healthcare centers prepared with triage & response protocols:
              </p>
              <div className="sidebar-facilities-list">
                {nearbyFacilities.map((fac) => (
                  <div key={fac.id} className="sidebar-facility-mini">
                    <h6>{fac.name}</h6>
                    <span className="small text-muted">
                      <i className="bi bi-geo-alt me-1"></i> {fac.city}
                    </span>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="badge bg-success-soft small">
                        {fac.isOpen24x7 ? "24/7 Open" : fac.hours}
                      </span>
                      <Link to={`/find-healthcare?id=${fac.id}`} className="small text-primary fw-bold">
                        View <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/find-healthcare" className="btn-view-all-facilities">
                Search All Healthcare Facilities <i className="bi bi-chevron-right ms-1"></i>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default AlertDetails;
