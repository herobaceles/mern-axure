//auth-route.js

import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { askBot } from '../chatbot/openaiBot.js'; // ✅ stays inside backend/



const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/check-auth", verifyToken, checkAuth);

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
