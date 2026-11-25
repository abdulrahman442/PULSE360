import { useState } from "react";
import { Link } from "react-router-dom";
import { getProStore, computeInventoryStatus } from "../../services/proStore";
import { healthAlerts } from "../../data/alerts";
import { NIGERIA_STATES } from "../../data/nigeriaGeo";

function ProIntelligence() {
  const [store] = useState(getProStore);

  const totalRequests = store.supplyRequests.length;
  const fulfilledOrActive = store.supplyRequests.filter((r) =>
    ["Allocated", "Shipped", "Delivered", "Verified"].includes(r.status)
  ).length;
  const fulfillmentRate = totalRequests > 0 ? Math.round((fulfilledOrActive / totalRequests) * 100) : 100;

  const deliveredShipments = store.shipments.filter((s) =>
    ["Delivered", "Verified"].includes(s.status)
  ).length;
  const deliveryRate = store.shipments.length > 0 ? Math.round((deliveredShipments / store.shipments.length) * 100) : 100;

  const criticalStockCount = store.inventory.filter((i) => {
    const st = computeInventoryStatus(i);
    return st === "Critical" || st === "Out of Stock";
  }).length;

  return (
    <div className="pro-page">
      <div className="pro-page-header">
        <div>
          <span className="section-eyebrow">HEALTH INTELLIGENCE &amp; MVP ANALYTICS</span>
          <h1>Surveillance &amp; Supply Chain Analytics</h1>
          <p className="text-muted small mb-0">
            Track supply request fulfillment, delivery completion, stockout risk, and state-level health risk indicators across Nigeria.
          </p>
        </div>
        <Link to="/health-map" className="button button-outline" style={{ minHeight: "40px" }}>
          <i className="bi bi-map me-1"></i> Open Public Health Map
        </Link>
      </div>

      {/* MVP Success Metrics Row (PRD Section: MVP Success Metrics) */}
      <div className="pro-kpi-grid mb-4">
        <div className="pro-kpi-card kpi-primary">
          <div className="kpi-icon"><i className="bi bi-check2-circle"></i></div>
          <div>
            <span className="kpi-label">Supply Fulfillment Rate</span>
            <h3>{fulfillmentRate}%</h3>
            <small>{fulfilledOrActive} of {totalRequests} requests processed</small>
          </div>
        </div>

        <div className="pro-kpi-card kpi-success">
          <div className="kpi-icon"><i className="bi bi-truck"></i></div>
          <div>
            <span className="kpi-label">Delivery Completion</span>
            <h3>{deliveryRate}%</h3>
            <small>{deliveredShipments} of {store.shipments.length} shipments delivered</small>
          </div>
        </div>

        <div className="pro-kpi-card kpi-warning">
          <div className="kpi-icon"><i className="bi bi-graph-down-arrow"></i></div>
          <div>
            <span className="kpi-label">Stockout Alerts Detected</span>
            <h3>{criticalStockCount}</h3>
            <small>Rule-based replenishment triggers</small>
          </div>
        </div>

        <div className="pro-kpi-card kpi-info">
          <div className="kpi-icon"><i className="bi bi-broadcast"></i></div>
          <div>
            <span className="kpi-label">Public Health Signals</span>
            <h3>{healthAlerts.length}</h3>
            <small>Active NCDC / NAFDAC advisories</small>
          </div>
        </div>
      </div>

      <div className="pro-two-col">
        {/* State Risk Indicators */}
        <div className="pro-panel">
          <div className="pro-panel-header">
            <h3><i className="bi bi-shield-exclamation text-danger me-2"></i>State Risk &amp; Readiness Indicators</h3>
          </div>
          <div className="table-responsive">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>State (Zone)</th>
                  <th>Active Alerts</th>
                  <th>Incidents</th>
                  <th>Stock Risk</th>
                  <th>Readiness</th>
                </tr>
              </thead>
              <tbody>
                {NIGERIA_STATES.slice(0, 7).map((st) => {
                  const alertsCount = healthAlerts.filter((a) => a.state === st.name && a.severity !== "resolved").length;
                  const incCount = store.incidents.filter((i) => i.state === st.name && i.status !== "CLOSED").length;
                  const stockRisks = store.inventory.filter(
                    (inv) => inv.state === st.name && inv.locationType === "Facility" && computeInventoryStatus(inv) !== "Normal"
                  ).length;
                  const riskLabel = alertsCount > 0 || incCount > 0 ? "Elevated" : "Normal";

                  return (
                    <tr key={st.name}>
                      <td>
                        <strong>{st.name}</strong>
                        <div className="small text-muted">{st.zone}</div>
                      </td>
                      <td>{alertsCount}</td>
                      <td>{incCount}</td>
                      <td>{stockRisks > 0 ? <span className="text-danger fw-bold">{stockRisks} Low/Out</span> : "0"}</td>
                      <td>
                        <span className={`status-chip ${riskLabel === "Elevated" ? "warning" : "success"}`}>
                          {riskLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disease & Operational Trends */}
        <div className="pro-panel">
          <div className="pro-panel-header">
            <h3><i className="bi bi-bar-chart-line text-primary me-2"></i>Active Health Event Overview</h3>
          </div>
          <div className="d-flex flex-column gap-3">
            {healthAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="p-3 rounded border bg-light">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className={`severity-tag ${alert.severity}`}>{alert.severity.toUpperCase()}</span>
                  <span className="small text-muted">{alert.state} · {alert.publishedDate}</span>
                </div>
                <strong className="small d-block mb-1">{alert.title}</strong>
                <div className="small text-muted">{alert.issuingAgency}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProIntelligence;
