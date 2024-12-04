import React, { useEffect, useState } from "react";
import ChatBody from "../Chat/ChatBody/ChatBody";
import axios from "axios";

function Home() {
  const [token, setToken] = useState(null);
  useEffect (()=>{
    const t = localStorage.getItem("token");
    setToken(t);
  },[])
  const [files, setFiles] = useState([]);
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
  return (
    <>
      <ChatBody token = {token} files = {files}/>
    </>
  );
}

export default Home;
