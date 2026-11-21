import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function AppLayout({ children }) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="pulse-app">
      <ScrollToTop />

      {/* Breaking Advisory Global Banner */}
      {showBanner && (
        <div className="global-alert-ticker" role="alert">
          <div className="container ticker-container">
            <div className="ticker-label">
              <span className="pulse-dot-red"></span>
              <strong>CRITICAL ADVISORY</strong>
            </div>
            <div className="ticker-message">
              <span>
                Active Cholera Surveillance in coastal districts: Boil drinking water and maintain strict hygiene.
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
