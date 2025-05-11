import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth-route.js";
import { connectToDatabase } from "./database/connectionToDatabase.js";
import { verifyToken } from "./middleware/verifyToken.js";
import { User } from "./model/user.js"; // ✅ Import User model

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectToDatabase();

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

// Public route
app.get("/api/availability", async (req, res) => {
  res.json({ availableRooms: ["Single", "Double", "Suite"] });
});

// 🔐 Protected route - booking
app.post("/api/reserve", verifyToken, async (req, res) => {
  const { roomType, date, nights } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const reservation = new Reservation({
      name: user.name,
      email: user.email,
      roomType,
      date,
      nights,
    });

    await reservation.save();
    res.json({ success: true, reservationId: reservation._id });
  } catch (err) {
    console.error(err);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
