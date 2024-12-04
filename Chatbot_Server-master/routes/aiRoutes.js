import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import { getResponseFromAi } from "../controllers/aiController.js";

const router = express.Router();
router.get("/", getResponseFromAi);

export default router;
