import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./configs/db_config.js";
import { connectFCM } from "./configs/fcm_config.js";
import userRoutes from "./routes/user.route.js";
import notificationRoutes from "./routes/notification.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(cors());
app.use(express.json()); // Parse JSON payloads

// app.get("/", (req, res) => res.send("Hello World!!!"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(3000, async () => {
  await connectDB();
  await connectFCM();
  console.log("Server is running on port 3000");
});
