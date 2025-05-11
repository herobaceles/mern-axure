import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth-route.js";
import { connectToDatabase } from "./database/connectionToDatabase.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectToDatabase();

// Auth Routes
app.use("/api/auth", authRoutes);

// Reservation Schema & Model
const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  roomType: String,
  date: String,
  nights: Number,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

// Routes for Booking
app.get("/api/availability", async (req, res) => {
  res.json({ availableRooms: ["Single", "Double", "Suite"] });
});

app.post("/api/reserve", async (req, res) => {
  const { name, email, roomType, date, nights } = req.body;
  try {
    const reservation = new Reservation({ name, email, roomType, date, nights });
    await reservation.save();
    res.json({ success: true, reservationId: reservation._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to reserve room" });
  }
});

app.get("/api/reservation/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ error: "Not found" });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/cancel/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
