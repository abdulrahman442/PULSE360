import { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser, signIn, signOut, ROLE_LABELS } from "../services/api";
import { RBAC_MATRIX } from "../services/proStore";

const PRO_NAV_ITEMS = [
  { to: "/pro", label: "Command Dashboard", icon: "bi-speedometer2", permKey: "dashboard", end: true },
  { to: "/pro/intelligence", label: "Intelligence & Analytics", icon: "bi-graph-up-arrow", permKey: "intelligence" },
  { to: "/pro/incidents", label: "Incidents & Response", icon: "bi-exclamation-diamond", permKey: "incidents" },
  { to: "/pro/supply-chain", label: "Supply Chain & Stock", icon: "bi-box-seam", permKey: "supplyChain" },
  { to: "/pro/logistics", label: "Logistics & Delivery", icon: "bi-truck", permKey: "logistics" },
  { to: "/pro/admin", label: "Admin, RBAC & Audit", icon: "bi-shield-lock", permKey: "admin" },
];

function ProLayout({ children }) {
  const [user, setUser] = useState(() => {
    const existing = getCurrentUser();
    if (existing && existing.role !== "citizen") return existing;
    return null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setUser(getCurrentUser());
    window.addEventListener("pulse360-auth-change", sync);
    return () => window.removeEventListener("pulse360-auth-change", sync);
  }, []);

  const activeRole = user?.role && RBAC_MATRIX[user.role] ? user.role : "admin";
  const perms = RBAC_MATRIX[activeRole];

  const handleRoleSwitch = async (newRole) => {
    await signIn({
      email: `${newRole}@pulse360.ng`,
      password: "demo",
      role: newRole,
      organization:
        newRole === "public_health_officer"
          ? "NCDC Surveillance EOC"
          : newRole === "warehouse_officer"
          ? "Central Medical Store — Oshodi, Lagos"
          : newRole === "logistics"
          ? "Tranex Medical Logistics Nigeria"
          : "Lagos State Health Network",
      name: `${ROLE_LABELS[newRole]} Demo`,
    });
    window.dispatchEvent(new Event("pulse360-auth-change"));
    setUser(getCurrentUser());
  };

  const handleSignOut = () => {
    signOut();
    window.dispatchEvent(new Event("pulse360-auth-change"));
    navigate("/");
  };

  return (
    <div className="pro-shell">
      {/* Sidebar */}
      <aside className={`pro-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="pro-sidebar-brand">
          <Link to="/" className="brand text-white">
            <span className="brand-mark">
              <i className="bi bi-heart-pulse-fill"></i>
            </span>
            <span className="brand-copy">
              <span className="brand-name text-white">
                PULSE<span>360</span>
              </span>
              <span className="brand-caption" style={{ color: "#8fb3b8" }}>
                COMMAND PLATFORM
              </span>
            </span>
          </Link>
          <button
            className="pro-sidebar-close d-lg-none"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="pro-org-badge">
          <small>ORGANIZATION TENANT</small>
          <strong>{user?.organization || "Lagos State Health Network"}</strong>
        </div>

        <nav className="pro-nav">
          {PRO_NAV_ITEMS.map((item) => {
            const access = perms[item.permKey];
            const isDisabled = !access;
            return (
              <NavLink
                key={item.to}
                to={isDisabled ? "#" : item.to}
                end={item.end}
                onClick={(e) => {
                  if (isDisabled) e.preventDefault();
                  else setSidebarOpen(false);
                }}
                className={({ isActive }) =>
                  `pro-nav-link ${isActive && !isDisabled ? "active" : ""} ${isDisabled ? "disabled" : ""}`
                }
                title={isDisabled ? `Not permitted for ${perms.label}` : item.label}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
                {access === "view" && <span className="pro-access-tag">View</span>}
                {access === "limited" && <span className="pro-access-tag">Limited</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="pro-sidebar-footer">
          <Link to="/" className="pro-public-btn">
            <i className="bi bi-globe2 me-2"></i>
            Public Citizen Platform
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pro-main-wrapper">
        <header className="pro-topbar">
          <div className="d-flex align-items-center gap-3">
            <button
              className="pro-menu-toggle d-lg-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Open menu"
            >
              <i className="bi bi-list"></i>
            </button>
            <div className="pro-topbar-title">
              <strong>Nigeria Operations Command</strong>
              <span className="d-none d-sm-inline"> · Health Signals → Supply → Response</span>
            </div>
          </div>

          <div className="pro-topbar-right">
            <div className="pro-role-switcher">
              <label htmlFor="proRoleSwitch" className="d-none d-md-inline">Active Role (RBAC):</label>
              <select
                id="proRoleSwitch"
                value={activeRole}
                onChange={(e) => handleRoleSwitch(e.target.value)}
                className="pro-role-select"
              >
                <option value="admin">Administrator (Full Access)</option>
                <option value="facility_staff">Facility Staff</option>
                <option value="warehouse_officer">Warehouse / Supply Officer</option>
                <option value="logistics">Logistics Provider</option>
                <option value="public_health_officer">Public Health Officer (NCDC)</option>
              </select>
            </div>

            {user && (
              <button onClick={handleSignOut} className="btn-logout" title="Sign Out">
                <i className="bi bi-box-arrow-right"></i>
              </button>
            )}
          </div>
        </header>

        <main className="pro-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default ProLayout;
