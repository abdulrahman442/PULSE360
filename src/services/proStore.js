/* =========================================================
   PULSE360 PROFESSIONAL OPERATIONS STORE (PRD v1.0)
   Covers: Multi-Tenant Orgs, RBAC, Inventory, Supply Requests,
   Warehouse Allocations, Logistics & PoD, Incidents, Audit Logs
   ========================================================= */

const PRO_STORE_KEY = "pulse360_pro_operations_v1";

export const RBAC_MATRIX = {
  citizen: {
    label: "Citizen",
    dashboard: false,
    intelligence: false,
    incidents: false,
    supplyChain: false,
    logistics: false,
    admin: false,
  },
  facility_staff: {
    label: "Facility Staff",
    dashboard: true,
    intelligence: true,
    incidents: "limited",
    supplyChain: true,
    logistics: "view",
    admin: false,
  },
  warehouse_officer: {
    label: "Warehouse / Supply Officer",
    dashboard: true,
    intelligence: true,
    incidents: false,
    supplyChain: true,
    logistics: true,
    admin: false,
  },
  logistics: {
    label: "Logistics Provider",
    dashboard: true,
    intelligence: false,
    incidents: false,
    supplyChain: false,
    logistics: true,
    admin: false,
  },
  public_health_officer: {
    label: "Public Health Officer",
    dashboard: true,
    intelligence: true,
    incidents: true,
    supplyChain: "view",
    logistics: "view",
    admin: false,
  },
  admin: {
    label: "Administrator",
    dashboard: true,
    intelligence: true,
    incidents: true,
    supplyChain: true,
    logistics: true,
    admin: true,
  },
};

