import { healthAlerts } from "../data/alerts";
import { healthcareFacilities } from "../data/facilities";
import { healthArticles, firstAidGuides, healthMyths } from "../data/awareness";

const REGISTERED_COMPANIES_KEY = "pulse360_registered_companies";
const CURRENT_USER_KEY = "pulse360_current_user";
const ALERT_SUBSCRIBERS_KEY = "pulse360_subscribers";

const delay = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

/* =========================================================
   HEALTH ALERTS SERVICE
   ========================================================= */

export async function getAlerts({ severity = "all", category = "all", state = "all", search = "" } = {}) {
  await delay();
  let list = [...healthAlerts];

  if (severity && severity !== "all") {
    list = list.filter((a) => a.severity.toLowerCase() === severity.toLowerCase());
  }

  if (category && category !== "all") {
    list = list.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  if (state && state !== "all") {
    list = list.filter((a) => a.state?.toLowerCase() === state.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.region.toLowerCase().includes(q) ||
        (a.state && a.state.toLowerCase().includes(q)) ||
        a.affectedAreas.some((area) => area.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function getAlertById(idOrSlug) {
  await delay();
  return (
    healthAlerts.find((a) => a.id === idOrSlug || a.slug === idOrSlug) || null
  );
}

/* =========================================================
   HEALTHCARE FACILITIES SERVICE (Nigeria State -> LGA)
   ========================================================= */

export async function getFacilities({
  type = "all",
  search = "",
  state = "all",
  lga = "all",
  open24x7 = false,
  acceptsInsurance = false,
  verifiedOnly = false,
} = {}) {
  await delay();
  const registered = getStoredCompanies().filter((c) => c.status === "Approved");
  let filtered = [...healthcareFacilities, ...registered];

  if (type && type !== "all") {
    filtered = filtered.filter((f) => f.type.toLowerCase() === type.toLowerCase());
  }

  if (state && state !== "all") {
    filtered = filtered.filter((f) => f.state?.toLowerCase() === state.toLowerCase());
  }

  if (lga && lga !== "all") {
    filtered = filtered.filter((f) => f.lga?.toLowerCase() === lga.toLowerCase());
  }

  if (open24x7) {
    filtered = filtered.filter((f) => f.isOpen24x7);
  }

  if (acceptsInsurance) {
    filtered = filtered.filter((f) => f.acceptsInsurance);
  }

  if (verifiedOnly) {
    filtered = filtered.filter((f) => f.isVerified);
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        (f.state && f.state.toLowerCase().includes(q)) ||
        (f.lga && f.lga.toLowerCase().includes(q)) ||
        (f.city && f.city.toLowerCase().includes(q)) ||
        (f.category && f.category.toLowerCase().includes(q)) ||
        (f.services && f.services.some((s) => s.toLowerCase().includes(q)))
    );
  }

  return filtered;
}

export async function getFacilityById(id) {
  await delay();
  const all = [...healthcareFacilities, ...getStoredCompanies()];
  return all.find((f) => f.id === id) || null;
}

/* =========================================================
   HEALTH AWARENESS & EDUCATION SERVICE
   ========================================================= */

export async function getArticles({ category = "all", search = "" } = {}) {
  await delay();
  let list = [...healthArticles];

  if (category && category !== "all") {
    list = list.filter((g) => g.category.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getFirstAidGuides() {
  await delay();
  return firstAidGuides;
}

export async function getHealthMyths() {
  await delay();
  return healthMyths;
}

/* =========================================================
   COMPANY / ORGANISATION REGISTRATION SERVICE
   ========================================================= */

export function getStoredCompanies() {
  try {
    const data = localStorage.getItem(REGISTERED_COMPANIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function registerCompany(companyData) {
  await delay(200);
  const existing = getStoredCompanies();
  const newCompany = {
    id: `comp-${Date.now().toString(36)}`,
    ...companyData,
    isVerified: true,
    rating: 5.0,
    reviewCount: 1,
    status: "Approved",
    createdAt: new Date().toISOString(),
  };

  const updated = [newCompany, ...existing];
  try {
    localStorage.setItem(REGISTERED_COMPANIES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to store company registration:", err);
  }

  return { success: true, company: newCompany };
}

/* =========================================================
   AUTHENTICATION & USER SESSION SERVICE (RBAC Ready)
   ========================================================= */

export const ROLE_LABELS = {
  citizen: "Citizen",
  facility_staff: "Facility Staff",
  warehouse_officer: "Warehouse Officer",
  logistics: "Logistics Provider",
  public_health_officer: "Public Health Officer",
  admin: "Administrator",
};

export function getCurrentUser() {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function signIn({ email, password, role = "citizen", organization = "Lagos State Health Network", name: customName }) {
  await delay(150);

  if (!email || !password) {
    throw new Error("Please provide both email and password.");
  }

  const derivedName =
    customName ||
    email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const user = {
    id: `user-${Date.now().toString(36)}`,
    email,
    name: derivedName || "Community Member",
    role: role || "citizen",
    roleLabel: ROLE_LABELS[role] || "Member",
    organization,
    state: "Lagos",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(derivedName)}&backgroundColor=087f8c,05616b`,
    loggedInAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save session:", err);
  }

  return user;
}

export async function signUp({
  name,
  email,
  password,
  role = "citizen",
  state = "Lagos",
  lga = "Ikeja",
  organization = "Nigeria Public Network",
}) {
  await delay(200);

  if (!name || !email || !password) {
    throw new Error("Please complete all required fields.");
  }

  const user = {
    id: `user-${Date.now().toString(36)}`,
    name,
    email,
    role: role || "citizen",
    roleLabel: ROLE_LABELS[role] || "Member",
    organization,
    state,
    lga,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=087f8c,05616b`,
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save session:", err);
  }

  return user;
}

export function signOut() {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (err) {
    console.error("Failed to clear session:", err);
  }
  return true;
}

/* =========================================================
   PUBLIC HEALTH ALERT SUBSCRIPTION
   ========================================================= */

export async function subscribeToAlerts({ email, phone = "", region = "All States (Nigeria)" }) {
  await delay(120);
  if (!email) throw new Error("Email address is required.");

  try {
    const current = JSON.parse(localStorage.getItem(ALERT_SUBSCRIBERS_KEY) || "[]");
    current.push({
      email,
      phone,
      region,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(ALERT_SUBSCRIBERS_KEY, JSON.stringify(current));
  } catch (err) {
    console.error("Subscription save error:", err);
  }

  return { success: true, message: "Successfully subscribed to NCDC & PULSE360 Nigeria health updates!" };
}
