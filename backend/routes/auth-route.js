//auth-routes.jsx

import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  sendResetCode,
  verifyResetCode,
  resetPassword,
  checkAuth,
} from "../controllers/auth-controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.get("/check-auth", verifyToken, checkAuth);

/* -------------------------- Password Reset Flow -------------------------- */

// Send 6-digit reset code to email
router.post("/send-reset-code", sendResetCode);

// Verify 6-digit reset code
router.post("/verify-reset-code", verifyResetCode);

// Reset password using verified code
router.post("/reset-password", resetPassword);

export default router;
