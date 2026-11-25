import { useState } from "react";
import { Link } from "react-router-dom";
import { getProStore, computeInventoryStatus } from "../../services/proStore";
import { healthcareFacilities } from "../../data/facilities";

function ProDashboard() {
  const [store] = useState(getProStore);

  const activeIncidents = store.incidents.filter((i) => i.status !== "CLOSED" && i.status !== "RESOLVED");
  const criticalStock = store.inventory.filter((item) => {
    const st = computeInventoryStatus(item);
    return st === "Critical" || st === "Out of Stock";
  });
  const pendingRequests = store.supplyRequests.filter((r) => ["Submitted", "Under Review", "Approved"].includes(r.status));
  const inTransitShipments = store.shipments.filter((s) => ["In Transit", "Picked Up", "Assigned", "Arriving"].includes(s.status));

  return (
    <div className="pro-page">
      <div className="pro-page-header">
        <div>
          <span className="section-eyebrow">OPERATIONAL COMMAND CENTER</span>
          <h1>PULSE360 Operations Dashboard</h1>
          <p className="text-muted small mb-0">
            Real-time overview of Nigerian health incidents, medical supply stockouts, warehouse allocations, and logistics.
          </p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/pro/supply-chain" className="button button-primary" style={{ minHeight: "40px" }}>
            <i className="bi bi-plus-circle me-1"></i> New Supply Request
          </Link>
          <Link to="/pro/incidents" className="button button-outline" style={{ minHeight: "40px" }}>
            <i className="bi bi-exclamation-triangle me-1"></i> Report Incident
          </Link>
        </div>
      </div>

      {/* KPI Row (Matches PRD Professional Dashboard) */}
      <div className="pro-kpi-grid">
        <div className="pro-kpi-card kpi-critical">
          <div className="kpi-icon"><i className="bi bi-exclamation-diamond-fill"></i></div>
          <div>
            <span className="kpi-label">Active Incidents</span>
            <h3>{activeIncidents.length}</h3>
            <small>Lagos &amp; Ondo surveillance</small>
          </div>
        </div>

        <div className="pro-kpi-card kpi-warning">
          <div className="kpi-icon"><i className="bi bi-box2-heart-fill"></i></div>
          <div>
            <span className="kpi-label">Critical Stock Items</span>
            <h3>{criticalStock.length}</h3>
            <small>Immediate replenishment needed</small>
          </div>
        </div>

        <div className="pro-kpi-card kpi-info">
          <div className="kpi-icon"><i className="bi bi-clipboard-check-fill"></i></div>
          <div>
            <span className="kpi-label">Pending Supply Requests</span>
            <h3>{pendingRequests.length}</h3>
            <small>Awaiting review / allocation</small>
          </div>
        </div>

        <div className="pro-kpi-card kpi-primary">
          <div className="kpi-icon"><i className="bi bi-truck"></i></div>
          <div>
            <span className="kpi-label">Shipments In Transit</span>
            <h3>{inTransitShipments.length}</h3>
            <small>Active medical deliveries</small>
          </div>
        </div>

        <div className="pro-kpi-card kpi-success">
          <div className="kpi-icon"><i className="bi bi-hospital-fill"></i></div>
          <div>
            <span className="kpi-label">Verified Facilities</span>
            <h3>{healthcareFacilities.length}</h3>
            <small>Connected across Nigeria</small>
          </div>
        </div>
      </div>

      {/* Two-column Command Grid */}
      <div className="pro-two-col mt-4">
        {/* Priority Actions */}
        <div className="pro-panel">
          <div className="pro-panel-header">
            <h3><i className="bi bi-lightning-charge-fill text-warning me-2"></i>Priority Operational Actions</h3>
            <Link to="/pro/supply-chain" className="small text-primary fw-bold">Manage Queue →</Link>
          </div>

          <div className="pro-action-list">
            {criticalStock.map((item) => (
              <div key={item.id} className="pro-action-item status-critical">
                <div>
                  <span className="status-chip critical">{computeInventoryStatus(item)}</span>
                  <strong>{item.product}</strong>
                  <div className="small text-muted">
                    {item.location} ({item.state}) — Qty: {item.quantity} / Min: {item.minStock}
                  </div>
                </div>
                <Link to="/pro/supply-chain" className="btn-mini-action">
                  Request Stock
                </Link>
              </div>
            ))}

            {pendingRequests.map((req) => (
              <div key={req.id} className="pro-action-item status-warning">
                <div>
                  <span className="status-chip warning">{req.status}</span>
                  <strong>{req.id}: {req.product} (x{req.quantity})</strong>
                  <div className="small text-muted">
                    Requested by {req.facility} ({req.state}) · Priority: {req.priority}
                  </div>
                </div>
                <Link to="/pro/supply-chain" className="btn-mini-action">
                  Review / Allocate
                </Link>
              </div>
            ))}

            {store.shipments
              .filter((s) => s.status === "Delivered")
              .map((shp) => (
                <div key={shp.id} className="pro-action-item status-info">
                  <div>
                    <span className="status-chip info">Delivered · Unverified</span>
                    <strong>{shp.id}: {shp.product} (x{shp.quantity})</strong>
                    <div className="small text-muted">
                      Destination: {shp.destination} · PoD signed by {shp.pod?.receiverName}
                    </div>
                  </div>
                  <Link to="/pro/logistics" className="btn-mini-action">
                    Verify Delivery
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Audit & Operational Activity */}
        <div className="pro-panel">
          <div className="pro-panel-header">
            <h3><i className="bi bi-clock-history text-primary me-2"></i>Recent Operational Activity</h3>
            <Link to="/pro/admin" className="small text-primary fw-bold">Full Audit Log →</Link>
          </div>

          <div className="pro-audit-feed">
            {store.auditLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="pro-audit-row">
                <div className="audit-dot"></div>
                <div className="audit-body">
                  <div className="d-flex justify-content-between">
                    <strong>{log.action}</strong>
                    <span className="small text-muted">{log.time}</span>
                  </div>
                  <div className="small text-dark">{log.object}</div>
                  <div className="small text-muted">
                    By {log.who} ({log.role}) ·{" "}
                    <span className="text-secondary">{log.previousStatus}</span> →{" "}
                    <span className="text-primary fw-bold">{log.newStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProDashboard;
