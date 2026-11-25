import { useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToAlerts } from "../services/api";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await subscribeToAlerts({ email });
      setSubscribed(true);
      setEmail("");
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="site-footer">
      {/* Newsletter / Instant Alert Subscription Strip */}
      <div className="footer-newsletter-strip">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <span className="newsletter-badge">
              <i className="bi bi-bell-fill"></i> NIGERIA HEALTH SURVEILLANCE
            </span>
            <h3>Get Instant Public Health Advisories</h3>
            <p>Subscribe to receive verified NCDC &amp; NAFDAC alerts, outbreak warnings, and seasonal guidance directly.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="subscription-success">
                <i className="bi bi-check-circle-fill"></i>
                <span>Thank you! You are now subscribed to Nigeria public health alerts.</span>
              </div>
            ) : (
              <div className="input-group-custom">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="newsletter-btn button button-primary"
                >
                  {submitting ? "Subscribing..." : "Subscribe Alerts"}
                  <i className="bi bi-send-fill ms-2"></i>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand" aria-label="PULSE360 homepage">
            <span className="brand-mark">
              <i className="bi bi-heart-pulse-fill" aria-hidden="true"></i>
            </span>
            <span className="brand-copy">
              <span className="brand-name">
                PULSE<span>360</span>
              </span>
              <span className="brand-caption">NIGERIA PUBLIC HEALTH NETWORK</span>
            </span>
          </Link>

          <p>
            From health signals to coordinated action. Connecting Nigerian citizens,
            healthcare facilities, medical warehouses, and emergency response teams
            in one unified digital ecosystem.
          </p>

          <div className="footer-hotlines-box">
            <div className="hotline-item">
              <i className="bi bi-telephone-inbound-fill"></i>
              <div>
                <strong>Nigeria Emergency</strong>
                <span>112 (24/7 Toll-Free)</span>
              </div>
            </div>
            <div className="hotline-item">
              <i className="bi bi-shield-plus"></i>
              <div>
                <strong>NCDC Outbreak Line</strong>
                <span>6232 (24/7)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-column">
          <h3>Public Platform</h3>
          <Link to="/find-healthcare">Healthcare Finder (State &amp; LGA)</Link>
          <Link to="/health-map">Nigeria Public Health Map</Link>
          <Link to="/alerts">NCDC &amp; NAFDAC Alerts</Link>
          <Link to="/awareness">Health Information &amp; Guides</Link>
          <Link to="/emergency">Emergency Numbers (112 / 6232)</Link>
        </div>

        <div className="footer-column">
          <h3>Professional Platform</h3>
          <Link to="/pro">Operations Command Dashboard</Link>
          <Link to="/pro/supply-chain">Supply Chain &amp; Inventory</Link>
          <Link to="/pro/logistics">Logistics &amp; Proof of Delivery</Link>
          <Link to="/pro/incidents">Incident &amp; Response Management</Link>
          <Link to="/register-company">Register Hospital / Warehouse</Link>
        </div>

        <div className="footer-column">
          <h3>Account &amp; Governance</h3>
          <Link to="/signin">Sign In (Citizen &amp; Staff)</Link>
          <Link to="/signup">Create Account</Link>
          <Link to="/pro/admin">RBAC &amp; Audit Administration</Link>
          <Link to="/awareness#first-aid">First Aid Protocols</Link>
        </div>
      </div>

      {/* Footer Bottom Disclaimers */}
      <div className="container footer-bottom">
        <div className="footer-disclaimer">
          <i className="bi bi-info-circle me-1"></i>
          <strong>Medical &amp; Operational Disclaimer:</strong> PULSE360 provides public health surveillance, facility navigation, and supply-chain coordination tools. In a life-threatening medical emergency anywhere in Nigeria, dial <strong>112</strong> immediately.
        </div>
        <div className="footer-bottom-copy">
          <p>© {new Date().getFullYear()} PULSE360 Nigeria. All rights reserved.</p>
          <p>From health signals to coordinated action.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