export const INITIAL_PRO_DATA = {
  organizations: [
    {
      id: "org-01",
      name: "Lagos State Ministry of Health Network",
      type: "Government / State Health Network",
      state: "Lagos",
      plan: "Enterprise",
      facilitiesCount: 14,
      status: "Verified",
    },
    {
      id: "org-02",
      name: "NCDC National Emergency Operations",
      type: "Public Health Agency",
      state: "FCT Abuja",
      plan: "Government",
      facilitiesCount: 37,
      status: "Verified",
    },
    {
      id: "org-03",
      name: "Tranex Medical Logistics Nigeria",
      type: "Cold-Chain & Medical Logistics",
      state: "Lagos",
      plan: "Professional",
      facilitiesCount: 8,
      status: "Verified",
    },
  ],
  warehouses: [
    {
      id: "wh-01",
      name: "Central Medical Store — Oshodi, Lagos",
      state: "Lagos",
      lga: "Oshodi-Isolo",
      capacityPct: 76,
    },
    {
      id: "wh-02",
      name: "Federal Medical Store — Idu, Abuja",
      state: "FCT Abuja",
      lga: "AMAC",
      capacityPct: 68,
    },
    {
      id: "wh-03",
      name: "North-West Regional Depot — Kano",
      state: "Kano",
      lga: "Tarauni",
      capacityPct: 54,
    },
  ],
  inventory: [
    {
      id: "inv-001",
      sku: "MED-ORS-500",
      product: "Oral Rehydration Salts (ORS) Sachets (Box of 100)",
      category: "Essential Fluids",
      location: "LUTH Idi-Araba",
      locationType: "Facility",
      state: "Lagos",
      quantity: 45,
      minStock: 100,
      maxStock: 500,
      avgDailyUsage: 22,
      batchNumber: "NG-ORS-2611",
      expiryDate: "2028-04-30",
    },
    {
      id: "inv-002",
      sku: "MED-RING-500",
      product: "Ringer's Lactate IV Fluid 500ml (Carton of 20)",
      category: "IV Fluids",
      location: "Garki Primary Health Centre",
      locationType: "Facility",
      state: "FCT Abuja",
      quantity: 12,
      minStock: 60,
      maxStock: 250,
      avgDailyUsage: 10,
      batchNumber: "NG-IV-2608",
      expiryDate: "2027-08-15",
    },
    {
      id: "inv-003",
      sku: "PPE-LASSA-KIT",
      product: "Viral Hemorrhagic Fever Full PPE Kit",
      category: "PPE & IPC",
      location: "FMC Owo",
      locationType: "Facility",
      state: "Ondo",
      quantity: 38,
      minStock: 50,
      maxStock: 200,
      avgDailyUsage: 8,
      batchNumber: "PPE-2026-03",
      expiryDate: "2029-01-20",
    },
    {
      id: "inv-004",
      sku: "MED-ACT-24",
      product: "Artemether/Lumefantrine ACT Co-blister (Pack of 30)",
      category: "Antimalarials",
      location: "LUTH Idi-Araba",
      locationType: "Facility",
      state: "Lagos",
      quantity: 320,
      minStock: 120,
      maxStock: 600,
      avgDailyUsage: 18,
      batchNumber: "ACT-8821",
      expiryDate: "2027-12-01",
    },
    {
      id: "inv-005",
      sku: "DIAG-RDT-MAL",
      product: "Malaria Rapid Diagnostic Test (RDT) Kits (Box of 25)",
      category: "Diagnostics",
      location: "Aminu Kano Teaching Hospital",
      locationType: "Facility",
      state: "Kano",
      quantity: 0,
      minStock: 80,
      maxStock: 400,
      avgDailyUsage: 15,
      batchNumber: "RDT-2601",
      expiryDate: "2027-03-10",
    },
    // Warehouse Stocks
    {
      id: "inv-w01",
      sku: "MED-ORS-500",
      product: "Oral Rehydration Salts (ORS) Sachets (Box of 100)",
      category: "Essential Fluids",
      location: "Central Medical Store — Oshodi, Lagos",
      locationType: "Warehouse",
      state: "Lagos",
      quantity: 1450,
      minStock: 300,
      maxStock: 3000,
      avgDailyUsage: 80,
      batchNumber: "WH-ORS-990",
      expiryDate: "2028-09-30",
    },
    {
      id: "inv-w02",
      sku: "MED-RING-500",
      product: "Ringer's Lactate IV Fluid 500ml (Carton of 20)",
      category: "IV Fluids",
      location: "Federal Medical Store — Idu, Abuja",
      locationType: "Warehouse",
      state: "FCT Abuja",
      quantity: 820,
      minStock: 200,
      maxStock: 2000,
      avgDailyUsage: 45,
      batchNumber: "WH-IV-714",
      expiryDate: "2028-02-28",
    },
    {
      id: "inv-w03",
      sku: "DIAG-RDT-MAL",
      product: "Malaria Rapid Diagnostic Test (RDT) Kits (Box of 25)",
      category: "Diagnostics",
      location: "North-West Regional Depot — Kano",
      locationType: "Warehouse",
      state: "Kano",
      quantity: 640,
      minStock: 150,
      maxStock: 1500,
      avgDailyUsage: 30,
      batchNumber: "WH-RDT-312",
      expiryDate: "2028-06-15",
    },
    {
      id: "inv-w04",
      sku: "PPE-LASSA-KIT",
      product: "Viral Hemorrhagic Fever Full PPE Kit",
      category: "PPE & IPC",
      location: "Central Medical Store — Oshodi, Lagos",
      locationType: "Warehouse",
      state: "Lagos",
      quantity: 480,
      minStock: 100,
      maxStock: 1000,
      avgDailyUsage: 20,
      batchNumber: "WH-PPE-410",
      expiryDate: "2029-05-01",
    },
  ],
  supplyRequests: [
    {
      id: "REQ-1024",
      sku: "MED-ORS-500",
      product: "Oral Rehydration Salts (ORS) Sachets (Box of 100)",
      quantity: 150,
      allocatedQty: 0,
      priority: "Critical",
      facility: "LUTH Idi-Araba",
      state: "Lagos",
      lga: "Surulere",
      requestedBy: "Pharm. Adebayo Ogunleye",
      requiredDate: "2026-11-26",
      status: "Submitted",
      justification: "Surge in acute watery diarrhea triage at ORT corner.",
      createdAt: "2026-11-24 09:15 AM",
    },
    {
      id: "REQ-1023",
      sku: "MED-RING-500",
      product: "Ringer's Lactate IV Fluid 500ml (Carton of 20)",
      quantity: 80,
      allocatedQty: 80,
      priority: "High",
      facility: "Garki Primary Health Centre",
      state: "FCT Abuja",
      lga: "AMAC",
      requestedBy: "Matron Hauwa Ibrahim",
      requiredDate: "2026-11-25",
      status: "Shipped",
      justification: "Emergency replenishment for cholera preparedness ward.",
      createdAt: "2026-11-23 02:40 PM",
    },
    {
      id: "REQ-1022",
      sku: "DIAG-RDT-MAL",
      product: "Malaria Rapid Diagnostic Test (RDT) Kits (Box of 25)",
      quantity: 100,
      allocatedQty: 0,
      priority: "Critical",
      facility: "Aminu Kano Teaching Hospital",
      state: "Kano",
      lga: "Tarauni",
      requestedBy: "Dr. Yusuf Abdullahi",
      requiredDate: "2026-11-25",
      status: "Approved",
      justification: "Outpatient pediatric fever screening stockout.",
      createdAt: "2026-11-22 11:10 AM",
    },
  ],
  shipments: [
    {
      id: "SHP-4081",
      requestId: "REQ-1023",
      product: "Ringer's Lactate IV Fluid 500ml (Carton of 20)",
      sku: "MED-RING-500",
      quantity: 80,
      origin: "Federal Medical Store — Idu, Abuja",
      destination: "Garki Primary Health Centre",
      state: "FCT Abuja",
      driverName: "Musa Danjuma",
      vehiclePlate: "ABJ-492-MED",
      eta: "Today, 4:30 PM",
      status: "In Transit",
      pod: null,
      createdAt: "2026-11-24 08:00 AM",
    },
    {
      id: "SHP-4079",
      requestId: "REQ-1019",
      product: "Viral Hemorrhagic Fever Full PPE Kit",
      sku: "PPE-LASSA-KIT",
      quantity: 60,
      origin: "Central Medical Store — Oshodi, Lagos",
      destination: "FMC Owo",
      state: "Ondo",
      driverName: "Chukwudi Okafor",
      vehiclePlate: "LAG-883-CC",
      eta: "Delivered",
      status: "Delivered",
      pod: {
        receiverName: "Dr. Folake Adeyemi",
        deliveredQty: 60,
        deliveredAt: "2026-11-23 05:12 PM",
        notes: "All 60 sealed PPE cartons intact on arrival.",
      },
      createdAt: "2026-11-22 07:30 AM",
    },
  ],
  incidents: [
    {
      id: "INC-2026-01",
      title: "Acute Watery Diarrhea Cluster — Lagos Island & Ikorodu Wards",
      type: "Waterborne Outbreak",
      severity: "Critical",
      status: "ACTIVE",
      state: "Lagos",
      lga: "Lagos Island",
      affectedFacilities: ["LUTH Idi-Araba", "Lagos Island General Hospital"],
      leadOfficer: "Dr. Ngozi Okonjo-Madu (NCDC Surveillance)",
      summary: "Confirmed Vibrio cholerae cluster following tidal flooding. ORT corners activated; ORS and IV fluid supply chain prioritized.",
      tasks: [
        { id: "t-1", title: "Deploy 45,000 ORS sachets from Oshodi Medical Store", done: true, assignee: "Warehouse Officer" },
        { id: "t-2", title: "Dispatch mobile water-chlorination team to Ward 4", done: false, assignee: "Lagos State Taskforce" },
        { id: "t-3", title: "Verify LUTH Idi-Araba emergency bed surge capacity", done: true, assignee: "Facility Staff" },
      ],
      createdAt: "2026-11-18 08:30 AM",
    },
    {
      id: "INC-2026-02",
      title: "Lassa Fever Dry-Season Preparedness — Owo & Edo Corridor",
      type: "Viral Hemorrhagic Fever",
      severity: "Warning",
      status: "MONITORING",
      state: "Ondo",
      lga: "Owo",
      affectedFacilities: ["FMC Owo", "Irrua Specialist Hospital"],
      leadOfficer: "Dr. Tunde Bakare (NCDC EOC)",
      summary: "Pre-positioning Ribavirin and full PPE kits across designated VHF treatment centers ahead of peak dry season.",
      tasks: [
        { id: "t-4", title: "Confirm 60 VHF PPE kits delivery at FMC Owo", done: true, assignee: "Logistics Provider" },
        { id: "t-5", title: "Conduct IPC refresher briefing for PHC triage nurses", done: false, assignee: "Public Health Officer" },
      ],
      createdAt: "2026-11-16 10:00 AM",
    },
  ],
  auditLogs: [
    {
      id: "AUD-904",
      who: "Pharm. Adebayo Ogunleye",
      role: "Facility Staff",
      action: "Submitted supply request",
      object: "REQ-1024 (ORS Sachets x150)",
      time: "Today, 09:15 AM",
      previousStatus: "Draft",
      newStatus: "Submitted",
    },
    {
      id: "AUD-903",
      who: "Ibrahim Suleiman",
      role: "Warehouse Officer",
      action: "Allocated & dispatched shipment",
      object: "SHP-4081 (Ringer's Lactate x80)",
      time: "Today, 08:00 AM",
      previousStatus: "Approved",
      newStatus: "In Transit",
    },
    {
      id: "AUD-902",
      who: "Chukwudi Okafor",
      role: "Logistics Provider",
      action: "Submitted Proof of Delivery",
      object: "SHP-4079 (FMC Owo)",
      time: "Yesterday, 05:12 PM",
      previousStatus: "In Transit",
      newStatus: "Delivered",
    },
    {
      id: "AUD-901",
      who: "Dr. Ngozi Okonjo-Madu",
      role: "Public Health Officer",
      action: "Activated incident response",
      object: "INC-2026-01 (Lagos Island)",
      time: "2026-11-18, 08:30 AM",
      previousStatus: "ASSESSMENT",
      newStatus: "ACTIVE",
    },
  ],
};

