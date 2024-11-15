import express from "express";
import {
  saveOrUpdateToken,
  getAllUsersWithTokens,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/save-token", saveOrUpdateToken);
router.get("/get-users-with-tokens", getAllUsersWithTokens);

export default router;
