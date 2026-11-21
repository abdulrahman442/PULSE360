import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { signIn } from "../services/api";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn({ email, password, role });
      // Dispatch event so Navbar re-renders immediately
      window.dispatchEvent(new Event("pulse360-auth-change"));
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword("pulse360demo");
    setRole(demoRole);
  };

  return (
    <div className="auth-page">
      <div className="container py-5">
        <div className="auth-card-container">
          <Reveal>
            <div className="auth-card">
              <div className="auth-header">
                <Link to="/" className="brand auth-brand">
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

                <h2>Welcome Back</h2>
                <p className="auth-sub">Sign in to your PULSE360 account</p>
              </div>

              {/* Role Selector Tabs */}
              <div className="role-tabs">
                <button
                  type="button"
                  onClick={() => setRole("citizen")}
                  className={`role-tab ${role === "citizen" ? "active" : ""}`}
                >
                  <i className="bi bi-person me-1"></i> Citizen
                </button>
                <button
                  type="button"
                  onClick={() => setRole("provider")}
                  className={`role-tab ${role === "provider" ? "active" : ""}`}
                >
                  <i className="bi bi-hospital me-1"></i> Provider
                </button>
                <button
                  type="button"
                  onClick={() => setRole("supplier")}
                  className={`role-tab ${role === "supplier" ? "active" : ""}`}
                >
                  <i className="bi bi-capsule me-1"></i> Supplier
                </button>
              </div>

              {/* Quick Demo Fill Buttons */}
              <div className="quick-demo-strip">
                <span className="demo-label">1-Click Demo Login:</span>
                <div className="demo-btns">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("sarah.jenkins@example.org", "citizen")}
                    className="demo-btn"
                  >
                    Citizen Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("director@stjudegeneral.org", "provider")}
                    className="demo-btn"
                  >
                    Hospital Admin Demo
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3">
                  <label className="form-label" htmlFor="emailInput">
                    Email Address
                  </label>
                  <div className="input-group-auth">
                    <i className="bi bi-envelope auth-field-icon"></i>
                    <input
                      id="emailInput"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label mb-0" htmlFor="passwordInput">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Password recovery link sent to your registered email address.");
                      }}
                      className="forgot-link"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="input-group-auth">
                    <i className="bi bi-lock auth-field-icon"></i>
                    <input
                      id="passwordInput"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn-toggle-password"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input type="checkbox" className="form-check-input" id="rememberMe" defaultChecked />
                  <label className="form-check-label small" htmlFor="rememberMe">
                    Keep me signed in on this device
                  </label>
                </div>

                <button type="submit" className="button button-primary w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In to PULSE360 <i className="bi bi-arrow-right ms-2"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer-note">
                Don't have an account yet?{" "}
                <Link to="/signup" className="auth-switch-link">
                  Create a community account
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