export function getProStore() {
  try {
    const raw = localStorage.getItem(PRO_STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  saveProStore(INITIAL_PRO_DATA);
  return INITIAL_PRO_DATA;
}

export function saveProStore(data) {
  try {
    localStorage.setItem(PRO_STORE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save pro store:", err);
  }
}

export function resetProStore() {
  saveProStore(INITIAL_PRO_DATA);
  return INITIAL_PRO_DATA;
}

export function computeInventoryStatus(item) {
  if (item.quantity <= 0) return "Out of Stock";
  if (item.quantity <= item.minStock * 0.4) return "Critical";
  if (item.quantity < item.minStock) return "Low";
  const daysRemaining = item.avgDailyUsage > 0 ? item.quantity / item.avgDailyUsage : 99;
  if (daysRemaining <= 4) return "Critical";
  return "Normal";
}

export function getReplenishmentRecommendation(item) {
  const daysLeft = item.avgDailyUsage > 0 ? Math.floor(item.quantity / item.avgDailyUsage) : 99;
  const risk = item.quantity < item.minStock || daysLeft <= 5;
  const recommendedQty = Math.max(item.maxStock - item.quantity, item.minStock);
  return {
    atRisk: risk,
    daysLeft,
    recommendedQty,
  };
}

let _seq = 100;
export function generateId(prefix) {
  _seq += 1;
  return `${prefix}-${Date.now().toString(36).slice(-4).toUpperCase()}${_seq}`;
}

export function appendAuditLog(store, { who, role, action, object, previousStatus, newStatus }) {
  const log = {
    id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
    who: who || "Authorized User",
    role: role || "Staff",
    action,
    object,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    previousStatus,
    newStatus,
  };
  return [log, ...store.auditLogs];
}
