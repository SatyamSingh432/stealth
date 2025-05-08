import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  verifyUser,
} from "../controllers/authController.js";
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
export default router;
