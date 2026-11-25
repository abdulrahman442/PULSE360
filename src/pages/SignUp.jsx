import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { FormInput, FormSelect, FormCheckbox, FormRow } from "../components/ui/FormComponents";
import { signUp } from "../services/api";
import { NIGERIA_STATES } from "../data/nigeriaGeo";

const SIGNUP_ROLES = [
  { value: "citizen", label: "Citizen / Community Member" },
  { value: "facility_staff", label: "Facility Staff (Hospital / PHC)" },
  { value: "warehouse_officer", label: "Warehouse / Supply Officer" },
  { value: "logistics", label: "Logistics Provider" },
  { value: "public_health_officer", label: "Public Health Officer" },
];

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Lagos");
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
      const selectedObj = NIGERIA_STATES.find((s) => s.name === state);
      await signUp({
        name,
        email,
        password,
        role,
        state,
        lga: selectedObj?.lgas[0] || "Central",
      });
      window.dispatchEvent(new Event("pulse360-auth-change"));
      navigate(role === "citizen" ? "/" : "/pro");
    } catch (err) {
      setError(err.message || "Unable to register account. Please try again.");
    } finally {
      setLoading(false);
    }
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

                <h2>Join PULSE360 Nigeria</h2>
                <p className="auth-sub">Create your citizen or professional health account</p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <FormInput
                  id="nameInput"
                  label="Full Name"
                  required
                  icon="bi-person"
                  placeholder="e.g. Chidinma Nwosu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <FormInput
                  id="emailInput"
                  label="Email Address"
                  type="email"
                  required
                  icon="bi-envelope"
                  placeholder="name@example.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FormRow>
                  <FormInput
                    id="phoneInput"
                    label="Mobile Number"
                    type="tel"
                    icon="bi-telephone"
                    placeholder="+234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <FormSelect
                    id="stateSelect"
                    label="Your State (Nigeria)"
                    icon="bi-geo-alt"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    options={NIGERIA_STATES.map((s) => s.name)}
                  />
                </FormRow>

                <FormSelect
                  id="accountRoleSelect"
                  label="Account Role"
                  icon="bi-person-badge"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  options={SIGNUP_ROLES}
                />

                <FormRow>
                  <FormInput
                    id="passwordInput"
                    label="Password"
                    type="password"
                    required
                    icon="bi-lock"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <FormInput
                    id="confirmPasswordInput"
                    label="Confirm Password"
                    type="password"
                    required
                    icon="bi-shield-check"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormRow>

                <FormCheckbox
                  id="termsCheck"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  label="I agree to the PULSE360 Terms of Service and consent to receive NCDC public health alerts."
                />

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
