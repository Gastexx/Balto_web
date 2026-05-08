import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LandingEditor from "./pages/LandingEditor";
import ProtectedRoute from "./components/admin/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/landing"
        element={
          <ProtectedRoute>
            <Navigate to="/admin/landing/planes" replace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/landing/:section"
        element={
          <ProtectedRoute>
            <LandingEditor />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}