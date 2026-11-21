import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { registerCompany } from "../services/api";

const FACILITY_TYPES = [
  "Hospital",
  "Clinic",
  "Emergency",
  "Pharmacy",
  "Diagnostic",
  "Medical Supplier",
  "Pharmaceutical Distributor",
];

const AVAILABLE_SERVICES = [
  "24/7 Trauma Emergency",
  "Intensive Care Unit (ICU)",
  "Pediatrics & Child Health",
  "Maternity & Obstetrics",
  "Cardiology & Catheterization",
  "Radiology (CT, MRI, Ultrasound)",
  "Clinical Pathology & PCR Testing",
  "General & Laparoscopic Surgery",
  "In-House Pharmacy & Compounding",
  "Dialysis & Nephrology",
  "Psychiatric & Mental Health",
  "Ambulance & Critical Transport",
  "Durable Medical Equipment (Oxygen, Mobility)",
  "Vaccination Center",
];

function CompanyRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    type: "Hospital",
    category: "General & Teaching Hospital",
    yearEstablished: "2015",
    address: "",
    city: "Metro Central",
    state: "State Capital",
    phone: "",
    emergencyPhone: "",
    email: "",
    website: "",
    hours: "24/7 Always Open",
    isOpen24x7: true,
    bedsAvailable: 25,
    services: ["24/7 Trauma Emergency", "Pediatrics & Child Health", "In-House Pharmacy & Compounding"],
    insuranceAccepted: true,
    insuranceProviders: "Blue Cross, Aetna, UnitedHealth, State Medicaid",
    representativeName: "",
    representativeTitle: "Medical Director",
    representativeEmail: "",
    representativePhone: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const insuranceList = formData.insuranceProviders
        ? formData.insuranceProviders.split(",").map((s) => s.trim())
        : ["All Major Networks"];

      const payload = {
        ...formData,
        bedsAvailable: Number(formData.bedsAvailable) || 0,
        insuranceProviders: insuranceList,
        rating: 5.0,
        reviewCount: 1,
      };

      const result = await registerCompany(payload);
      setSubmittedResult(result.company);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="company-reg-page">
      {/* Banner */}
      <section className="reg-header-banner">
        <div className="container">
          <Reveal>
            <div className="reg-header-meta">
              <span className="section-eyebrow">HEALTHCARE PROVIDER & SUPPLIER NETWORK</span>
              <h1>Register Your Organisation</h1>
              <p className="page-lead">
                Connect your hospital, diagnostic clinic, pharmacy, or medical supply
                enterprise to the national PULSE360 public health network.
              </p>
            </div>
          </Reveal>

          {/* Value Props Row */}
          <div className="reg-benefits-grid">
            <div className="benefit-card">
              <i className="bi bi-geo-alt-fill text-primary"></i>
              <div>
                <strong>Public Discovery</strong>
                <p>Connect with citizens seeking verified care in your district.</p>
              </div>
            </div>

            <div className="benefit-card">
              <i className="bi bi-broadcast text-danger"></i>
              <div>
                <strong>Surveillance Integration</strong>
                <p>Receive rapid alerts and report disease cluster surveillance.</p>
              </div>
            </div>

            <div className="benefit-card">
              <i className="bi bi-patch-check-fill text-info"></i>
              <div>
                <strong>Verified Credential</strong>
                <p>Earn official verification badge on the public directory.</p>
              </div>
            </div>

            <div className="benefit-card">
              <i className="bi bi-truck text-success"></i>
              <div>
                <strong>Medical Supply Network</strong>
                <p>Coordinate emergency pharmaceuticals and equipment logistics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Registration Form Section */}
      <section className="reg-form-section py-5">
        <div className="container max-w-900">
          {submittedResult ? (
            /* Success Card */
            <div className="reg-success-card animate-fade-in">
              <div className="success-icon-badge">
                <i className="bi bi-check-lg"></i>
              </div>
              <h2>Organisation Registration Submitted!</h2>
              <p className="success-lead">
                Thank you for onboarding <strong>{submittedResult.name}</strong> to PULSE360.
              </p>

              <div className="submission-summary-box">
                <div className="summary-row">
                  <span>Application Reference ID:</span>
                  <strong>{submittedResult.id.toUpperCase()}</strong>
                </div>
                <div className="summary-row">
                  <span>Organisation Category:</span>
                  <strong>{submittedResult.type} ({submittedResult.category})</strong>
                </div>
                <div className="summary-row">
                  <span>Location:</span>
                  <strong>{submittedResult.address}, {submittedResult.city}</strong>
                </div>
                <div className="summary-row">
                  <span>Primary Representative:</span>
                  <strong>{submittedResult.representativeName} ({submittedResult.representativeTitle})</strong>
                </div>
                <div className="summary-row">
                  <span>Verification Status:</span>
                  <span className="badge-verified-preview">
                    <i className="bi bi-patch-check-fill me-1"></i> Active in Local Registry
                  </span>
                </div>
              </div>

              <div className="next-steps-info">
                <h4>What Happens Next?</h4>
                <ol>
                  <li>Our public health credentialing desk verifies your operating license within 24 to 48 hours.</li>
                  <li>Your verified provider badge will appear across the healthcare directory.</li>
                  <li>You will receive an automated onboarding email with administrative dashboard credentials.</li>
                </ol>
              </div>

              <div className="success-actions">
                <Link to="/find-healthcare" className="button button-primary">
                  <i className="bi bi-search me-2"></i>
                  View in Healthcare Directory
                </Link>
                <button
                  onClick={() => {
                    setSubmittedResult(null);
                    setCurrentStep(1);
                  }}
                  className="button button-outline"
                >
                  Register Another Facility
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <div className="reg-card">
              {/* Stepper Header */}
              <div className="reg-stepper">
                <div className={`step-node ${currentStep >= 1 ? "active" : ""}`}>
                  <div className="step-circle">1</div>
                  <span>Profile</span>
                </div>
                <div className={`step-divider ${currentStep >= 2 ? "active" : ""}`}></div>

                <div className={`step-node ${currentStep >= 2 ? "active" : ""}`}>
                  <div className="step-circle">2</div>
                  <span>Location</span>
                </div>
                <div className={`step-divider ${currentStep >= 3 ? "active" : ""}`}></div>

                <div className={`step-node ${currentStep >= 3 ? "active" : ""}`}>
                  <div className="step-circle">3</div>
                  <span>Services</span>
                </div>
                <div className={`step-divider ${currentStep >= 4 ? "active" : ""}`}></div>

                <div className={`step-node ${currentStep >= 4 ? "active" : ""}`}>
                  <div className="step-circle">4</div>
                  <span>Verification</span>
                </div>
              </div>

              {/* Step 1: Organisation Profile */}
              {currentStep === 1 && (
                <form onSubmit={handleNext} className="reg-step-form">
                  <h3>Step 1: Organisation Profile & Identity</h3>
                  <p className="text-muted small">Enter your healthcare or medical supply entity details.</p>

                  <div className="mb-3">
                    <label className="form-label">Official Organisation Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. St. Luke Specialized Memorial Hospital"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Facility Classification *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange("type", e.target.value)}
                        className="form-select"
                      >
                        {FACILITY_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Ministry / State License Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MOH-HOSP-2026-9812"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Category Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Multi-Specialty Tertiary Hospital"
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Year Established</label>
                      <input
                        type="number"
                        placeholder="2010"
                        value={formData.yearEstablished}
                        onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <span></span>
                    <button type="submit" className="button button-primary">
                      Continue to Location <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Location & Contact */}
              {currentStep === 2 && (
                <form onSubmit={handleNext} className="reg-step-form">
                  <h3>Step 2: Location & Contact Channels</h3>
                  <p className="text-muted small">Help citizens and emergency responders locate your facilities.</p>

                  <div className="mb-3">
                    <label className="form-label">Physical Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 742 Evergreen Boulevard, Suite 100"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Municipality / City *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Metro Central"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">State / Province</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">General Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Emergency Desk Line (24/7)</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 911-0000"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Official Facility Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="info@facility.org"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Website URL</label>
                      <input
                        type="url"
                        placeholder="https://www.facility.org"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button type="button" onClick={handleBack} className="button button-outline">
                      <i className="bi bi-arrow-left me-2"></i> Back
                    </button>
                    <button type="submit" className="button button-primary">
                      Continue to Services <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Clinical Services & Capacity */}
              {currentStep === 3 && (
                <form onSubmit={handleNext} className="reg-step-form">
                  <h3>Step 3: Clinical Capacity & Services Offered</h3>
                  <p className="text-muted small">Specify available specialties, beds, and operating hours.</p>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Operating Schedule</label>
                      <input
                        type="text"
                        placeholder="e.g. 24/7 Always Open OR Mon-Sat 8am-8pm"
                        value={formData.hours}
                        onChange={(e) => handleInputChange("hours", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Available Inpatient Beds / Capacity</label>
                      <input
                        type="number"
                        placeholder="e.g. 35"
                        value={formData.bedsAvailable}
                        onChange={(e) => handleInputChange("bedsAvailable", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="open247Switch"
                        checked={formData.isOpen24x7}
                        onChange={(e) => handleInputChange("isOpen24x7", e.target.checked)}
                      />
                      <label className="form-check-label fw-bold" htmlFor="open247Switch">
                        Facility Operates 24 Hours / 7 Days a Week
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Select Available Services & Specialties</label>
                    <div className="services-selection-grid">
                      {AVAILABLE_SERVICES.map((s) => {
                        const checked = formData.services.includes(s);
                        return (
                          <div
                            key={s}
                            className={`service-select-pill ${checked ? "selected" : ""}`}
                            onClick={() => handleToggleService(s)}
                          >
                            <i className={`bi ${checked ? "bi-check-circle-fill text-primary" : "bi-circle"} me-2`}></i>
                            {s}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Accepted Health Insurance Networks (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Blue Cross, Aetna, UnitedHealth, State Medicaid"
                      value={formData.insuranceProviders}
                      onChange={(e) => handleInputChange("insuranceProviders", e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-actions-row">
                    <button type="button" onClick={handleBack} className="button button-outline">
                      <i className="bi bi-arrow-left me-2"></i> Back
                    </button>
                    <button type="submit" className="button button-primary">
                      Continue to Verification <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 4: Verification & Signoff */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="reg-step-form">
                  <h3>Step 4: Authorized Representative & Verification</h3>
                  <p className="text-muted small">Designate an official liaison for credentialing and public inquiries.</p>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Representative Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Eleanor Vance"
                        value={formData.representativeName}
                        onChange={(e) => handleInputChange("representativeName", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Designation / Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="Chief Medical Officer / Director"
                        value={formData.representativeTitle}
                        onChange={(e) => handleInputChange("representativeTitle", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Representative Direct Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="director@facility.org"
                        value={formData.representativeEmail}
                        onChange={(e) => handleInputChange("representativeEmail", e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Direct Phone Line *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 234-9999"
                        value={formData.representativePhone}
                        onChange={(e) => handleInputChange("representativePhone", e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="verification-affirmation-box p-3 bg-light rounded mb-4">
                    <div className="form-check">
                      <input type="checkbox" required className="form-check-input" id="certifyCheck" defaultChecked />
                      <label className="form-check-label small" htmlFor="certifyCheck">
                        I hereby certify that I am legally authorized to register this healthcare organisation with PULSE360, and all operating licenses and bed capacity details provided are accurate.
                      </label>
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button type="button" onClick={handleBack} className="button button-outline" disabled={isSubmitting}>
                      <i className="bi bi-arrow-left me-2"></i> Back
                    </button>
                    <button type="submit" className="button button-primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Submitting Registration...
                        </>
                      ) : (
                        <>
                          Complete Registration <i className="bi bi-check-circle-fill ms-2"></i>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Verification FAQ Section */}
          <div className="reg-faq-section mt-5" id="guidelines">
            <h3>Frequently Asked Questions for Providers</h3>
            <div className="faq-grid mt-3">
              <div className="faq-item">
                <h5>What documents are required for facility verification?</h5>
                <p>A valid State or National Department of Health operating license, institutional registration certificate, and proof of address are verified during credentialing.</p>
              </div>

              <div className="faq-item">
                <h5>Is there any registration fee for hospitals and clinics?</h5>
                <p>No. Public directory listing, emergency routing integration, and disease surveillance broadcast feeds are provided free as a public health service.</p>
              </div>

              <div className="faq-item">
                <h5>How can our hospital update real-time bed availability?</h5>
                <p>Once registered, provider representatives receive access to the Provider Portal to update ICU bed capacity, emergency triage wait times, and emergency contact lines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanyRegistration;
