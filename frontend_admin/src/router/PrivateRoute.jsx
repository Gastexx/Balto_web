import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const admin = localStorage.getItem("balto_admin");

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}