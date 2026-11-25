import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { FormInput, FormTextarea } from "../components/ui/FormComponents";
import { getFacilities } from "../services/api";
import { NIGERIA_STATES } from "../data/nigeriaGeo";

const FACILITY_TYPES = [
  { id: "all", label: "All Facilities", icon: "bi-grid-fill" },
  { id: "hospital", label: "Hospitals", icon: "bi-hospital" },
  { id: "clinic", label: "PHCs & Clinics", icon: "bi-bandaid" },
  { id: "emergency", label: "24/7 Urgent Care", icon: "bi-lightning-charge-fill" },
  { id: "pharmacy", label: "PCN Pharmacies", icon: "bi-capsule" },
  { id: "diagnostic", label: "Diagnostic Labs", icon: "bi-clipboard2-pulse" },
];

function HealthcareFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialId = searchParams.get("id") || null;
  const initialState = searchParams.get("state") || "All States";

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedLga, setSelectedLga] = useState("All LGAs");
  const [only247, setOnly247] = useState(false);
  const [onlyInsurance, setOnlyInsurance] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getFacilities();
      setFacilities(data);
      setLoading(false);

      if (initialId) {
        const found = data.find((f) => f.id === initialId);
        if (found) setSelectedFacility(found);
      }
    }
    load();
  }, [initialId]);

  const availableLgas = useMemo(() => {
    if (selectedState === "All States") return [];
    const found = NIGERIA_STATES.find((s) => s.name === selectedState);
    return found ? found.lgas : [];
  }, [selectedState]);

  const handleStateChange = (newState) => {
    setSelectedState(newState);
    setSelectedLga("All LGAs");
  };

  const filteredFacilities = useMemo(() => {
    return facilities
      .filter((fac) => {
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchesName = fac.name.toLowerCase().includes(q);
          const matchesState = fac.state?.toLowerCase().includes(q);
          const matchesLga = fac.lga?.toLowerCase().includes(q);
          const matchesCity = fac.city?.toLowerCase().includes(q);
          const matchesCategory = fac.category?.toLowerCase().includes(q);
          const matchesServices = fac.services?.some((s) => s.toLowerCase().includes(q));
          if (!matchesName && !matchesState && !matchesLga && !matchesCity && !matchesCategory && !matchesServices) {
            return false;
          }
        }
        if (selectedType !== "all" && fac.type.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }
        if (selectedState !== "All States" && fac.state !== selectedState) {
          return false;
        }
        if (selectedLga !== "All LGAs" && fac.lga !== selectedLga) {
          return false;
        }
        if (only247 && !fac.isOpen24x7) {
          return false;
        }
        if (onlyInsurance && !fac.acceptsInsurance) {
          return false;
        }
        if (onlyVerified && !fac.isVerified) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [facilities, searchTerm, selectedType, selectedState, selectedLga, only247, onlyInsurance, onlyVerified, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedState("All States");
    setSelectedLga("All LGAs");
    setOnly247(false);
    setOnlyInsurance(false);
    setOnlyVerified(false);
    setSortBy("rating");
    setSearchParams({});
  };

  const handleOpenModal = (fac) => {
    setSelectedFacility(fac);
    setInquirySent(false);
  };

  const handleCloseModal = () => {
    setSelectedFacility(null);
    setInquirySent(false);
  };

  return (
    <div className="healthcare-finder-page">
      <section className="finder-header-banner">
        <div className="container">
          <Reveal>
            <div className="header-meta">
              <span className="section-eyebrow">NIGERIA HEALTHCARE DIRECTORY (STATE → LGA → FACILITY)</span>
              <h1>Find Healthcare Facilities in Nigeria</h1>
              <p className="page-lead">
                Search verified Federal Teaching Hospitals, Primary Health Centres (PHCs), PCN-licensed pharmacies, and NHIA/HMO-accredited clinics across Nigeria.
              </p>
            </div>
          </Reveal>

          <div className="search-bar-card">
            <div className="search-bar-main">
              <div className="search-input-col">
                <i className="bi bi-search search-lens"></i>
                <input
                  type="text"
                  placeholder="Search by facility name, service, LGA, or specialty (e.g. LUTH, Maternity, Malaria RDT)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="main-search-input"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="clear-search-btn"
                    aria-label="Clear search"
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>

              <div className="city-select-col">
                <i className="bi bi-geo-alt-fill text-muted me-2"></i>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="city-select"
                  aria-label="Filter by State"
                >
                  <option value="All States">All States (Nigeria)</option>
                  {NIGERIA_STATES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedState !== "All States" && (
                <div className="city-select-col">
                  <select
                    value={selectedLga}
                    onChange={(e) => setSelectedLga(e.target.value)}
                    className="city-select"
                    aria-label="Filter by LGA"
                  >
                    <option value="All LGAs">All LGAs in {selectedState}</option>
                    {availableLgas.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga} LGA
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="type-pills-row">
              {FACILITY_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`type-pill ${selectedType === t.id ? "active" : ""}`}
                >
                  <i className={`bi ${t.icon} me-1`}></i>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="finder-results-section">
        <div className="container finder-layout">
          <aside className="finder-sidebar">
            <div className="filter-card">
              <div className="filter-card-header">
                <h3>
                  <i className="bi bi-sliders me-2"></i> Refine Results
                </h3>
                <button onClick={resetFilters} className="btn-reset-filters">
                  Reset All
                </button>
              </div>

              <div className="filter-group">
                <label className="filter-group-title">Availability &amp; Insurance</label>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="filter247"
                    checked={only247}
                    onChange={(e) => setOnly247(e.target.checked)}
                  />
                  <label htmlFor="filter247">
                    <span className="badge-pill-inline bg-success-soft">24/7</span> Open 24/7 Emergency
                  </label>
                </div>

                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="filterInsurance"
                    checked={onlyInsurance}
                    onChange={(e) => setOnlyInsurance(e.target.checked)}
                  />
                  <label htmlFor="filterInsurance">
                    <i className="bi bi-shield-check text-primary me-1"></i> NHIA / HMO Accredited
                  </label>
                </div>

                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="filterVerified"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                  />
                  <label htmlFor="filterVerified">
                    <i className="bi bi-patch-check-fill text-info me-1"></i> Verified Providers Only
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-group-title" htmlFor="sortSelect">
                  Sort Facilities
                </label>
                <select
                  id="sortSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sidebar-select"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="name">Name (A to Z)</option>
                </select>
              </div>

              <div className="sidebar-emergency-box">
                <div className="box-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <h4>Nigeria Medical Emergency?</h4>
                <p>For life-threatening emergencies anywhere in Nigeria, dial national dispatch immediately:</p>
                <a href="tel:112" className="emergency-call-btn">
                  Call 112 Toll-Free Now
                </a>
              </div>
            </div>
          </aside>

          <div className="finder-results-content">
            <div className="results-toolbar">
              <div className="results-count">
                Showing <strong>{filteredFacilities.length}</strong> {filteredFacilities.length === 1 ? "facility" : "facilities"}
                {selectedState !== "All States" && <span className="active-filter-badge">{selectedState}</span>}
                {selectedLga !== "All LGAs" && <span className="active-filter-badge">{selectedLga} LGA</span>}
                {selectedType !== "all" && <span className="active-filter-badge">{selectedType}</span>}
              </div>

              <div className="view-mode-buttons">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`view-mode-btn ${viewMode === "grid" ? "active" : ""}`}
                  aria-label="Grid view"
                >
                  <i className="bi bi-grid-3x3-gap-fill"></i>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`view-mode-btn ${viewMode === "list" ? "active" : ""}`}
                  aria-label="List view"
                >
                  <i className="bi bi-list-ul"></i>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="spinner-border text-primary" role="status"></div>
                <p>Loading verified Nigerian healthcare facilities...</p>
              </div>
            ) : filteredFacilities.length === 0 ? (
              <div className="empty-results-box">
                <i className="bi bi-search text-muted display-4"></i>
                <h3>No Facilities Found</h3>
                <p>No healthcare facilities matched your current State/LGA or filter criteria.</p>
                <button onClick={resetFilters} className="button button-primary">
                  Clear Filters &amp; Show All
                </button>
              </div>
            ) : (
              <div className={`facilities-container ${viewMode === "list" ? "facilities-list-view" : "facilities-grid-view"}`}>
                {filteredFacilities.map((fac) => (
                  <article key={fac.id} className="facility-card">
                    <div className="card-top-row">
                      <div className="type-badge-group">
                        <span className={`facility-type-tag type-${fac.type.toLowerCase()}`}>
                          {fac.type}
                        </span>
                        {fac.isOpen24x7 && <span className="badge-247">24/7 OPEN</span>}
                        {fac.isVerified && (
                          <span className="badge-verified" title="Verified Facility">
                            <i className="bi bi-patch-check-fill"></i> Verified
                          </span>
                        )}
                      </div>

                      <div className="facility-rating" title={`${fac.rating} out of 5 stars`}>
                        <i className="bi bi-star-fill text-warning"></i>
                        <strong>{fac.rating}</strong>
                        <small>({fac.reviewCount})</small>
                      </div>
                    </div>

                    <h3 className="facility-name">{fac.name}</h3>
                    <div className="facility-category">{fac.tier || fac.category}</div>

                    <div className="facility-meta-list">
                      <div className="meta-item">
                        <i className="bi bi-geo-alt-fill text-primary"></i>
                        <span>{fac.address}, {fac.lga ? `${fac.lga} LGA, ` : ""}{fac.state}</span>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-clock-fill text-muted"></i>
                        <span>{fac.hours}</span>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-telephone-fill text-success"></i>
                        <a href={`tel:${fac.phone}`} className="phone-link">
                          {fac.phone}
                        </a>
                      </div>
                      {fac.bedsAvailable > 0 && (
                        <div className="meta-item">
                          <i className="bi bi-hospital text-info"></i>
                          <span><strong>{fac.bedsAvailable}</strong> available beds</span>
                        </div>
                      )}
                    </div>

                    {fac.services && fac.services.length > 0 && (
                      <div className="services-chips">
                        {fac.services.slice(0, 3).map((s) => (
                          <span key={s} className="service-chip">
                            {s}
                          </span>
                        ))}
                        {fac.services.length > 3 && (
                          <span className="service-chip chip-more">
                            +{fac.services.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="card-actions-row">
                      <a
                        href={`tel:${fac.emergencyPhone || fac.phone}`}
                        className="btn-call-facility"
                        title="Call Facility"
                      >
                        <i className="bi bi-telephone"></i> Call
                      </a>
                      <button
                        onClick={() => handleOpenModal(fac)}
                        className="button button-primary btn-details"
                      >
                        Facility Profile
                        <i className="bi bi-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedFacility && (
        <div className="modal-backdrop-custom" onClick={handleCloseModal}>
          <div className="facility-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <div>
                <div className="modal-badges">
                  <span className={`facility-type-tag type-${selectedFacility.type.toLowerCase()}`}>
                    {selectedFacility.type}
                  </span>
                  {selectedFacility.isOpen24x7 && <span className="badge-247">24/7 OPEN</span>}
                  {selectedFacility.isVerified && (
                    <span className="badge-verified">
                      <i className="bi bi-patch-check-fill"></i> Verified
                    </span>
                  )}
                </div>
                <h2>{selectedFacility.name}</h2>
                <div className="modal-category">{selectedFacility.tier || selectedFacility.category}</div>
              </div>
              <button onClick={handleCloseModal} className="btn-close-modal" aria-label="Close dialog">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body-custom">
              <div className="modal-grid">
                <div className="modal-details-col">
                  <div className="modal-section">
                    <h4>About this Facility</h4>
                    <p>{selectedFacility.description || "Verified Nigerian healthcare facility providing accredited clinical care."}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Clinical Services &amp; Specialties</h4>
                    <div className="modal-services-grid">
                      {selectedFacility.services?.map((serv) => (
                        <div key={serv} className="modal-service-tag">
                          <i className="bi bi-check2-circle text-primary me-2"></i>
                          {serv}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedFacility.insuranceProviders && (
                    <div className="modal-section">
                      <h4>Accepted NHIA &amp; HMO Schemes</h4>
                      <div className="insurance-tags-row">
                        {selectedFacility.insuranceProviders.map((ins) => (
                          <span key={ins} className="insurance-tag">
                            <i className="bi bi-shield-check text-success me-1"></i>
                            {ins}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="modal-section">
                    <h4>Location &amp; Contact</h4>
                    <div className="contact-details-grid">
                      <div className="cd-box">
                        <i className="bi bi-geo-alt text-primary"></i>
                        <div>
                          <strong>State / LGA / Address</strong>
                          <span>{selectedFacility.address}, {selectedFacility.lga} LGA, {selectedFacility.state}</span>
                        </div>
                      </div>
                      <div className="cd-box">
                        <i className="bi bi-clock text-info"></i>
                        <div>
                          <strong>Operating Hours</strong>
                          <span>{selectedFacility.hours}</span>
                        </div>
                      </div>
                      <div className="cd-box">
                        <i className="bi bi-telephone text-success"></i>
                        <div>
                          <strong>General Enquiries</strong>
                          <a href={`tel:${selectedFacility.phone}`}>{selectedFacility.phone}</a>
                        </div>
                      </div>
                      <div className="cd-box">
                        <i className="bi bi-lightning-charge-fill text-danger"></i>
                        <div>
                          <strong>Emergency Dispatch</strong>
                          <a href={`tel:${selectedFacility.emergencyPhone || selectedFacility.phone}`}>
                            {selectedFacility.emergencyPhone || selectedFacility.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-action-col">
                  <div className="inquiry-card">
                    <h4>Facility Inquiry</h4>
                    <p className="small text-muted">
                      Ask about clinic hours, NHIA/HMO clearance, or specialist availability.
                    </p>

                    {inquirySent ? (
                      <div className="alert alert-success">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Inquiry sent! The facility desk will respond shortly.
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setInquirySent(true);
                        }}
                      >
                        <FormInput
                          id="inqName"
                          label="Your Name"
                          required
                          icon="bi-person"
                          placeholder="e.g. Chinedu Okafor"
                        />
                        <FormInput
                          id="inqContact"
                          label="Phone / Email"
                          required
                          icon="bi-telephone"
                          placeholder="+234 803..."
                        />
                        <FormTextarea
                          id="inqMessage"
                          label="Inquiry"
                          required
                          rows={3}
                          placeholder="Inquire about antenatal clinic, NHIA coverage..."
                        />
                        <button type="submit" className="button button-primary w-100">
                          Submit Inquiry
                        </button>
                      </form>
                    )}

                    <div className="direct-call-box mt-3">
                      <a
                        href={`tel:${selectedFacility.phone}`}
                        className="btn-call-emergency-direct"
                      >
                        <i className="bi bi-telephone-fill me-2"></i>
                        Call Facility Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthcareFinder;
