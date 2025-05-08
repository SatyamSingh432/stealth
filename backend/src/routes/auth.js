import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/authController.js";
router.post("/register", registerUser);
router.post("/login", (req, res) => {
  res.send("working22");
  res.end();
});
export default router;
