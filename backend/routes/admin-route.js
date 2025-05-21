import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import User from "../model/user.js";
import Booking from "../model/booking.js";

const router = express.Router();

// Basic admin dashboard route
router.get("/admin-dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ success: true, message: "Welcome, Admin!" });
});

// Get all users (hide passwords)
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

// Delete a user by ID
router.delete("/users/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting their own account (optional)
    if (req.user.id === userId) {
      return res.status(400).json({ message: "Admins cannot delete their own account" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
});

// Get all bookings
router.get("/bookings", verifyToken, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
});

export default router;
