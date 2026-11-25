import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { FormInput, FormSelect } from "../components/ui/FormComponents";
import { signIn } from "../services/api";

const DEMO_ACCOUNTS = [
  {
    label: "Facility Staff",
    name: "Pharm. Adebayo Ogunleye",
    email: "adebayo.ogunleye@luth.gov.ng",
    role: "facility_staff",
    org: "Lagos University Teaching Hospital (LUTH)",
  },
  {
    label: "Warehouse Officer",
    name: "Ibrahim Suleiman",
    email: "ibrahim.suleiman@oshodistore.gov.ng",
    role: "warehouse_officer",
    org: "Central Medical Store — Oshodi, Lagos",
  },
  {
    label: "Logistics",
    name: "Chukwudi Okafor",
    email: "chukwudi@tranexmed.ng",
    role: "logistics",
    org: "Tranex Medical Logistics Nigeria",
  },
  {
    label: "Public Health Officer",
    name: "Dr. Ngozi Okonjo-Madu",
    email: "ngozi.madu@ncdc.gov.ng",
    role: "public_health_officer",
    org: "NCDC Surveillance EOC",
  },
  {
    label: "Administrator",
    name: "Tunde Bakare",
    email: "admin@pulse360.ng",
    role: "admin",
    org: "PULSE360 Nigeria Governance",
  },
  {
    label: "Citizen",
    name: "Amina Yusuf",
    email: "amina.yusuf@example.ng",
    role: "citizen",
    org: "Public Citizen",
  },
];

const ROLE_OPTIONS = [
  { value: "facility_staff", label: "Facility Staff (Hospital / PHC)" },
  { value: "warehouse_officer", label: "Warehouse / Supply Officer" },
  { value: "logistics", label: "Logistics Provider" },
  { value: "public_health_officer", label: "Public Health Officer (NCDC / State MoH)" },
  { value: "admin", label: "System Administrator" },
  { value: "citizen", label: "Citizen / Community Member" },
];

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("facility_staff");
  const [organization, setOrganization] = useState("Lagos State Health Network");
  const [customName, setCustomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn({ email, password, role, organization, name: customName });
      window.dispatchEvent(new Event("pulse360-auth-change"));
      navigate(role === "citizen" ? "/" : "/pro");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (demo) => {
    setEmail(demo.email);
    setPassword("pulse360demo");
    setRole(demo.role);
    setOrganization(demo.org);
    setCustomName(demo.name);
    await signIn({
      email: demo.email,
      password: "pulse360demo",
      role: demo.role,
      organization: demo.org,
      name: demo.name,
    });
    window.dispatchEvent(new Event("pulse360-auth-change"));
    navigate(demo.role === "citizen" ? "/" : "/pro");
  };

  return (
    <div className="auth-page">
      <div className="container py-5">
        <div className="auth-card-container" style={{ maxWidth: "560px" }}>
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
                    <span className="brand-caption">NIGERIA PUBLIC HEALTH NETWORK</span>
                  </span>
                </Link>

                <h2>Sign In to PULSE360</h2>
                <p className="auth-sub">Access the Public Layer or Professional Operations Command</p>
              </div>

              <div className="quick-demo-strip flex-column align-items-stretch gap-2">
                <span className="demo-label">
                  <i className="bi bi-lightning-charge-fill text-warning me-1"></i>
                  1-Click Role Demo Sign-In (Tests RBAC &amp; Command Portal):
                </span>
                <div className="demo-btns flex-wrap">
                  {DEMO_ACCOUNTS.map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => handleQuickDemo(demo)}
                      className="demo-btn"
                    >
                      {demo.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <FormSelect
                  id="roleSelect"
                  label="Operational Role"
                  icon="bi-person-badge"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  options={ROLE_OPTIONS}
                />

                <FormInput
                  id="emailInput"
                  label="Email Address"
                  type="email"
                  required
                  icon="bi-envelope"
                  placeholder="name@hospital.gov.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                  id="passwordInput"
                  label="Password"
                  type="password"
                  required
                  icon="bi-lock"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  labelAction={
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Password reset instructions sent to your registered email.");
                      }}
                      className="forgot-link"
                    >
                      Forgot password?
                    </a>
                  }
                />

                <button type="submit" className="button button-primary w-100 mt-2" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In <i className="bi bi-arrow-right ms-2"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer-note">
                Don&apos;t have an account yet?{" "}
                <Link to="/signup" className="auth-switch-link">
                  Create an account
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
