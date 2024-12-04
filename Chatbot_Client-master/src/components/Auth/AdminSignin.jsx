// src/components/AdminSignIn.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("All fields are required.");
      return;
    }
    setError("");
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admin/adminsignin`,
      { admin_id: email, admin_passcode: password }
    );
    const { token } = response.data;
    if (token) {
      setSuccess("Logged in successfully!");
      setError("");
      localStorage.setItem("token", token);
      navigate("/upload");
    } else {
      setError("Something Went Wrong");
      setSuccess("");
    }
    // Add actual authentication logic here
    // For example: navigate('/adminhome');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 px-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-[#2930ff] text-center">
          Sign In As Admin
        </h1>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <TextField
            label="Admin Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <TextField
            label="Admin Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In As Admin
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Not an admin? </span>
          <Link to="/signin" className="text-[#2930ff] font-semibold">
            Sign In as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
