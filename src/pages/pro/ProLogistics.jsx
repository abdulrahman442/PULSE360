import { useState } from "react";
import { getProStore, saveProStore, appendAuditLog, generateId } from "../../services/proStore";
import { getCurrentUser } from "../../services/api";

const SHIPMENT_STAGES = [
  "Pending",
  "Assigned",
  "Picked Up",
  "In Transit",
  "Arriving",
  "Delivered",
  "Verified",
];

function ProLogistics() {
  const [store, setStore] = useState(getProStore);
  const [podShipment, setPodShipment] = useState(null);
  const [podForm, setPodForm] = useState({ receiverName: "", deliveredQty: 0, notes: "" });
  const [assigningShipment, setAssigningShipment] = useState(null);
  const [driverForm, setDriverForm] = useState({ driverName: "Sadiq Abubakar", vehiclePlate: "LAG-512-MED", eta: "Tomorrow, 10:00 AM" });
  const [feedback, setFeedback] = useState(null);

  const user = getCurrentUser();
  const actorName = user?.name || "Logistics Officer";
  const actorRole = user?.roleLabel || "Logistics";

  const persist = (nextStore, msg) => {
    saveProStore(nextStore);
    setStore(nextStore);
    if (msg) {
      setFeedback(msg);
      setTimeout(() => setFeedback(null), 4500);
    }
  };

  const handleAssignDriver = (e) => {
    e.preventDefault();
    if (!assigningShipment) return;

    const nextShipments = store.shipments.map((s) =>
      s.id === assigningShipment.id
        ? {
            ...s,
            driverName: driverForm.driverName,
            vehiclePlate: driverForm.vehiclePlate,
            eta: driverForm.eta,
            status: "Assigned",
          }
        : s
    );

    const nextStore = {
      ...store,
      shipments: nextShipments,
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Assigned driver ${driverForm.driverName} (${driverForm.vehiclePlate})`,
        object: assigningShipment.id,
        previousStatus: assigningShipment.status,
        newStatus: "Assigned",
      }),
    };

    persist(nextStore, { type: "success", text: `Driver assigned to ${assigningShipment.id}.` });
    setAssigningShipment(null);
  };

  const handleAdvanceStatus = (shipment, nextStatus) => {
    const prev = shipment.status;
    const nextShipments = store.shipments.map((s) =>
      s.id === shipment.id ? { ...s, status: nextStatus } : s
    );
    const nextRequests = store.supplyRequests.map((r) =>
      r.id === shipment.requestId && nextStatus === "In Transit" ? { ...r, status: "Shipped" } : r
    );

    const nextStore = {
      ...store,
      shipments: nextShipments,
      supplyRequests: nextRequests,
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Updated shipment transit status`,
        object: `${shipment.id} (${shipment.destination})`,
        previousStatus: prev,
        newStatus: nextStatus,
      }),
    };
    persist(nextStore, { type: "info", text: `Shipment ${shipment.id} updated to ${nextStatus}.` });
  };

  const openPodModal = (shipment) => {
    setPodShipment(shipment);
    setPodForm({
      receiverName: "",
      deliveredQty: shipment.quantity,
      notes: "Cold-chain & seal integrity verified.",
    });
  };

  const handleSubmitPod = (e) => {
    e.preventDefault();
    if (!podShipment) return;

    const podData = {
      receiverName: podForm.receiverName,
      deliveredQty: Number(podForm.deliveredQty),
      deliveredAt: new Date().toLocaleString(),
      notes: podForm.notes,
    };

    const nextShipments = store.shipments.map((s) =>
      s.id === podShipment.id ? { ...s, status: "Delivered", eta: "Delivered", pod: podData } : s
    );

    const nextRequests = store.supplyRequests.map((r) =>
      r.id === podShipment.requestId ? { ...r, status: "Delivered" } : r
    );

    const nextStore = {
      ...store,
      shipments: nextShipments,
      supplyRequests: nextRequests,
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Submitted digital Proof of Delivery`,
        object: `${podShipment.id} (Signed by ${podData.receiverName})`,
        previousStatus: podShipment.status,
        newStatus: "Delivered",
      }),
    };

    persist(nextStore, {
      type: "success",
      text: `Proof of Delivery recorded for ${podShipment.id}. Facility staff can now verify receipt to update inventory.`,
    });
    setPodShipment(null);
  };

  const handleVerifyDelivery = (shipment) => {
    const qty = shipment.pod?.deliveredQty || shipment.quantity;

    // Update destination facility inventory automatically (PRD core workflow!)
    let updatedExisting = false;
    let nextInventory = store.inventory.map((item) => {
      if (item.locationType === "Facility" && item.location === shipment.destination && item.sku === shipment.sku) {
        updatedExisting = true;
        return { ...item, quantity: item.quantity + qty };
      }
      return item;
    });

    if (!updatedExisting) {
      nextInventory = [
        {
          id: generateId("inv"),
          sku: shipment.sku,
          product: shipment.product,
          category: "Delivered Stock",
          location: shipment.destination,
          locationType: "Facility",
          state: shipment.state,
          quantity: qty,
          minStock: 50,
          maxStock: 300,
          avgDailyUsage: 10,
          batchNumber: `DEL-${shipment.id}`,
          expiryDate: "2028-12-31",
        },
        ...nextInventory,
      ];
    }

    const nextShipments = store.shipments.map((s) =>
      s.id === shipment.id ? { ...s, status: "Verified" } : s
    );

    const nextRequests = store.supplyRequests.map((r) =>
      r.id === shipment.requestId ? { ...r, status: "Verified" } : r
    );

    const nextStore = {
      ...store,
      inventory: nextInventory,
      shipments: nextShipments,
      supplyRequests: nextRequests,
      auditLogs: appendAuditLog(store, {
        who: actorName,
        role: actorRole,
        action: `Verified delivery & updated facility inventory (+${qty} units)`,
        object: `${shipment.id} → ${shipment.destination}`,
        previousStatus: "Delivered",
        newStatus: "Verified",
      }),
    };

    persist(nextStore, {
      type: "success",
      text: `Delivery ${shipment.id} verified! ${shipment.destination} inventory incremented by +${qty} units.`,
    });
  };

  return (
    <div className="pro-page">
      <div className="pro-page-header">
        <div>
          <span className="section-eyebrow">LOGISTICS &amp; LAST-MILE DELIVERY</span>
          <h1>Shipments, Dispatch &amp; Proof of Delivery</h1>
          <p className="text-muted small mb-0">
            Track Nigerian medical consignments from Central Medical Stores to hospitals &amp; PHCs.
          </p>
        </div>
      </div>

      {feedback && (
        <div className={`alert alert-${feedback.type} py-2 small mb-3`} role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          {feedback.text}
        </div>
      )}

      {/* Lifecycle Legend */}
      <div className="pro-panel mb-3 py-3">
        <div className="d-flex align-items-center gap-2 flex-wrap small">
          <strong>Shipment Lifecycle:</strong>
          {SHIPMENT_STAGES.map((stage, idx) => (
            <span key={stage} className="d-inline-flex align-items-center gap-1">
              <span className="area-chip">{stage}</span>
              {idx < SHIPMENT_STAGES.length - 1 && <i className="bi bi-arrow-right text-muted"></i>}
            </span>
          ))}
        </div>
      </div>

      {/* Shipments Cards */}
      <div className="d-flex flex-column gap-3">
        {store.shipments.map((shp) => (
          <div key={shp.id} className="pro-panel">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="status-chip info">{shp.status}</span>
                  <strong>{shp.id}</strong>
                  <span className="small text-muted">· Request {shp.requestId}</span>
                </div>
                <h4 className="mb-1" style={{ fontSize: "17px", fontWeight: 800 }}>
                  {shp.product} (Quantity: {shp.quantity})
                </h4>
                <div className="small text-muted">
                  <i className="bi bi-building me-1"></i> From: <strong>{shp.origin}</strong> → To: <strong>{shp.destination}</strong> ({shp.state})
                </div>
              </div>

              <div className="text-end small">
                <div><strong>Driver:</strong> {shp.driverName}</div>
                <div><strong>Vehicle:</strong> {shp.vehiclePlate}</div>
                <div><strong>ETA:</strong> {shp.eta}</div>
              </div>
            </div>

            {shp.pod && (
              <div className="p-3 rounded mb-3" style={{ background: "var(--pulse-success-light)", border: "1px solid #bbf7d0" }}>
                <div className="small fw-bold text-success mb-1">
                  <i className="bi bi-patch-check-fill me-1"></i> Digital Proof of Delivery Submitted
                </div>
                <div className="small">
                  Received by: <strong>{shp.pod.receiverName}</strong> · Qty Confirmed: <strong>{shp.pod.deliveredQty}</strong> · Time: {shp.pod.deliveredAt}
                </div>
                <div className="small text-muted">Notes: {shp.pod.notes}</div>
              </div>
            )}

            <div className="d-flex gap-2 flex-wrap border-top pt-3">
              {shp.status === "Pending" && (
                <button
                  onClick={() => setAssigningShipment(shp)}
                  className="btn-mini-action bg-primary text-white border-primary"
                >
                  <i className="bi bi-person-plus me-1"></i> Assign Driver &amp; Vehicle
                </button>
              )}
              {shp.status === "Assigned" && (
                <button onClick={() => handleAdvanceStatus(shp, "Picked Up")} className="btn-mini-action">
                  Mark Picked Up
                </button>
              )}
              {shp.status === "Picked Up" && (
                <button onClick={() => handleAdvanceStatus(shp, "In Transit")} className="btn-mini-action">
                  Mark In Transit
                </button>
              )}
              {(shp.status === "In Transit" || shp.status === "Arriving") && (
                <button
                  onClick={() => openPodModal(shp)}
                  className="btn-mini-action bg-success text-white border-success"
                >
                  <i className="bi bi-file-earmark-check me-1"></i> Submit Proof of Delivery
                </button>
              )}
              {shp.status === "Delivered" && (
                <button
                  onClick={() => handleVerifyDelivery(shp)}
                  className="btn-mini-action bg-primary text-white border-primary"
                >
                  <i className="bi bi-check2-all me-1"></i> Facility Verify &amp; Update Inventory
                </button>
              )}
              {shp.status === "Verified" && (
                <span className="small text-success fw-bold">
                  <i className="bi bi-check-circle-fill me-1"></i> End-to-End Traceability Complete (Inventory Updated)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Assign Driver Modal */}
      {assigningShipment && (
        <div className="modal-backdrop-custom" onClick={() => setAssigningShipment(null)}>
          <div className="subscription-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h2>Assign Logistics Driver — {assigningShipment.id}</h2>
              <button onClick={() => setAssigningShipment(null)} className="btn-close-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <form onSubmit={handleAssignDriver}>
                <div className="mb-3">
                  <label className="form-label">Driver Full Name</label>
                  <input
                    type="text"
                    required
                    value={driverForm.driverName}
                    onChange={(e) => setDriverForm({ ...driverForm, driverName: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vehicle Plate Number</label>
                  <input
                    type="text"
                    required
                    value={driverForm.vehiclePlate}
                    onChange={(e) => setDriverForm({ ...driverForm, vehiclePlate: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estimated Time of Arrival (ETA)</label>
                  <input
                    type="text"
                    required
                    value={driverForm.eta}
                    onChange={(e) => setDriverForm({ ...driverForm, eta: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" onClick={() => setAssigningShipment(null)} className="button button-outline">
                    Cancel
                  </button>
                  <button type="submit" className="button button-primary">
                    Confirm Dispatch Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Proof of Delivery Modal */}
      {podShipment && (
        <div className="modal-backdrop-custom" onClick={() => setPodShipment(null)}>
          <div className="subscription-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h2>Digital Proof of Delivery — {podShipment.id}</h2>
              <button onClick={() => setPodShipment(null)} className="btn-close-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <form onSubmit={handleSubmitPod}>
                <div className="mb-3">
                  <label className="form-label">Receiver Name (at {podShipment.destination}) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Matron Funke Akindele"
                    value={podForm.receiverName}
                    onChange={(e) => setPodForm({ ...podForm, receiverName: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmed Quantity Delivered</label>
                  <input
                    type="number"
                    min="1"
                    max={podShipment.quantity}
                    required
                    value={podForm.deliveredQty}
                    onChange={(e) => setPodForm({ ...podForm, deliveredQty: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Condition &amp; Handover Notes</label>
                  <textarea
                    rows="2"
                    value={podForm.notes}
                    onChange={(e) => setPodForm({ ...podForm, notes: e.target.value })}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" onClick={() => setPodShipment(null)} className="button button-outline">
                    Cancel
                  </button>
                  <button type="submit" className="button button-primary">
                    Submit Proof of Delivery
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

export default ProLogistics;
