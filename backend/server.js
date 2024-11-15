import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db_config.js";
import { connectFCM } from "./configs/fcm_config.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// console.log(process.env.MONGO_URI);
// console.log(process.env.ACCOUNT_KEY);

app.listen(3000, () => {
  connectDB();
  connectFCM();
  console.log("Server is running on port 3000");
});
