import { Navigate } from "react-router-dom";

function OnlyAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;
  if (role !== "admin") {
    return <Navigate to="/adminsignin" replace />;
  }

  return children;
}

export default OnlyAdminRoute;
