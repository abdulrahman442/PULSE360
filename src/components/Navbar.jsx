import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, signOut } from "../services/api";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
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
      {/* Top Nigeria Emergency / Hotline Bar */}
      <div className="pulse-topbar">
        <div className="container pulse-topbar-inner">
          <div className="topbar-left">
            <span className="emergency-badge">
              <i className="bi bi-broadcast"></i> NIGERIA HEALTH NETWORK
            </span>
            <span className="topbar-text">
              From health signals to coordinated action · 36 States &amp; FCT Abuja
            </span>
          </div>
          <div className="topbar-right">
            <a href="tel:112" className="hotline-link">
              <i className="bi bi-telephone-fill"></i>
              <span>Nigeria Emergency: <strong>112</strong></span>
            </a>
            <span className="topbar-divider">|</span>
            <a href="tel:6232" className="hotline-link">
              <i className="bi bi-shield-exclamation"></i>
              <span>NCDC Outbreak Line: <strong>6232</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg pulse-navbar">
        <div className="container">
          <Link to="/" className="navbar-brand brand" onClick={closeMenu}>
            <span className="brand-mark">
              <i className="bi bi-heart-pulse-fill" aria-hidden="true"></i>
            </span>
            <span className="brand-copy">
              <span className="brand-name">
                PULSE<span>360</span>
              </span>
              <span className="brand-caption">NIGERIA PUBLIC HEALTH</span>
            </span>
          </Link>

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
                  to="/health-map"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-map me-1"></i>
                  Health Map
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/alerts"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-bell me-1"></i>
                  Alerts
                  <span className="nav-pulse-dot" title="Active NCDC advisories"></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/awareness"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-shield-check me-1"></i>
                  Health Info
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/emergency"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <i className="bi bi-telephone-plus me-1 text-danger"></i>
                  Emergency
                </NavLink>
              </li>
            </ul>

            <div className="navbar-actions">
              <Link
                to="/pro"
                className="btn-pro-portal"
                onClick={closeMenu}
                title="Open Professional Operations & Supply Chain Command"
              >
                <i className="bi bi-grid-1x2-fill me-1"></i>
                Command Portal
              </Link>

              {user ? (
                <div className="user-nav-dropdown">
                  <div className="user-profile-badge">
                    <img src={user.avatar} alt={user.name} className="user-nav-avatar" />
                    <div className="user-nav-details">
                      <span className="user-nav-name">{user.name}</span>
                      <span className="user-nav-role">{user.roleLabel || user.role || "Member"}</span>
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
