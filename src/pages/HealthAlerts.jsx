import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { getAlerts, subscribeToAlerts } from "../services/api";

const SEVERITY_FILTERS = [
  { id: "all", label: "All Alerts", countKey: "all" },
  { id: "critical", label: "Critical Outbreaks", color: "danger" },
  { id: "warning", label: "Warnings & Advisories", color: "warning" },
  { id: "advisory", label: "Environmental & Seasonal", color: "info" },
  { id: "resolved", label: "Resolved", color: "success" },
];

function HealthAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSeverity, setActiveSeverity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal for alert subscription
  const [showSubModal, setShowSubModal] = useState(false);
  const [subEmail, setSubEmail] = useState("");
  const [subPhone, setSubPhone] = useState("");
  const [subRegion, setSubRegion] = useState("All Regions");
  const [subSuccess, setSubSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
      setLoading(false);
    }
    load();
  }, []);

  const counts = useMemo(() => {
    return {
      all: alerts.length,
      critical: alerts.filter((a) => a.severity === "critical").length,
      warning: alerts.filter((a) => a.severity === "warning").length,
      advisory: alerts.filter((a) => a.severity === "advisory").length,
      resolved: alerts.filter((a) => a.severity === "resolved").length,
    };
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      if (activeSeverity !== "all" && alert.severity !== activeSeverity) {
        return false;
      }
      if (selectedCategory !== "all" && alert.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = alert.title.toLowerCase().includes(q);
        const matchesSummary = alert.summary.toLowerCase().includes(q);
        const matchesRegion = alert.region.toLowerCase().includes(q);
        const matchesAreas = alert.affectedAreas?.some((a) => a.toLowerCase().includes(q));
        const matchesSymptoms = alert.symptoms?.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesRegion && !matchesAreas && !matchesSymptoms) {
          return false;
        }
      }
      return true;
    });
  }, [alerts, activeSeverity, selectedCategory, searchQuery]);

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    if (!subEmail) return;
    await subscribeToAlerts({ email: subEmail, phone: subPhone, region: subRegion });
    setSubSuccess(true);
  };

  return (
    <div className="health-alerts-page">
      {/* Header Banner */}
      <section className="alerts-header-banner">
        <div className="container">
          <Reveal>
            <div className="alerts-header-meta">
              <span className="section-eyebrow">EPIDEMIOLOGICAL SURVEILLANCE & EARLY WARNING</span>
              <h1>Public Health Alerts & Advisories</h1>
              <p className="page-lead">
                Verified real-time notices on disease outbreaks, seasonal health alerts,
                environmental hazards, and pharmaceutical recalls issued by health authorities.
              </p>
            </div>
          </Reveal>

          {/* Metrics summary cards */}
          <div className="alerts-stats-row">
            <div className="stat-card total-alerts">
              <div className="stat-icon"><i className="bi bi-broadcast"></i></div>
              <div className="stat-info">
                <h3>{counts.all}</h3>
                <span>Total Advisories</span>
              </div>
            </div>

            <div className="stat-card critical-alerts">
              <div className="stat-icon"><i className="bi bi-exclamation-octagon-fill"></i></div>
              <div className="stat-info">
                <h3>{counts.critical}</h3>
                <span>Critical Outbreaks</span>
              </div>
            </div>

            <div className="stat-card warning-alerts">
              <div className="stat-icon"><i className="bi bi-exclamation-triangle-fill"></i></div>
              <div className="stat-info">
                <h3>{counts.warning}</h3>
                <span>Active Warnings</span>
              </div>
            </div>

            <div className="stat-card subscribe-cta" onClick={() => setShowSubModal(true)}>
              <div className="stat-icon"><i className="bi bi-bell-fill"></i></div>
              <div className="stat-info">
                <strong>Subscribe</strong>
                <span>SMS / Email Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Hotlines Bar */}
      <section className="alerts-hotline-strip">
        <div className="container strip-inner">
          <div className="hotline-title">
            <i className="bi bi-headset me-2"></i>
            <strong>Emergency Health Hotlines (24/7 Toll-Free):</strong>
          </div>
          <div className="hotline-pills">
            <a href="tel:112" className="hotline-badge">
              <span>National Dispatch:</span> <strong>112 / 911</strong>
            </a>
            <a href="tel:18005557857" className="hotline-badge">
              <span>Outbreak Taskforce:</span> <strong>1-800-555-PULSE</strong>
            </a>
            <a href="tel:18002221222" className="hotline-badge">
              <span>Poison Control:</span> <strong>1-800-222-1222</strong>
            </a>
          </div>
        </div>
      </section>

      {/* Main Alerts Feed */}
      <section className="alerts-feed-section">
        <div className="container">
          {/* Controls Bar: Search & Severity Tabs */}
          <div className="alerts-controls-card">
            <div className="alerts-search-wrap">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search alerts by disease (e.g. Cholera, Dengue), symptom, or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="alerts-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="btn-clear-alerts-search">
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="sidebar-select ms-2"
                style={{ maxWidth: "180px", minWidth: "140px" }}
              >
                <option value="all">All Categories</option>
                <option value="outbreak">Outbreak</option>
                <option value="seasonal">Seasonal</option>
                <option value="environmental">Environmental</option>
                <option value="emergency">Product Recall</option>
              </select>
            </div>

            <div className="severity-tabs-row">
              {SEVERITY_FILTERS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSeverity(s.id)}
                  className={`severity-tab-btn ${activeSeverity === s.id ? "active" : ""}`}
                >
                  {s.label}
                  <span className="tab-count-badge">
                    {counts[s.id]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Alerts Listing */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner-border text-primary" role="status"></div>
              <p>Fetching active surveillance advisories...</p>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="empty-results-box">
              <i className="bi bi-shield-check text-success display-4"></i>
              <h3>No Active Alerts for this Filter</h3>
              <p>There are currently no recorded advisories matching your selected criteria.</p>
              <button
                onClick={() => {
                  setActiveSeverity("all");
                  setSearchQuery("");
                }}
                className="button button-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="alerts-cards-list">
              {filteredAlerts.map((alert) => (
                <article key={alert.id} className={`alert-detail-card severity-${alert.severity}`}>
                  <div className="alert-badge-line">
                    <span className={`severity-indicator-pill ${alert.severity}`}>
                      {alert.severity === "critical" && <i className="bi bi-exclamation-octagon-fill me-1"></i>}
                      {alert.severity === "warning" && <i className="bi bi-exclamation-triangle-fill me-1"></i>}
                      {alert.severity === "advisory" && <i className="bi bi-info-circle-fill me-1"></i>}
                      {alert.severity === "resolved" && <i className="bi bi-check-circle-fill me-1"></i>}
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="alert-category-tag">{alert.category}</span>
                    <span className="alert-meta-date">
                      <i className="bi bi-calendar3 me-1"></i> Published: {alert.publishedDate}
                      {alert.updatedDate && ` (Updated: ${alert.updatedDate})`}
                    </span>
                  </div>

                  <h2 className="alert-headline">
                    <Link to={`/alerts/${alert.id}`}>{alert.title}</Link>
                  </h2>

                  <div className="alert-issuing-line">
                    <i className="bi bi-building-check text-primary me-1"></i>
                    Issued by: <strong>{alert.issuingAgency}</strong>
                  </div>

                  <p className="alert-body-summary">{alert.summary}</p>

                  <div className="alert-locations-row">
                    <span className="locations-title">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                      Region: <strong>{alert.region}</strong>
                    </span>
                    <div className="affected-chips">
                      {alert.affectedAreas.map((area) => (
                        <span key={area} className="area-chip">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {alert.symptoms && alert.symptoms.length > 0 && (
                    <div className="alert-symptoms-preview">
                      <strong>Watch for Key Symptoms:</strong>
                      <ul>
                        {alert.symptoms.slice(0, 3).map((sym, idx) => (
                          <li key={idx}>{sym}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="alert-actions-footer">
                    <div className="hotline-box-mini">
                      <i className="bi bi-telephone-inbound-fill text-danger me-1"></i>
                      <small>Response line:</small> <strong>{alert.emergencyHotline}</strong>
                    </div>

                    <Link to={`/alerts/${alert.id}`} className="button button-primary btn-read-advisory">
                      View Full Advisory & Guidance
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe to SMS/Email Modal */}
      {showSubModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowSubModal(false)}>
          <div className="subscription-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <div>
                <h2>Subscribe to Health Alerts</h2>
                <p className="small text-muted mb-0">Receive instant alerts for your region via SMS and Email.</p>
              </div>
              <button onClick={() => setShowSubModal(false)} className="btn-close-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body-custom">
              {subSuccess ? (
                <div className="text-center py-4">
                  <i className="bi bi-check-circle-fill text-success display-3"></i>
                  <h3 className="mt-3">Subscription Confirmed!</h3>
                  <p className="text-muted">
                    You have successfully opted into real-time public health updates for <strong>{subRegion}</strong>.
                  </p>
                  <button onClick={() => setShowSubModal(false)} className="button button-primary mt-2">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mobile Number for SMS Alerts (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={subPhone}
                      onChange={(e) => setSubPhone(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Preferred Health Region</label>
                    <select
                      value={subRegion}
                      onChange={(e) => setSubRegion(e.target.value)}
                      className="form-select"
                    >
                      <option value="All Regions">All Regions (National Coverage)</option>
                      <option value="Coastal Districts & Riverine Basin">Coastal Districts & Riverine Basin</option>
                      <option value="Metropolitan Central & Suburban South">Metropolitan Central & Suburban South</option>
                      <option value="Inland Valley & Central Industrial Corridor">Inland Valley & Central Industrial Corridor</option>
                    </select>
                  </div>

                  <div className="form-check mb-3">
                    <input type="checkbox" required className="form-check-input" id="consentCheck" defaultChecked />
                    <label className="form-check-label small" htmlFor="consentCheck">
                      I agree to receive urgent public health notifications from PULSE360 and health authorities.
                    </label>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button type="button" onClick={() => setShowSubModal(false)} className="button button-outline">
                      Cancel
                    </button>
                    <button type="submit" className="button button-primary">
                      Subscribe Now
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthAlerts;
