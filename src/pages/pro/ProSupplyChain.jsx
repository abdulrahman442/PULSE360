import { useState } from "react";
import {
  getProStore,
  saveProStore,
  computeInventoryStatus,
  getReplenishmentRecommendation,
  appendAuditLog,
  generateId,
} from "../../services/proStore";
import { getCurrentUser } from "../../services/api";

function ProSupplyChain() {
  const [store, setStore] = useState(getProStore);
  const [activeTab, setActiveTab] = useState("inventory");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [allocatingReq, setAllocatingReq] = useState(null);
  const [allocateQty, setAllocateQty] = useState(0);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");
  const [feedback, setFeedback] = useState(null);

  // New Supply Request Form State
  const [newReq, setNewReq] = useState({
    sku: "MED-ORS-500",
    quantity: 100,
    priority: "Critical",
    facility: "LUTH Idi-Araba",
    state: "Lagos",
    lga: "Surulere",
    requiredDate: "2026-11-28",
    justification: "",
  });

  const user = getCurrentUser();
  const actorName = user?.name || "Supply Officer";
  const actorRole = user?.roleLabel || "Staff";

  const persist = (nextStore, msg) => {
    saveProStore(nextStore);
    setStore(nextStore);
    if (msg) {
      setFeedback(msg);
      setTimeout(() => setFeedback(null), 4500);
    }
  };

  const filteredInventory = store.inventory.filter((item) => {
    if (locationFilter === "all") return true;
    return item.locationType.toLowerCase() === locationFilter;
  });

  const handleCreateRequest = (e, asDraft = false) => {
    e.preventDefault();
    const matchedProd = store.inventory.find((i) => i.sku === newReq.sku);
    const id = generateId("REQ");
    const status = asDraft ? "Draft" : "Submitted";

    const created = {
      id,
      sku: newReq.sku,
      product: matchedProd?.product || newReq.sku,
      quantity: Number(newReq.quantity),
      allocatedQty: 0,
      priority: newReq.priority,
      facility: newReq.facility,
      state: newReq.state,
      lga: newReq.lga,
      requestedBy: actorName,
      requiredDate: newReq.requiredDate,
      status,
      justification: newReq.justification || "Facility replenishment request.",
      createdAt: "Just now",
    };

    const nextStore = {
      ...store,
      supplyRequests: [created, ...store.supplyRequests],
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: asDraft ? "Saved draft supply request" : "Submitted supply request",
        object: `${id} (${created.product} x${created.quantity})`,
        previousStatus: "New",
        newStatus: status,
      }),
    };

    persist(nextStore, { type: "success", text: `Supply Request ${id} (${status}) saved.` });
    setShowRequestModal(false);
    setActiveTab("requests");
  };

  const handleAdvanceRequest = (req, nextStatus) => {
    const prevStatus = req.status;
    const nextRequests = store.supplyRequests.map((r) =>
      r.id === req.id ? { ...r, status: nextStatus } : r
    );
    const nextStore = {
      ...store,
      supplyRequests: nextRequests,
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Updated supply request status`,
        object: `${req.id} (${req.facility})`,
        previousStatus: prevStatus,
        newStatus: nextStatus,
      }),
    };
    persist(nextStore, { type: "info", text: `${req.id} moved from ${prevStatus} → ${nextStatus}.` });
  };

  const openAllocationModal = (req) => {
    const matchingWarehouses = store.inventory.filter(
      (i) => i.locationType === "Warehouse" && i.sku === req.sku && i.quantity > 0
    );
    setAllocatingReq(req);
    setAllocateQty(req.quantity);
    setSelectedWarehouseId(matchingWarehouses[0]?.id || "");
  };

  const handleConfirmAllocation = (e) => {
    e.preventDefault();
    if (!allocatingReq) return;

    const whItem = store.inventory.find((i) => i.id === selectedWarehouseId);
    if (!whItem) {
      setFeedback({ type: "danger", text: "No warehouse stock found for this SKU." });
      return;
    }

    const qtyToAllocate = Number(allocateQty);
    // PRD Rule: Prevent allocating more inventory than available
    if (qtyToAllocate <= 0 || qtyToAllocate > whItem.quantity) {
      setFeedback({
        type: "danger",
        text: `Allocation blocked: Cannot allocate ${qtyToAllocate} units. Only ${whItem.quantity} units available at ${whItem.location}.`,
      });
      return;
    }

    const nextInventory = store.inventory.map((item) =>
      item.id === whItem.id ? { ...item, quantity: item.quantity - qtyToAllocate } : item
    );

    const newShipmentId = generateId("SHP");
    const newShipment = {
      id: newShipmentId,
      requestId: allocatingReq.id,
      product: allocatingReq.product,
      sku: allocatingReq.sku,
      quantity: qtyToAllocate,
      origin: whItem.location,
      destination: allocatingReq.facility,
      state: allocatingReq.state,
      driverName: "Unassigned — Dispatch Queue",
      vehiclePlate: "Pending",
      eta: "Awaiting Pickup",
      status: "Pending",
      pod: null,
      createdAt: "Just now",
    };

    const nextRequests = store.supplyRequests.map((r) =>
      r.id === allocatingReq.id
        ? { ...r, allocatedQty: qtyToAllocate, status: "Allocated" }
        : r
    );

    const nextStore = {
      ...store,
      inventory: nextInventory,
      supplyRequests: nextRequests,
      shipments: [newShipment, ...store.shipments],
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Allocated ${qtyToAllocate} units & created shipment ${newShipmentId}`,
        object: `${allocatingReq.id} from ${whItem.location}`,
        previousStatus: allocatingReq.status,
        newStatus: "Allocated",
      }),
    };

    persist(nextStore, {
      type: "success",
      text: `Allocated ${qtyToAllocate} units from ${whItem.location}. Shipment ${newShipmentId} created in Logistics!`,
    });
    setAllocatingReq(null);
  };

  const prefillRequestFromItem = (item, recommendedQty) => {
    setNewReq({
      sku: item.sku,
      quantity: recommendedQty,
      priority: "Critical",
      facility: item.location,
      state: item.state,
      lga: "Central",
      requiredDate: "2026-11-27",
      justification: `Intelligent Replenishment alert: stock at ${item.quantity} (Min ${item.minStock}).`,
    });
    setShowRequestModal(true);
  };

  return (
    <div className="pro-page">
      <div className="pro-page-header">
        <div>
          <span className="section-eyebrow">SUPPLY CHAIN &amp; WAREHOUSE MODULE</span>
          <h1>Inventory, Requests &amp; Stock Allocation</h1>
          <p className="text-muted small mb-0">
            End-to-end traceability: Need → Request → Warehouse Check → Allocation → Shipment Creation.
          </p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="button button-primary"
          style={{ minHeight: "42px" }}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Create Supply Request
        </button>
      </div>

      {feedback && (
        <div className={`alert alert-${feedback.type} py-2 small mb-3`} role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          {feedback.text}
        </div>
      )}

      {/* Sub-navigation Tabs */}
      <div className="pro-tabs-bar">
        <button
          onClick={() => setActiveTab("inventory")}
          className={`pro-tab-btn ${activeTab === "inventory" ? "active" : ""}`}
        >
          <i className="bi bi-boxes me-1"></i> Inventory &amp; Replenishment ({store.inventory.length})
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`pro-tab-btn ${activeTab === "requests" ? "active" : ""}`}
        >
          <i className="bi bi-clipboard-check me-1"></i> Supply Requests ({store.supplyRequests.length})
        </button>
        <button
          onClick={() => setActiveTab("warehouses")}
          className={`pro-tab-btn ${activeTab === "warehouses" ? "active" : ""}`}
        >
          <i className="bi bi-building me-1"></i> Central Warehouses ({store.warehouses.length})
        </button>
      </div>

      {/* TAB 1: INVENTORY */}
      {activeTab === "inventory" && (
        <div className="pro-panel">
          <div className="pro-panel-header">
            <div className="d-flex gap-2">
              {["all", "facility", "warehouse"].map((f) => (
                <button
                  key={f}
                  onClick={() => setLocationFilter(f)}
                  className={`type-pill ${locationFilter === f ? "active" : ""}`}
                >
                  {f === "all" ? "All Locations" : f === "facility" ? "Hospitals & PHCs" : "Medical Warehouses"}
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>SKU / Product</th>
                  <th>Location (State)</th>
                  <th>Batch / Expiry</th>
                  <th>Stock Level</th>
                  <th>Status</th>
                  <th>Intelligent Replenishment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const status = computeInventoryStatus(item);
                  const rec = getReplenishmentRecommendation(item);
                  const chipClass =
                    status === "Out of Stock" || status === "Critical"
                      ? "critical"
                      : status === "Low"
                      ? "warning"
                      : "success";

                  return (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.product}</strong>
                        <div className="small text-muted">{item.sku} · {item.category}</div>
                      </td>
                      <td>
                        <strong>{item.location}</strong>
                        <div className="small text-muted">{item.locationType} · {item.state}</div>
                      </td>
                      <td>
                        <div className="small">{item.batchNumber}</div>
                        <div className="small text-muted">Exp: {item.expiryDate}</div>
                      </td>
                      <td>
                        <strong>{item.quantity}</strong> <span className="small text-muted">/ {item.maxStock}</span>
                        <div className="small text-muted">Min: {item.minStock} · ~{item.avgDailyUsage}/day</div>
                      </td>
                      <td>
                        <span className={`status-chip ${chipClass}`}>{status}</span>
                      </td>
                      <td>
                        {rec.atRisk && item.locationType === "Facility" ? (
                          <div className="small text-danger fw-bold">
                            <i className="bi bi-exclamation-triangle-fill me-1"></i>
                            Stockout risk (~{rec.daysLeft}d left). Suggest +{rec.recommendedQty}
                          </div>
                        ) : (
                          <span className="small text-muted">Adequate (~{rec.daysLeft}d cover)</span>
                        )}
                      </td>
                      <td>
                        {item.locationType === "Facility" && (
                          <button
                            onClick={() => prefillRequestFromItem(item, rec.recommendedQty)}
                            className="btn-mini-action"
                          >
                            Request
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SUPPLY REQUESTS */}
      {activeTab === "requests" && (
        <div className="pro-panel">
          <div className="table-responsive">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Product &amp; Qty</th>
                  <th>Destination Facility</th>
                  <th>Priority</th>
                  <th>Lifecycle Status</th>
                  <th>Workflow Actions</th>
                </tr>
              </thead>
              <tbody>
                {store.supplyRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <strong>{req.id}</strong>
                      <div className="small text-muted">{req.createdAt}</div>
                    </td>
                    <td>
                      <strong>{req.product}</strong>
                      <div className="small text-muted">
                        Requested: {req.quantity} {req.allocatedQty > 0 ? `· Allocated: ${req.allocatedQty}` : ""}
                      </div>
                    </td>
                    <td>
                      <strong>{req.facility}</strong>
                      <div className="small text-muted">{req.lga} LGA, {req.state}</div>
                    </td>
                    <td>
                      <span className={`status-chip ${req.priority === "Critical" ? "critical" : "warning"}`}>
                        {req.priority}
                      </span>
                    </td>
                    <td>
                      <span className="status-chip info">{req.status}</span>
                    </td>
                    <td>
                      <div className="d-flex gap-1 flex-wrap">
                        {req.status === "Draft" && (
                          <button onClick={() => handleAdvanceRequest(req, "Submitted")} className="btn-mini-action">
                            Submit
                          </button>
                        )}
                        {req.status === "Submitted" && (
                          <button onClick={() => handleAdvanceRequest(req, "Approved")} className="btn-mini-action">
                            Approve
                          </button>
                        )}
                        {(req.status === "Approved" || req.status === "Under Review") && (
                          <button onClick={() => openAllocationModal(req)} className="btn-mini-action bg-primary text-white border-primary">
                            Allocate Stock
                          </button>
                        )}
                        {req.status === "Submitted" && (
                          <button onClick={() => handleAdvanceRequest(req, "Rejected")} className="btn-mini-action text-danger">
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WAREHOUSES */}
      {activeTab === "warehouses" && (
        <div className="facilities-grid-view">
          {store.warehouses.map((wh) => (
            <div key={wh.id} className="pro-panel">
              <span className="status-chip info mb-2">{wh.state} · {wh.lga}</span>
              <h4 style={{ fontSize: "17px", fontWeight: 800 }}>{wh.name}</h4>
              <p className="small text-muted">Storage Utilization: <strong>{wh.capacityPct}%</strong></p>
              <div className="progress mb-3" style={{ height: "8px" }}>
                <div className="progress-bar bg-info" style={{ width: `${wh.capacityPct}%` }}></div>
              </div>
              <button
                onClick={() => {
                  setLocationFilter("warehouse");
                  setActiveTab("inventory");
                }}
                className="btn-mini-action"
              >
                Inspect Warehouse Stock →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CREATE REQUEST MODAL */}
      {showRequestModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowRequestModal(false)}>
          <div className="subscription-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h2>New Medical Supply Request</h2>
              <button onClick={() => setShowRequestModal(false)} className="btn-close-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <form onSubmit={(e) => handleCreateRequest(e, false)}>
                <div className="mb-3">
                  <label className="form-label">Product / Essential Item</label>
                  <select
                    value={newReq.sku}
                    onChange={(e) => setNewReq({ ...newReq, sku: e.target.value })}
                    className="form-select"
                  >
                    <option value="MED-ORS-500">Oral Rehydration Salts (ORS) Sachets</option>
                    <option value="MED-RING-500">Ringer&apos;s Lactate IV Fluid 500ml</option>
                    <option value="DIAG-RDT-MAL">Malaria Rapid Diagnostic Test (RDT) Kits</option>
                    <option value="PPE-LASSA-KIT">Viral Hemorrhagic Fever Full PPE Kit</option>
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Quantity Needed</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newReq.quantity}
                      onChange={(e) => setNewReq({ ...newReq, quantity: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Priority</label>
                    <select
                      value={newReq.priority}
                      onChange={(e) => setNewReq({ ...newReq, priority: e.target.value })}
                      className="form-select"
                    >
                      <option value="Critical">Critical (Emergency)</option>
                      <option value="High">High</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Destination Facility</label>
                    <input
                      type="text"
                      required
                      value={newReq.facility}
                      onChange={(e) => setNewReq({ ...newReq, facility: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      required
                      value={newReq.state}
                      onChange={(e) => setNewReq({ ...newReq, state: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Clinical Justification</label>
                  <textarea
                    rows="2"
                    required
                    placeholder="Reason for request..."
                    value={newReq.justification}
                    onChange={(e) => setNewReq({ ...newReq, justification: e.target.value })}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleCreateRequest(e, true)}
                    className="button button-outline"
                  >
                    Save as Draft
                  </button>
                  <button type="submit" className="button button-primary">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* WAREHOUSE ALLOCATION MODAL */}
      {allocatingReq && (
        <div className="modal-backdrop-custom" onClick={() => setAllocatingReq(null)}>
          <div className="subscription-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <div>
                <h2>Allocate Warehouse Stock</h2>
                <p className="small text-muted mb-0">
                  {allocatingReq.id} · {allocatingReq.product} → {allocatingReq.facility}
                </p>
              </div>
              <button onClick={() => setAllocatingReq(null)} className="btn-close-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <form onSubmit={handleConfirmAllocation}>
                <div className="mb-3">
                  <label className="form-label">Source Warehouse Inventory</label>
                  <select
                    value={selectedWarehouseId}
                    onChange={(e) => setSelectedWarehouseId(e.target.value)}
                    className="form-select"
                    required
                  >
                    {store.inventory
                      .filter((i) => i.locationType === "Warehouse" && i.sku === allocatingReq.sku)
                      .map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.location} — Available: {w.quantity} units
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Quantity to Allocate (Requested: {allocatingReq.quantity})
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={allocateQty}
                    onChange={(e) => setAllocateQty(e.target.value)}
                    className="form-control"
                  />
                  <div className="form-text">
                    System enforces PRD safety rule: cannot allocate more than available warehouse stock.
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" onClick={() => setAllocatingReq(null)} className="button button-outline">
                    Cancel
                  </button>
                  <button type="submit" className="button button-primary">
                    Confirm Allocation &amp; Create Shipment
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

export default ProSupplyChain;
