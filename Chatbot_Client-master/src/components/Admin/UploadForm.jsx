import React, { useState } from "react";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const UploadForm = ({ onUpload }) => {
  const [adminID, setAdminID] = useState("");
  const [version, setVersion] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adminID === "" || version === "" || !file) {
      setError("All fields are required.");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("adminID", adminID);
    formData.append("version", version);
    formData.append("pdffile", file);

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/admin/uploadpdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Form submitted successfully!");
      setError("");
      onUpload(res.data);
    } catch (err) {
      setError("An error occurred during the submission.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Documentation</h2>
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="AdminID"
          variant="outlined"
          fullWidth
          required
          value={adminID}
          onChange={(e) => setAdminID(e.target.value)}
        />
        <TextField
          label="Version"
          variant="outlined"
          fullWidth
          required
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
        <div>
          <input
            accept="application/pdf"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload PDF
            </Button>
          </label>
          {file && <p className="mt-2 text-sm">{file.name}</p>}
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default UploadForm;
