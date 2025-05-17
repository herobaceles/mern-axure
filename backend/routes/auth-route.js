//auth-route.js

import express from "express";
import { login, logout, signup, verifyEmail, sendResetCode,
  verifyResetCode,
  resetPassword,  checkAuth } from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { askBot } from '../chatbot/openaiBot.js'; // ✅ stays inside backend/



const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
router.post("/verify-email", verifyEmail);

router.get("/check-auth", verifyToken, checkAuth);

router.post("/verify-email", verifyEmail);

/* -------------------------- Password Reset Flow -------------------------- */

// Send 6-digit reset code to email
router.post("/send-reset-code", sendResetCode);

// Verify 6-digit reset code
router.post("/verify-reset-code", verifyResetCode);

// Reset password using verified code
router.post("/reset-password", resetPassword);

router.post('/ask', async (req, res) => {
  const userInput = req.body.message;
  try {
    const response = await askBot(userInput);
    res.json({ reply: response });
  } catch (err) {
    res.status(500).json({ error: 'Bot failed' });
  }
});


export default router;
