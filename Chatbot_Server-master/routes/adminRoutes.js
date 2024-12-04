import express from "express";
import {
  adminSignin,
  getAllDocs,
  uploadPdf,
} from "../controllers/adminController.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.get("/getdocs", getAllDocs);
router.post("/uploadpdf", upload.single("pdffile"), uploadPdf);
router.post("/adminsignin", adminSignin);
export default router;
