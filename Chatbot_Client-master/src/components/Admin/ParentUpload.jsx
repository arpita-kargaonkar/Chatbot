import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./UploadForm";
import FileList from "./FileList";

const ParentUpload = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getdocs`);
        setFiles(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = (newFile) => {
    setFiles([...files, newFile]);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-200 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <UploadForm onUpload={handleFileUpload} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FileList files={files} onFileSelect={handleFileSelect} />
        </div>
      </div>
    </div>
  );
};

export default ParentUpload;
