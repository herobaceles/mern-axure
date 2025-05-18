import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as chrono from "chrono-node";
import adminRoutes from "./routes/admin-route.js";

import authRoutes from "./routes/auth-route.js";
import { connectToDatabase } from "./database/connectionToDatabase.js";
import { verifyToken } from "./middleware/verifyToken.js";
import User from "./model/user.js"; // this matches: export default User;

import { Booking } from "./model/booking.js";
import { askBot } from "./chatbot/openaiBot.js";
import { createPaypalOrder, capturePaypalOrder } from "./utils/paypal.js";
import { pendingBookings } from "./utils/bookingCache.js";
import { confirmationMessages } from "./utils/confirmationCache.js"; // ✅ import confirmation store

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/availability", (req, res) => {
  res.json({ availableRooms: ["Single", "Double", "Suite"] });
});

// ✅ AI chatbot endpoint with PayPal payment integration
app.post("/api/ask", verifyToken, async (req, res) => {
  const userInput = req.body.message;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Check for payment confirmation messages first
    const userIdStr = user._id.toString();
    if (confirmationMessages.has(userIdStr)) {
      const messages = confirmationMessages.get(userIdStr);
      confirmationMessages.delete(userIdStr); // Clear after sending
      return res.json({ reply: messages[messages.length - 1] });
    }

    const reply = await askBot(userInput, {
      userId: user._id,
      name: user.name,
      email: user.email,
      cookie: req.headers.cookie,

      reserve: async (roomType, checkInRaw, nights) => {
        const checkIn = chrono.parseDate(checkInRaw);
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + nights);

        const downPayment = 50;

        try {
          const order = await createPaypalOrder(downPayment);
          const approvalUrl = order.links.find(link => link.rel === "approve").href;

          pendingBookings.set(order.id, {
            userId: user._id,
            roomType,
            checkIn,
            checkOut,
            nights,
          });

          return {
            message: `🛏️ To confirm your **${roomType}** booking from **${checkIn.toDateString()}** to **${checkOut.toDateString()}** for **${nights} night(s)**, please pay a **$${downPayment} downpayment**.\n\n👉 [Click here to pay via PayPal](${approvalUrl})\n\nOnce payment is received, your booking will be finalized.`
          };
        } catch (err) {
          console.error("PayPal error:", err);
          return { message: "❌ Failed to initiate PayPal payment. Please try again later." };
        }
      },

      updateReservation: async (bookingId, updates) => {
        const parsedUpdates = {};
        if (updates.checkIn) parsedUpdates.checkIn = chrono.parseDate(updates.checkIn);
        if (updates.nights) {
          parsedUpdates.nights = updates.nights;
          if (parsedUpdates.checkIn)
            parsedUpdates.checkOut = new Date(parsedUpdates.checkIn.getTime() + updates.nights * 86400000);
        }

        const updated = await Booking.findByIdAndUpdate(bookingId, parsedUpdates, { new: true });
        return updated
          ? `✅ Booking updated to ${updated.roomType} from ${updated.checkIn.toDateString()} to ${updated.checkOut.toDateString()}`
          : `❌ No booking found with that ID.`;
      },

      cancelReservation: async (bookingId) => {
        const canceled = await Booking.findByIdAndDelete(bookingId);
        return canceled
          ? `✅ Booking with ID ${bookingId} was successfully canceled.`
          : `❌ No booking found with that ID.`;
      },

      checkAvailability: async (roomType, checkInRaw, nights) => {
        const checkIn = chrono.parseDate(checkInRaw);
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + nights);

        const overlapping = await Booking.find({
          roomType,
          $or: [
            { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
          ]
        });

        if (overlapping.length > 0) {
          return `❌ Sorry, the ${roomType} room is not available from ${checkIn.toDateString()} to ${checkOut.toDateString()}.`;
        } else {
          return `✅ The ${roomType} room is available from ${checkIn.toDateString()} to ${checkOut.toDateString()}.`;
        }
      }
    });

    res.json({ reply });
  } catch (err) {
    console.error("❌ Bot error:", err);
    res.status(500).json({ error: "Failed to process request" });
  }
});

// ✅ PayPal success route
app.get("/paypal/success", async (req, res) => {
  const { token: orderId } = req.query;

  if (!orderId) {
    return res.status(400).send("Missing order ID from PayPal");
  }

  try {
    const capture = await capturePaypalOrder(orderId);

    const bookingData = pendingBookings.get(orderId);
    if (!bookingData) {
      return res.status(400).send("No pending booking found for this order.");
    }

    const newBooking = new Booking({
      userId: bookingData.userId,
      roomType: bookingData.roomType,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      nights: bookingData.nights,
      paid: true,
    });

    await newBooking.save();
    pendingBookings.delete(orderId);

    // ✅ Store chatbot confirmation message
    const userIdStr = bookingData.userId.toString();
    if (!confirmationMessages.has(userIdStr)) {
      confirmationMessages.set(userIdStr, []);
    }
    confirmationMessages.get(userIdStr).push({
      message: `✅ Payment received! Your **${newBooking.roomType}** booking from **${newBooking.checkIn.toDateString()}** to **${newBooking.checkOut.toDateString()}** is confirmed.`
    });

    res.send(`
      <h2>✅ Payment Successful!</h2>
      <p>Thank you for your booking. Your reservation has been confirmed.</p>
      <p><strong>Room Type:</strong> ${newBooking.roomType}</p>
      <p><strong>Check-in:</strong> ${newBooking.checkIn.toDateString()}</p>
      <p><strong>Check-out:</strong> ${newBooking.checkOut.toDateString()}</p>
    `);
  } catch (err) {
    console.error("❌ PayPal capture error:", err);
    res.status(500).send("Failed to confirm your booking. Please contact support.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
