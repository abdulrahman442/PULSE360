import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { signUp } from "../services/api";

const CITIES = [
  "Metro Central",
  "Green Valley Suburb",
  "North Valley",
  "Eastern Coastline",
  "Delta River Basin",
  "Industrial Belt",
];

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Metro Central");
  const [role, setRole] = useState("citizen");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await signUp({ name, email, password, role, city });
      // Notify components about user session
      window.dispatchEvent(new Event("pulse360-auth-change"));
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to register account. Please try again.");
    } finally {
      setLoading(false);
    }
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

                <h2>Join PULSE360</h2>
                <p className="auth-sub">Create your community healthcare account</p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3">
                  <label className="form-label" htmlFor="nameInput">
                    Full Name *
                  </label>
                  <div className="input-group-auth">
                    <i className="bi bi-person auth-field-icon"></i>
                    <input
                      id="nameInput"
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="emailInput">
                    Email Address *
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

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="phoneInput">
                      Mobile Number
                    </label>
                    <div className="input-group-auth">
                      <i className="bi bi-telephone auth-field-icon"></i>
                      <input
                        id="phoneInput"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="citySelect">
                      Your District / City
                    </label>
                    <select
                      id="citySelect"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-select"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Account Type</label>
                  <div className="role-selector-pills">
                    <button
                      type="button"
                      onClick={() => setRole("citizen")}
                      className={`role-pill ${role === "citizen" ? "active" : ""}`}
                    >
                      Citizen / Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("healthcare_worker")}
                      className={`role-pill ${role === "healthcare_worker" ? "active" : ""}`}
                    >
                      Healthcare Worker
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("responder")}
                      className={`role-pill ${role === "responder" ? "active" : ""}`}
                    >
                      First Responder
                    </button>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="passwordInput">
                      Password *
                    </label>
                    <div className="input-group-auth">
                      <i className="bi bi-lock auth-field-icon"></i>
                      <input
                        id="passwordInput"
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="confirmPasswordInput">
                      Confirm Password *
                    </label>
                    <div className="input-group-auth">
                      <i className="bi bi-shield-check auth-field-icon"></i>
                      <input
                        id="confirmPasswordInput"
                        type="password"
                        required
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheck"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <label className="form-check-label small" htmlFor="termsCheck">
                    I agree to the PULSE360 Terms of Service and consent to receive critical public health alerts.
                  </label>
                </div>

                <button type="submit" className="button button-primary w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Free Account <i className="bi bi-person-check-fill ms-2"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer-note">
                Already registered?{" "}
                <Link to="/signin" className="auth-switch-link">
                  Sign in here
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
