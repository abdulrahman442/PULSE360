import { useState } from "react";
import { getProStore, saveProStore, appendAuditLog, generateId } from "../../services/proStore";
import { getCurrentUser } from "../../services/api";
import { NIGERIA_STATES } from "../../data/nigeriaGeo";

function ProIncidents() {
  const [store, setStore] = useState(getProStore);
  const [selectedIncidentId, setSelectedIncidentId] = useState(store.incidents[0]?.id || null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [feedback, setFeedback] = useState(null);

  const [newInc, setNewInc] = useState({
    title: "",
    type: "Waterborne Outbreak",
    severity: "Critical",
    state: "Lagos",
    lga: "Surulere",
    summary: "",
  });

  const user = getCurrentUser();
  const actorName = user?.name || "Public Health Officer";
  const actorRole = user?.roleLabel || "Public Health Officer";

  const selectedIncident = store.incidents.find((i) => i.id === selectedIncidentId) || store.incidents[0];

  const persist = (nextStore, msg) => {
    saveProStore(nextStore);
    setStore(nextStore);
    if (msg) {
      setFeedback(msg);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleCreateIncident = (e) => {
    e.preventDefault();
    const id = generateId("INC-2026");
    const created = {
      id,
      title: newInc.title,
      type: newInc.type,
      severity: newInc.severity,
      status: "ASSESSMENT",
      state: newInc.state,
      lga: newInc.lga,
      affectedFacilities: ["State General Hospital"],
      leadOfficer: actorName,
      summary: newInc.summary,
      tasks: [
        { id: generateId("t"), title: "Verify case definitions & facility stock readiness", done: false, assignee: "Public Health Officer" },
      ],
      createdAt: "Just now",
    };

    const nextStore = {
      ...store,
      incidents: [created, ...store.incidents],
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Created health incident`,
        object: `${id} (${newInc.state} - ${newInc.lga} LGA)`,
        previousStatus: "DRAFT",
        newStatus: "ASSESSMENT",
      }),
    };

    persist(nextStore, { type: "success", text: `Incident ${id} registered in ASSESSMENT status.` });
    setSelectedIncidentId(id);
    setShowCreateModal(false);
    setNewInc({ title: "", type: "Waterborne Outbreak", severity: "Critical", state: "Lagos", lga: "Surulere", summary: "" });
  };

  const handleUpdateStatus = (incident, nextStatus) => {
    const prev = incident.status;
    const nextIncidents = store.incidents.map((i) =>
      i.id === incident.id ? { ...i, status: nextStatus } : i
    );
    const nextStore = {
      ...store,
      incidents: nextIncidents,
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Transitioned incident lifecycle`,
        object: incident.id,
        previousStatus: prev,
        newStatus: nextStatus,
      }),
    };
    persist(nextStore, { type: "info", text: `${incident.id} transitioned: ${prev} → ${nextStatus}.` });
  };

  const handleToggleTask = (incidentId, taskId) => {
    const nextIncidents = store.incidents.map((inc) => {
      if (inc.id !== incidentId) return inc;
      return {
        ...inc,
        tasks: inc.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
      };
    });
    persist({ ...store, incidents: nextIncidents });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !selectedIncident) return;
    const nextIncidents = store.incidents.map((inc) => {
      if (inc.id !== selectedIncident.id) return inc;
      return {
        ...inc,
        tasks: [
          ...inc.tasks,
          { id: generateId("t"), title: newTaskText.trim(), done: false, assignee: actorRole },
        ],
      };
    });
    persist({ ...store, incidents: nextIncidents }, { type: "success", text: "Response task added." });
    setNewTaskText("");
  };

  return (
    <div className="pro-page">
      <div className="pro-page-header">
        <div>
          <span className="section-eyebrow">INCIDENT &amp; RESPONSE MANAGEMENT</span>
          <h1>Public Health Incidents &amp; Coordination</h1>
          <p className="text-muted small mb-0">
            Lifecycle: DRAFT → ASSESSMENT → ACTIVE → MONITORING → RESOLVED → CLOSED (with Emergency Escalation).
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="button button-primary"
          style={{ minHeight: "42px" }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Create Incident
        </button>
      </div>

      {feedback && (
        <div className={`alert alert-${feedback.type} py-2 small mb-3`} role="alert">
          {feedback.text}
        </div>
      )}

      <div className="pro-two-col">
        {/* Left: Incidents List */}
        <div className="d-flex flex-column gap-3">
          {store.incidents.map((inc) => (
            <div
              key={inc.id}
              onClick={() => setSelectedIncidentId(inc.id)}
              className={`pro-panel incident-select-card ${selectedIncident?.id === inc.id ? "is-selected" : ""}`}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className={`status-chip ${inc.severity === "Critical" ? "critical" : "warning"}`}>
                  {inc.severity}
                </span>
                <span className="status-chip info">{inc.status}</span>
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 800 }}>{inc.title}</h4>
              <div className="small text-muted mb-2">
                <i className="bi bi-geo-alt me-1"></i> {inc.lga} LGA, {inc.state} · {inc.id}
              </div>
              <div className="small text-muted">
                Lead: <strong>{inc.leadOfficer}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected Incident Inspector */}
        {selectedIncident && (
          <div className="pro-panel">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 border-bottom pb-3 mb-3">
              <div>
                <span className="section-eyebrow">{selectedIncident.type.toUpperCase()}</span>
                <h2 style={{ fontSize: "20px", fontWeight: 800 }}>{selectedIncident.title}</h2>
                <div className="small text-muted">
                  Location: <strong>{selectedIncident.lga} LGA, {selectedIncident.state}</strong> · Created: {selectedIncident.createdAt}
                </div>
              </div>
              <span className="status-chip info">{selectedIncident.status}</span>
            </div>

            <p className="small">{selectedIncident.summary}</p>

            {/* Lifecycle Action Buttons */}
            <div className="p-3 rounded bg-light mb-4">
              <strong className="small d-block mb-2">Incident Lifecycle Controls:</strong>
              <div className="d-flex gap-2 flex-wrap">
                {["ASSESSMENT", "ACTIVE", "ESCALATED", "MONITORING", "RESOLVED", "CLOSED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedIncident, st)}
                    disabled={selectedIncident.status === st}
                    className={`btn-mini-action ${selectedIncident.status === st ? "bg-dark text-white" : ""}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Affected Facilities */}
            <div className="mb-4">
              <h5 style={{ fontSize: "14px", fontWeight: 800 }}>Affected / Designated Facilities</h5>
              <div className="affected-chips">
                {selectedIncident.affectedFacilities.map((f) => (
                  <span key={f} className="area-chip">{f}</span>
                ))}
              </div>
            </div>

            {/* Response Tasks */}
            <div>
              <h5 style={{ fontSize: "14px", fontWeight: 800 }}>Response Plan Tasks</h5>
              <div className="d-flex flex-column gap-2 mb-3">
                {selectedIncident.tasks.map((task) => (
                  <label
                    key={task.id}
                    className="d-flex align-items-center gap-2 p-2 rounded border"
                    style={{ cursor: "pointer", background: task.done ? "#f0fdf4" : "#fff" }}
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => handleToggleTask(selectedIncident.id, task.id)}
                    />
                    <span className={`small flex-1 ${task.done ? "text-decoration-line-through text-muted" : ""}`}>
                      {task.title}
                    </span>
                    <span className="area-chip">{task.assignee}</span>
                  </label>
                ))}
              </div>

              <form onSubmit={handleAddTask} className="d-flex gap-2">
                <input
                  type="text"
                  placeholder="Assign new response task..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="form-control form-control-sm"
                />
                <button type="submit" className="btn-mini-action bg-primary text-white border-primary">
                  Add Task
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Create Incident Modal */}
      {showCreateModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowCreateModal(false)}>
          <div className="subscription-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h2>Register New Health Incident</h2>
              <button onClick={() => setShowCreateModal(false)} className="btn-close-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <form onSubmit={handleCreateIncident}>
                <div className="mb-3">
                  <label className="form-label">Incident Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suspected Diphtheria Cluster — Dala LGA"
                    value={newInc.title}
                    onChange={(e) => setNewInc({ ...newInc, title: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Incident Type</label>
                    <select
                      value={newInc.type}
                      onChange={(e) => setNewInc({ ...newInc, type: e.target.value })}
                      className="form-select"
                    >
                      <option value="Waterborne Outbreak">Waterborne Outbreak (Cholera)</option>
                      <option value="Viral Hemorrhagic Fever">Lassa Fever / VHF</option>
                      <option value="Vaccine-Preventable">Diphtheria / Measles</option>
                      <option value="Supply Emergency">Critical Supply Shortage</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Severity</label>
                    <select
                      value={newInc.severity}
                      onChange={(e) => setNewInc({ ...newInc, severity: e.target.value })}
                      className="form-select"
                    >
                      <option value="Critical">Critical</option>
                      <option value="Warning">Warning</option>
                      <option value="Advisory">Advisory</option>
                    </select>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">State</label>
                    <select
                      value={newInc.state}
                      onChange={(e) => {
                        const st = e.target.value;
                        const found = NIGERIA_STATES.find((s) => s.name === st);
                        setNewInc({ ...newInc, state: st, lga: found?.lgas[0] || "" });
                      }}
                      className="form-select"
                    >
                      {NIGERIA_STATES.map((s) => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">LGA</label>
                    <select
                      value={newInc.lga}
                      onChange={(e) => setNewInc({ ...newInc, lga: e.target.value })}
                      className="form-select"
                    >
                      {(NIGERIA_STATES.find((s) => s.name === newInc.state)?.lgas || []).map((l) => (
                        <option key={l} value={l}>{l} LGA</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Situation Summary *</label>
                  <textarea
                    rows="3"
                    required
                    value={newInc.summary}
                    onChange={(e) => setNewInc({ ...newInc, summary: e.target.value })}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="button button-outline">
                    Cancel
                  </button>
                  <button type="submit" className="button button-primary">
                    Create Incident
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProIncidents;
