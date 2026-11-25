import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function AppLayout({ children }) {
  const [showBanner, setShowBanner] = useState(true);
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <div className="pulse-app">
      <ScrollToTop />

      {/* Offline / Low-Connectivity Status Indicator (PRD NFR) */}
      {!isOnline && (
        <div className="offline-status-banner" role="status">
          <div className="container d-flex align-items-center justify-content-center gap-2">
            <i className="bi bi-wifi-off"></i>
            <span>
              <strong>Offline / Low-Connectivity Mode:</strong> Cached public health data &amp; unsent form drafts remain preserved locally.
            </span>
          </div>
        </div>
      )}

      {/* Breaking NCDC Advisory Global Banner */}
      {showBanner && (
        <div className="global-alert-ticker" role="alert">
          <div className="container ticker-container">
            <div className="ticker-label">
              <span className="pulse-dot-red"></span>
              <strong>NCDC ADVISORY</strong>
            </div>
            <div className="ticker-message">
              <span>
                Active Cholera &amp; Lassa Fever Vigilance in Lagos, Kano, Ondo &amp; Borno LGAs — Boil drinking water &amp; report symptoms to 6232.
              </span>
              <Link to="/alerts/alert-001" className="ticker-link">
                View Full Advisory <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="ticker-dismiss"
              aria-label="Dismiss banner"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      )}

      <Navbar />

      <main className="pulse-main-content">
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
