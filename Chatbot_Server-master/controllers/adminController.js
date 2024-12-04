import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import {__dirname} from "../dirname.js"
import axios from "axios";
import FormData from 'form-data';
export const uploadPdf = async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const mlApiUrl = 'http://127.0.0.1:8000/upload_pdf/'; 
    const formData = new FormData();
    formData.append('pdf_file', fs.createReadStream(path.join(__dirname, 'uploadedFiles', file.filename)));

    const response = await axios.post(mlApiUrl, formData, {
      headers: formData.getHeaders(),
    });

    res.json({ message: 'PDF processed and embeddings stored.', data: response.data });
  } catch (error) {
    console.error('Error forwarding to ML API:', error);
    res.status(500).json({ message: 'Error processing PDF' });
  }
};
export const adminSignin = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  try {
    const { admin_id, admin_passcode } = req.body;
    if (admin_id === process.env.ADMIN_ID) {
      if (admin_passcode === process.env.ADMIN_PASSCODE) {
        const token = jwt.sign({ id: admin_id, role: "admin" }, secret, {
          expiresIn: "1d",
        });
        res.json({ token });
      } else {
        res.status(401);
      }
    } else {
      res.status(401);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllDocs = async (req, res) => {
  try {
    fs.readdir("./uploadedFiles/", (err, files) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(files);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
