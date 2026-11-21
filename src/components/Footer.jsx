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
              <i className="bi bi-bell-fill"></i> STAY PROTECTED
            </span>
            <h3>Get Instant Public Health Advisories</h3>
            <p>Subscribe to receive verified health alerts, epidemic warnings, and seasonal guidance directly.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="subscription-success">
                <i className="bi bi-check-circle-fill"></i>
                <span>Thank you! You are now subscribed to regional health alerts.</span>
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
              <span className="brand-caption">PUBLIC HEALTH NETWORK</span>
            </span>
          </Link>

          <p>
            PULSE360 connects citizens with verified healthcare facilities,
            real-time public health surveillance alerts, and accredited medical
            supply resources.
          </p>

          <div className="footer-hotlines-box">
            <div className="hotline-item">
              <i className="bi bi-telephone-inbound-fill"></i>
              <div>
                <strong>National Emergency</strong>
                <span>112 / 911 (24/7)</span>
              </div>
            </div>
            <div className="hotline-item">
              <i className="bi bi-shield-plus"></i>
              <div>
                <strong>Poison & Toxic Control</strong>
                <span>1-800-222-1222</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-column">
          <h3>Platform</h3>
          <Link to="/find-healthcare">Find Healthcare Facilities</Link>
          <Link to="/alerts">Public Health Alerts</Link>
          <Link to="/awareness">Health Awareness & Guides</Link>
          <Link to="/awareness#first-aid">First Aid Protocols</Link>
          <Link to="/register-company">Medical Supplier Network</Link>
        </div>

        <div className="footer-column">
          <h3>For Organisations</h3>
          <Link to="/register-company">Register Hospital or Clinic</Link>
          <Link to="/register-company">Register Pharmacy / Lab</Link>
          <Link to="/register-company">Medical Equipment Suppliers</Link>
          <Link to="/register-company">Verification Guidelines</Link>
          <Link to="/signin">Provider Portal Login</Link>
        </div>

        <div className="footer-column">
          <h3>Resources & Account</h3>
          <Link to="/signin">Sign In to Account</Link>
          <Link to="/signup">Create Community Account</Link>
          <Link to="/alerts">Outbreak Surveillance Map</Link>
          <Link to="/awareness">Preventative Care FAQs</Link>
        </div>
      </div>

      {/* Footer Bottom Disclaimers */}
      <div className="container footer-bottom">
        <div className="footer-disclaimer">
          <i className="bi bi-info-circle me-1"></i>
          <strong>Medical Disclaimer:</strong> PULSE360 provides public health information, directory access, and surveillance advisories for informational purposes. It does not replace professional clinical diagnosis. In a life-threatening emergency, call 911 or 112 immediately.
        </div>
        <div className="footer-bottom-copy">
          <p>© {new Date().getFullYear()} PULSE360. All rights reserved.</p>
          <p>Empowering communities through accessible public health intelligence.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
