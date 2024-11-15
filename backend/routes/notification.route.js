import express from "express";
import {
  sendToOneUser,
  sendToAllUsers,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/send-to-one", sendToOneUser);
router.post("/send-to-all", sendToAllUsers);

export default router;
