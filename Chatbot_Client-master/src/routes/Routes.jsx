// Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/landing";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoutes";
import SignUp from "../components/Auth/Signup";
import SignIn from "../components/Auth/Signin";
import AdminSignIn from "../components/Auth/AdminSignin";
import OnlyAdminRoute from "./OnlyAdminRoutes";
import UploadForm from "../components/Admin/UploadForm";
import ParentUpload from "../components/Admin/ParentUpload";

function Routing() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/adminsignin" element={<AdminSignIn />} />
          <Route
            path="/upload"
            element={
              <OnlyAdminRoute>
                <ParentUpload />
              </OnlyAdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Routing;
