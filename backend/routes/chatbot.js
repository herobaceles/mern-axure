//chatbot.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const openaibot = require('../chatbot/openaibot');

// Chatbot route
router.post('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  const userInput = req.body.message;
  const response = await openaibot(userInput, userId);
  res.json({ reply: response });
});

module.exports = router;