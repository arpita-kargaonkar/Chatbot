import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;
  console.log(role);
  if (role !== "user") {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
