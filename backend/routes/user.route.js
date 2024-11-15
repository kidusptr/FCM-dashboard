import express from "express";
import {
  saveOrUpdateToken,
  getAllUsersWithTokens,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/save-token", saveOrUpdateToken);
router.get("/get-users-with-tokens", getAllUsersWithTokens);

export default router;
