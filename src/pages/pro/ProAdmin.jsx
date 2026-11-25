import { useState } from "react";
import { getProStore, RBAC_MATRIX, resetProStore } from "../../services/proStore";
import { getStoredCompanies } from "../../services/api";

function ProAdmin() {
  const [store, setStore] = useState(getProStore);
  const [registeredCompanies] = useState(getStoredCompanies);
  const [activeTab, setActiveTab] = useState("audit");

  const handleResetDemo = () => {
    const fresh = resetProStore();
    setStore(fresh);
  };

  return (
    <div className="pro-page">
      <div className="pro-page-header">
        <div>
          <span className="section-eyebrow">ADMINISTRATION, RBAC &amp; AUDITABILITY</span>
          <h1>Multi-Tenant Governance &amp; Audit Logs</h1>
          <p className="text-muted small mb-0">
            Manage Nigerian healthcare organizations, role-based access permissions, facility verifications, and immutable audit trails.
          </p>
        </div>
        <button onClick={handleResetDemo} className="button button-outline" style={{ minHeight: "40px" }}>
          <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Demo Data
        </button>
      </div>

      <div className="pro-tabs-bar">
        <button onClick={() => setActiveTab("audit")} className={`pro-tab-btn ${activeTab === "audit" ? "active" : ""}`}>
          <i className="bi bi-journal-text me-1"></i> Audit Logs ({store.auditLogs.length})
        </button>
        <button onClick={() => setActiveTab("rbac")} className={`pro-tab-btn ${activeTab === "rbac" ? "active" : ""}`}>
          <i className="bi bi-shield-lock me-1"></i> RBAC Permissions Matrix
        </button>
        <button onClick={() => setActiveTab("orgs")} className={`pro-tab-btn ${activeTab === "orgs" ? "active" : ""}`}>
          <i className="bi bi-buildings me-1"></i> Organizations ({store.organizations.length + registeredCompanies.length})
        </button>
      </div>

      {/* Audit Logs */}
      {activeTab === "audit" && (
        <div className="pro-panel">
          <div className="table-responsive">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Who (Actor &amp; Role)</th>
                  <th>Action</th>
                  <th>Object</th>
                  <th>Status Transition</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {store.auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td><strong>{log.id}</strong></td>
                    <td>
                      <strong>{log.who}</strong>
                      <div className="small text-muted">{log.role}</div>
                    </td>
                    <td>{log.action}</td>
                    <td><strong>{log.object}</strong></td>
                    <td>
                      <span className="area-chip">{log.previousStatus}</span>
                      <i className="bi bi-arrow-right mx-1 text-muted"></i>
                      <span className="status-chip info">{log.newStatus}</span>
                    </td>
                    <td className="small text-muted">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RBAC Permissions Matrix (Matches PRD Table) */}
      {activeTab === "rbac" && (
        <div className="pro-panel">
          <h4 className="mb-3" style={{ fontSize: "16px", fontWeight: 800 }}>
            Role-Based Access Control (PRD Configuration)
          </h4>
          <div className="table-responsive">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Dashboard</th>
                  <th>Inventory &amp; Supply</th>
                  <th>Incidents</th>
                  <th>Logistics</th>
                  <th>Administration</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(RBAC_MATRIX).map(([key, perm]) => (
                  <tr key={key}>
                    <td><strong>{perm.label}</strong></td>
                    <td>{perm.dashboard ? "✅ Full" : "Public Only"}</td>
                    <td>{perm.supplyChain === true ? "✅ Full" : perm.supplyChain === "view" ? "👁 View" : "—"}</td>
                    <td>{perm.incidents === true ? "✅ Full" : perm.incidents === "limited" ? "⚠ Limited" : "—"}</td>
                    <td>{perm.logistics === true ? "✅ Full" : perm.logistics === "view" ? "👁 View" : "—"}</td>
                    <td>{perm.admin ? "✅ Full" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Multi-Tenant Organizations */}
      {activeTab === "orgs" && (
        <div className="pro-panel">
          <div className="table-responsive">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Organization Name</th>
                  <th>Type / Classification</th>
                  <th>State</th>
                  <th>Subscription Tier</th>
                  <th>Verification</th>
                </tr>
              </thead>
              <tbody>
                {store.organizations.map((org) => (
                  <tr key={org.id}>
                    <td><strong>{org.name}</strong></td>
                    <td>{org.type}</td>
                    <td>{org.state}</td>
                    <td><span className="area-chip">{org.plan}</span></td>
                    <td><span className="status-chip success">{org.status}</span></td>
                  </tr>
                ))}
                {registeredCompanies.map((comp) => (
                  <tr key={comp.id}>
                    <td><strong>{comp.name}</strong></td>
                    <td>{comp.type} ({comp.category})</td>
                    <td>{comp.state} · {comp.lga} LGA</td>
                    <td><span className="area-chip">Basic (Onboarded)</span></td>
                    <td><span className="status-chip success">{comp.status || "Verified"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProAdmin;
