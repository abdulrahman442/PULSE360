import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, signOut } from "../services/api";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for custom storage events or re-renders
    const handleAuthChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("pulse360-auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("pulse360-auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    signOut();
    setUser(null);
    window.dispatchEvent(new Event("pulse360-auth-change"));
    navigate("/");
  };

  return (
    <header className="pulse-navbar-wrapper">
      {/* Top Emergency / Hotline Bar */}
      <div className="pulse-topbar">
        <div className="container pulse-topbar-inner">
          <div className="topbar-left">
            <span className="emergency-badge">
              <i className="bi bi-broadcast"></i> LIVE SURVEILLANCE
            </span>
            <span className="topbar-text">
              Active Health Vigilance: Coastal Water Safety & Vector Control Protocols
            </span>
          </div>
          <div className="topbar-right">
            <a href="tel:112" className="hotline-link">
              <i className="bi bi-telephone-fill"></i>
              <span>Emergency: <strong>112 / 911</strong></span>
            </a>
            <span className="topbar-divider">|</span>
            <a href="tel:18005557857" className="hotline-link">
              <i className="bi bi-headset"></i>
              <span>Toll-Free Healthline: <strong>1-800-555-PULSE</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg pulse-navbar">
        <div className="container">
          {/* Brand */}
          <Link to="/" className="navbar-brand brand" onClick={closeMenu}>
            <span className="brand-mark">
              <i className="bi bi-heart-pulse-fill" aria-hidden="true"></i>
            </span>
            <span className="brand-copy">
              <span className="brand-name">
                PULSE<span>360</span>
              </span>
              <span className="brand-caption">PUBLIC HEALTH NETWORK</span>
            </span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            className={`navbar-toggler ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Navigation links & Actions */}
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="pulseNavbarMenu">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/find-healthcare"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-hospital me-1"></i>
                  Find Healthcare
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/alerts"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-bell me-1"></i>
                  Health Alerts
                  <span className="nav-pulse-dot" title="Active advisories in effect"></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/awareness"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-shield-check me-1"></i>
                  Health Awareness
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/register-company"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-buildings me-1"></i>
                  For Providers
                </NavLink>
              </li>
            </ul>

            {/* Authentication / User session section */}
            <div className="navbar-actions">
              {user ? (
                <div className="user-nav-dropdown">
                  <div className="user-profile-badge">
                    <img src={user.avatar} alt={user.name} className="user-nav-avatar" />
                    <div className="user-nav-details">
                      <span className="user-nav-name">{user.name}</span>
                      <span className="user-nav-role">{user.role || "Member"}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-logout"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="btn btn-signin"
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    className="btn btn-get-started"
                    onClick={closeMenu}
                  >
                    Get Started
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
