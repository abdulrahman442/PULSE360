import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { FormInput, FormSelect, FormCheckbox, FormRow } from "../components/ui/FormComponents";
import { registerCompany } from "../services/api";
import { NIGERIA_STATES } from "../data/nigeriaGeo";

const FACILITY_TYPES = [
  "Hospital",
  "Clinic",
  "Emergency",
  "Pharmacy",
  "Diagnostic",
  "Warehouse / Medical Store",
  "Logistics Provider",
  "Medical Supplier",
];

const AVAILABLE_SERVICES = [
  "24/7 Accident & Emergency",
  "Intensive Care Unit (ICU)",
  "Pediatrics & Child Health",
  "Maternity & Obstetrics",
  "Routine Immunization (NPHCDA)",
  "Radiology (CT, MRI, Ultrasound)",
  "Clinical Pathology & PCR Testing",
  "Oral Rehydration Therapy (ORT)",
  "PCN In-House Pharmacy",
  "Dialysis & Nephrology",
  "Infectious Disease Isolation",
  "Ambulance & Cold-Chain Transport",
  "Medical Oxygen & Equipment",
];

function CompanyRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [certified, setCertified] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    type: "Hospital",
    category: "General & Specialist Hospital",
    yearEstablished: "2015",
    address: "",
    city: "Lagos",
    lga: "Ikeja",
    state: "Lagos",
    phone: "",
    emergencyPhone: "",
    email: "",
    website: "",
    hours: "24/7 Always Open",
    isOpen24x7: true,
    bedsAvailable: 25,
    services: ["24/7 Accident & Emergency", "Pediatrics & Child Health", "PCN In-House Pharmacy"],
    insuranceAccepted: true,
    insuranceProviders: "NHIA, LASHMA (Ilera Eko), Hygeia HMO, AXA Mansard",
    representativeName: "",
    representativeTitle: "Chief Medical Director (CMD)",
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
        : ["NHIA"];

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

  const selectedStateLgas =
    NIGERIA_STATES.find((s) => s.name === formData.state)?.lgas.map((l) => ({
      value: l,
      label: `${l} LGA`,
    })) || [];

  return (
    <div className="company-reg-page">
      <section className="reg-header-banner">
        <div className="container">
          <Reveal>
            <div className="reg-header-meta">
              <span className="section-eyebrow">NIGERIA HEALTHCARE PROVIDER &amp; SUPPLIER NETWORK</span>
              <h1>Register Your Organisation</h1>
              <p className="page-lead">
                Connect your hospital, Primary Health Centre, PCN pharmacy, Central Medical Store,
                or logistics fleet to the PULSE360 Nigeria ecosystem.
              </p>
            </div>
          </Reveal>

          <div className="reg-benefits-grid">
            <div className="benefit-card">
              <i className="bi bi-geo-alt-fill text-primary"></i>
              <div>
                <strong>State &amp; LGA Discovery</strong>
                <p>Connect with citizens seeking verified care in your LGA.</p>
              </div>
            </div>

            <div className="benefit-card">
              <i className="bi bi-broadcast text-danger"></i>
              <div>
                <strong>NCDC Surveillance</strong>
                <p>Receive rapid alerts and coordinate incident response.</p>
              </div>
            </div>

            <div className="benefit-card">
              <i className="bi bi-patch-check-fill text-info"></i>
              <div>
                <strong>Verified Credential</strong>
                <p>Earn HEFAMAA / MDCN / PCN verification badge.</p>
              </div>
            </div>

            <div className="benefit-card">
              <i className="bi bi-truck text-success"></i>
              <div>
                <strong>Supply Chain Network</strong>
                <p>Request medical stock &amp; verify last-mile deliveries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reg-form-section py-5">
        <div className="container max-w-900">
          {submittedResult ? (
            <div className="reg-success-card animate-fade-in">
              <div className="success-icon-badge">
                <i className="bi bi-check-lg"></i>
              </div>
              <h2>Organisation Registration Submitted!</h2>
              <p className="success-lead">
                Thank you for onboarding <strong>{submittedResult.name}</strong> to PULSE360 Nigeria.
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
                  <strong>{submittedResult.address}, {submittedResult.lga} LGA, {submittedResult.state}</strong>
                </div>
                <div className="summary-row">
                  <span>Primary Representative:</span>
                  <strong>{submittedResult.representativeName} ({submittedResult.representativeTitle})</strong>
                </div>
                <div className="summary-row">
                  <span>Verification Status:</span>
                  <span className="badge-verified-preview">
                    <i className="bi bi-patch-check-fill me-1"></i> Active in Registry
                  </span>
                </div>
              </div>

              <div className="next-steps-info">
                <h4>What Happens Next?</h4>
                <ol>
                  <li>Our credentialing desk verifies your MDCN / PCN / HEFAMAA operating license within 24–48 hours.</li>
                  <li>Your verified facility appears across the Healthcare Finder and Nigeria Health Map.</li>
                  <li>Your team gains access to the Professional Command Portal for supply requests and inventory.</li>
                </ol>
              </div>

              <div className="success-actions justify-content-center">
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
            <div className="reg-card">
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

              {currentStep === 1 && (
                <form onSubmit={handleNext} className="reg-step-form">
                  <h3>Step 1: Organisation Profile &amp; Identity</h3>
                  <p className="text-muted small mb-4">Enter your Nigerian healthcare, warehouse, or logistics entity details.</p>

                  <FormInput
                    id="orgName"
                    label="Official Organisation Name"
                    required
                    icon="bi-building"
                    placeholder="e.g. Ikeja General & Specialist Hospital"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />

                  <FormRow>
                    <FormSelect
                      id="orgType"
                      label="Facility Classification"
                      required
                      icon="bi-hospital"
                      value={formData.type}
                      onChange={(e) => handleInputChange("type", e.target.value)}
                      options={FACILITY_TYPES}
                    />

                    <FormInput
                      id="orgLicense"
                      label="FMoH / HEFAMAA / PCN License No."
                      required
                      icon="bi-file-earmark-check"
                      placeholder="e.g. HEFAMAA-LAG-2026-981"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    />
                  </FormRow>

                  <FormRow>
                    <FormInput
                      id="orgCategory"
                      label="Category Description"
                      icon="bi-tag"
                      placeholder="e.g. Tertiary Teaching Hospital"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                    />

                    <FormInput
                      id="orgYear"
                      label="Year Established"
                      type="number"
                      icon="bi-calendar3"
                      placeholder="2015"
                      value={formData.yearEstablished}
                      onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
                    />
                  </FormRow>

                  <div className="form-actions-row">
                    <span></span>
                    <button type="submit" className="button button-primary">
                      Continue to Location <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </form>
              )}

              {currentStep === 2 && (
                <form onSubmit={handleNext} className="reg-step-form">
                  <h3>Step 2: Location &amp; Contact Channels</h3>
                  <p className="text-muted small mb-4">Help Nigerian citizens and dispatchers locate your facility by State and LGA.</p>

                  <FormInput
                    id="orgAddress"
                    label="Physical Street Address"
                    required
                    icon="bi-geo-alt"
                    placeholder="e.g. 24 Oba Akran Avenue, Ikeja"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />

                  <FormRow>
                    <FormSelect
                      id="orgState"
                      label="State (Nigeria)"
                      required
                      icon="bi-map"
                      value={formData.state}
                      onChange={(e) => {
                        const st = e.target.value;
                        const stObj = NIGERIA_STATES.find((s) => s.name === st);
                        handleInputChange("state", st);
                        handleInputChange("city", stObj?.capital || st);
                        handleInputChange("lga", stObj?.lgas[0] || "");
                      }}
                      options={NIGERIA_STATES.map((s) => s.name)}
                    />

                    <FormSelect
                      id="orgLga"
                      label="Local Government Area (LGA)"
                      required
                      icon="bi-pin-map"
                      value={formData.lga}
                      onChange={(e) => handleInputChange("lga", e.target.value)}
                      options={selectedStateLgas}
                    />
                  </FormRow>

                  <FormRow>
                    <FormInput
                      id="orgPhone"
                      label="General Contact Phone"
                      type="tel"
                      required
                      icon="bi-telephone"
                      placeholder="+234 803 000 0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />

                    <FormInput
                      id="orgEmergencyPhone"
                      label="Emergency Desk Line (24/7)"
                      type="tel"
                      icon="bi-lightning-charge"
                      placeholder="+234 800 112 0000"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    />
                  </FormRow>

                  <FormRow>
                    <FormInput
                      id="orgEmail"
                      label="Official Facility Email"
                      type="email"
                      required
                      icon="bi-envelope"
                      placeholder="info@facility.gov.ng"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />

                    <FormInput
                      id="orgWebsite"
                      label="Website URL"
                      type="url"
                      icon="bi-globe"
                      placeholder="https://www.facility.org.ng"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </FormRow>

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

              {currentStep === 3 && (
                <form onSubmit={handleNext} className="reg-step-form">
                  <h3>Step 3: Clinical Capacity &amp; Services Offered</h3>
                  <p className="text-muted small mb-4">Specify available specialties, bed capacity, and NHIA/HMO coverage.</p>

                  <FormRow>
                    <FormInput
                      id="orgHours"
                      label="Operating Schedule"
                      icon="bi-clock"
                      placeholder="e.g. 24/7 Always Open"
                      value={formData.hours}
                      onChange={(e) => handleInputChange("hours", e.target.value)}
                    />

                    <FormInput
                      id="orgBeds"
                      label="Available Inpatient Beds / Capacity"
                      type="number"
                      icon="bi-hospital"
                      placeholder="e.g. 35"
                      value={formData.bedsAvailable}
                      onChange={(e) => handleInputChange("bedsAvailable", e.target.value)}
                    />
                  </FormRow>

                  <FormCheckbox
                    id="open247Switch"
                    checked={formData.isOpen24x7}
                    onChange={(e) => handleInputChange("isOpen24x7", e.target.checked)}
                    label="Facility Operates 24 Hours / 7 Days a Week"
                  />

                  <div className="pulse-form-field">
                    <label className="pulse-form-label mb-2">Select Available Services &amp; Specialties</label>
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

                  <FormInput
                    id="orgInsurance"
                    label="Accepted NHIA &amp; HMO Networks (comma separated)"
                    icon="bi-shield-check"
                    placeholder="NHIA, LASHMA, Hygeia HMO, AXA Mansard"
                    value={formData.insuranceProviders}
                    onChange={(e) => handleInputChange("insuranceProviders", e.target.value)}
                  />

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

              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="reg-step-form">
                  <h3>Step 4: Authorized Representative &amp; Verification</h3>
                  <p className="text-muted small mb-4">Designate an official liaison for credentialing and public inquiries.</p>

                  <FormRow>
                    <FormInput
                      id="repName"
                      label="Representative Full Name"
                      required
                      icon="bi-person"
                      placeholder="Dr. Folake Adeyemi"
                      value={formData.representativeName}
                      onChange={(e) => handleInputChange("representativeName", e.target.value)}
                    />

                    <FormInput
                      id="repTitle"
                      label="Designation / Title"
                      required
                      icon="bi-award"
                      placeholder="Chief Medical Director (CMD)"
                      value={formData.representativeTitle}
                      onChange={(e) => handleInputChange("representativeTitle", e.target.value)}
                    />
                  </FormRow>

                  <FormRow>
                    <FormInput
                      id="repEmail"
                      label="Representative Direct Email"
                      type="email"
                      required
                      icon="bi-envelope"
                      placeholder="cmd@facility.gov.ng"
                      value={formData.representativeEmail}
                      onChange={(e) => handleInputChange("representativeEmail", e.target.value)}
                    />

                    <FormInput
                      id="repPhone"
                      label="Direct Phone Line"
                      type="tel"
                      required
                      icon="bi-telephone"
                      placeholder="+234 803 234 9999"
                      value={formData.representativePhone}
                      onChange={(e) => handleInputChange("representativePhone", e.target.value)}
                    />
                  </FormRow>

                  <div className="p-3 rounded mb-2" style={{ background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)" }}>
                    <FormCheckbox
                      id="certifyCheck"
                      checked={certified}
                      onChange={(e) => setCertified(e.target.checked)}
                      required
                      className="mb-0"
                      label="I hereby certify that I am legally authorized to register this Nigerian healthcare organisation with PULSE360, and all operating licenses and capacity details provided are accurate."
                    />
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

          <div className="reg-faq-section mt-5" id="guidelines">
            <h3>Frequently Asked Questions for Providers</h3>
            <div className="faq-grid mt-3">
              <div className="faq-item">
                <h5>What documents are required for verification?</h5>
                <p>A valid Federal/State Ministry of Health, HEFAMAA, MDCN, or PCN operating license and CAC registration are verified during credentialing.</p>
              </div>

              <div className="faq-item">
                <h5>Is there a fee for public directory listing?</h5>
                <p>No. Citizen-facing healthcare discovery and NCDC alert integration remain free across Nigeria.</p>
              </div>

              <div className="faq-item">
                <h5>How do we manage supply requests and inventory?</h5>
                <p>Once onboarded, facility staff can access the Command Portal (/pro) to track stock, submit supply requests, and verify deliveries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanyRegistration;
