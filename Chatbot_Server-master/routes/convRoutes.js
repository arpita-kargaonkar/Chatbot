import express from "express";
import {
  deleteConversation,
  getAllConversations,
  getConversationById,
  saveConversation,
  updateConversation,
} from "../controllers/convController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();
router.post("/save", saveConversation);
router.get("/getall", getAllConversations);
router.get("/id", getConversationById);
router.post("/id/message",updateConversation);
router.post("/delete", deleteConversation);

export default router;
