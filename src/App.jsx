import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import HealthcareFinder from "./pages/HealthcareFinder";
import HealthAlerts from "./pages/HealthAlerts";
import AlertDetails from "./pages/AlertDetails";
import HealthAwareness from "./pages/HealthAwareness";
import CompanyRegistration from "./pages/CompanyRegistration";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function NotFound() {
  return (
    <div className="container py-5 text-center my-5">
      <div className="py-5">
        <i className="bi bi-compass text-primary display-1 mb-3 d-inline-block"></i>
        <h1 className="fw-bold mt-2">Page Not Found (404)</h1>
        <p className="lead text-muted max-w-500 mx-auto">
          The public health resource or page you requested could not be located.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/" className="button button-primary">
            <i className="bi bi-house-door-fill me-2"></i>
            Return to Homepage
          </Link>
          <Link to="/find-healthcare" className="button button-outline">
            <i className="bi bi-hospital me-2"></i>
            Find Healthcare Facilities
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Healthcare Finder */}
          <Route path="/find-healthcare" element={<HealthcareFinder />} />
          <Route path="/healthcare" element={<Navigate to="/find-healthcare" replace />} />

          {/* Epidemiological & Public Health Alerts */}
          <Route path="/alerts" element={<HealthAlerts />} />
          <Route path="/health-alerts" element={<Navigate to="/alerts" replace />} />
          <Route path="/alerts/:id" element={<AlertDetails />} />

          {/* Health Education & Awareness */}
          <Route path="/awareness" element={<HealthAwareness />} />
          <Route path="/health-awareness" element={<Navigate to="/awareness" replace />} />

          {/* For Organisations & Providers */}
          <Route path="/register-company" element={<CompanyRegistration />} />
          <Route path="/companies" element={<Navigate to="/register-company" replace />} />

          {/* Authentication */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
