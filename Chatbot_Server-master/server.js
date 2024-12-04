import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { mongoConnect } from "./utils/mongoConnect.js";
import userRoutes from "./routes/userRoutes.js";
import convRoutes from "./routes/convRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT = process.env.PORT || 4000;

// Connecting to DB
mongoConnect();

// Routing
app.use("/users", userRoutes);
app.use("/conversations", convRoutes);
app.use("/admin", adminRoutes);
app.use("/ai", aiRoutes);


app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
