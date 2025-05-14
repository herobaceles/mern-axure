// model/booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  roomType: String,
  checkIn: Date,
  checkOut: Date,
  nights: Number,
}, {
  timestamps: true,
});

export const Booking = mongoose.model("Booking", bookingSchema);
