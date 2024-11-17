import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db_config.js";
import { connectFCM } from "./configs/fcm_config.js";
import userRoutes from "./routes/user.route.js";
import notificationRoutes from "./routes/notification.route.js";

dotenv.config();

const app = express();

app.use(express.json()); // Parse JSON payloads

app.get("/", (req, res) => res.send("Hello World!!!"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

// app.use( "/", (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();

// });

app.listen(3000, async () => {
  await connectDB();
  await connectFCM();
  console.log("Server is running on port 3000");
});
