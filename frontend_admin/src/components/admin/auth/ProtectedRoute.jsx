import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  try {
    const admin = JSON.parse(localStorage.getItem("balto_admin"));

    if (!admin || !admin.id) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
}