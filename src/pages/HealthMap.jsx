import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";
import { NIGERIA_STATES } from "../data/nigeriaGeo";
import { healthAlerts } from "../data/alerts";
import { healthcareFacilities } from "../data/facilities";

const ZONES = ["All Zones", "South-West", "North-Central", "North-West", "South-South", "South-East", "North-East"];

function HealthMap() {
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedState, setSelectedState] = useState(NIGERIA_STATES[0]);

  const statesInZone = useMemo(() => {
    if (selectedZone === "All Zones") return NIGERIA_STATES;
    return NIGERIA_STATES.filter((s) => s.zone === selectedZone);
  }, [selectedZone]);

  const stateAlerts = useMemo(() => {
    return healthAlerts.filter(
      (a) => a.state?.toLowerCase() === selectedState.name.toLowerCase() || a.region.toLowerCase().includes(selectedState.name.toLowerCase())
    );
  }, [selectedState]);

  const stateFacilities = useMemo(() => {
    return healthcareFacilities.filter(
      (f) => f.state?.toLowerCase() === selectedState.name.toLowerCase()
    );
  }, [selectedState]);

  const getStateAlertLevel = (stateName) => {
    const matches = healthAlerts.filter(
      (a) => a.state?.toLowerCase() === stateName.toLowerCase() || a.region.toLowerCase().includes(stateName.toLowerCase())
    );
    if (matches.some((a) => a.severity === "critical")) return "critical";
    if (matches.some((a) => a.severity === "warning")) return "warning";
    return "normal";
  };

  return (
    <div className="health-map-page">
      <section className="finder-header-banner">
        <div className="container">
          <Reveal>
            <div className="header-meta">
              <span className="section-eyebrow">NIGERIA GEOSPATIAL HEALTH INTELLIGENCE</span>
              <h1>Public Health Map & State Coverage</h1>
              <p className="page-lead">
                Explore active NCDC public health advisories, verified healthcare facilities, and LGA coverage across Nigeria&apos;s geopolitical zones.
              </p>
            </div>
          </Reveal>

          <div className="type-pills-row mt-4">
            {ZONES.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`type-pill ${selectedZone === zone ? "active" : ""}`}
              >
                <i className="bi bi-compass me-1"></i>
                {zone}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="map-explorer-grid">
            {/* Left: Interactive State & Zone Grid */}
            <div className="map-states-panel">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0" style={{ fontSize: "18px", fontWeight: 800 }}>
                  Select State ({statesInZone.length} Monitored)
                </h3>
                <div className="map-legend">
                  <span className="legend-dot critical"></span> Critical
                  <span className="legend-dot warning ms-2"></span> Advisory
                  <span className="legend-dot normal ms-2"></span> Normal
                </div>
              </div>

              <div className="nigeria-states-grid">
                {statesInZone.map((st) => {
                  const level = getStateAlertLevel(st.name);
                  const facCount = healthcareFacilities.filter((f) => f.state === st.name).length;
                  const isActive = selectedState.name === st.name;

                  return (
                    <button
                      key={st.name}
                      type="button"
                      onClick={() => setSelectedState(st)}
                      className={`state-map-tile status-${level} ${isActive ? "is-selected" : ""}`}
                    >
                      <div className="smt-top">
                        <span className="smt-zone">{st.zone}</span>
                        <span className={`smt-status-dot ${level}`}></span>
                      </div>
                      <h4>{st.name}</h4>
                      <div className="smt-meta">
                        <span><i className="bi bi-hospital me-1"></i>{facCount} Facilities</span>
                        <span><i className="bi bi-geo me-1"></i>{st.lgas.length} LGAs</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected State Detail Inspector */}
            <aside className="map-state-inspector">
              <div className="inspector-card">
                <div className="inspector-header">
                  <div>
                    <span className="section-eyebrow">{selectedState.zone.toUpperCase()}</span>
                    <h2>{selectedState.name} State</h2>
                    <p className="small text-muted mb-0">
                      Capital: <strong>{selectedState.capital}</strong> · Coordinates: {selectedState.coords.lat}°N, {selectedState.coords.lng}°E
                    </p>
                  </div>
                  <Link
                    to={`/find-healthcare?state=${encodeURIComponent(selectedState.name)}`}
                    className="button button-primary"
                    style={{ minHeight: "38px", fontSize: "12px" }}
                  >
                    Find Care in {selectedState.name}
                  </Link>
                </div>

                {/* LGAs */}
                <div className="inspector-section">
                  <h5>Covered Local Government Areas (LGAs)</h5>
                  <div className="affected-chips">
                    {selectedState.lgas.map((lga) => (
                      <span key={lga} className="area-chip">{lga}</span>
                    ))}
                  </div>
                </div>

                {/* Active Alerts in State */}
                <div className="inspector-section">
                  <h5>Active Public Health Alerts ({stateAlerts.length})</h5>
                  {stateAlerts.length === 0 ? (
                    <div className="p-3 rounded bg-light small text-muted">
                      <i className="bi bi-shield-check text-success me-2"></i>
                      No critical outbreaks currently flagged in {selectedState.name}. Routine surveillance active.
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                      {stateAlerts.map((alert) => (
                        <Link
                          key={alert.id}
                          to={`/alerts/${alert.id}`}
                          className={`inspector-alert-row severity-${alert.severity}`}
                        >
                          <div>
                            <span className={`severity-tag ${alert.severity} me-2`}>
                              {alert.severity.toUpperCase()}
                            </span>
                            <strong>{alert.title}</strong>
                          </div>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verified Facilities in State */}
                <div className="inspector-section mb-0">
                  <h5>Verified Facilities ({stateFacilities.length})</h5>
                  {stateFacilities.length === 0 ? (
                    <div className="p-3 rounded bg-light small text-muted">
                      Partner facilities in {selectedState.name} are onboarding.{" "}
                      <Link to="/register-company" className="text-primary fw-bold">Register a facility</Link>.
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                      {stateFacilities.map((fac) => (
                        <div key={fac.id} className="sidebar-facility-mini">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6>{fac.name}</h6>
                              <span className="small text-muted">
                                {fac.lga} LGA · {fac.tier}
                              </span>
                            </div>
                            {fac.isOpen24x7 && <span className="badge-247">24/7</span>}
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="small">{fac.phone}</span>
                            <Link to={`/find-healthcare?id=${fac.id}`} className="small text-primary fw-bold">
                              Profile <i className="bi bi-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HealthMap;
