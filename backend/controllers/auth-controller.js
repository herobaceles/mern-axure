
//auth-controller.js

import User from "../model/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";

import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail
} from "../resend/email.js";

// ----------------------------- SIGNUP -----------------------------
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24h
    });

    await user.save();
    generateJWTToken(res, user._id);

    // ✅ Send response first
    res.status(201).json({
      success: true,
      message: "User created. Verification email sent.",
      user: { ...user._doc, password: undefined }
    });

    // ✅ Send email after response (no await to avoid blocking)
    sendVerificationEmail(user.email, verificationToken)
      .then(() => console.log("Verification email sent"))
      .catch((err) => console.error("Failed to send verification email:", err));

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ----------------------------- LOGIN -----------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: "Email not verified" });
    }

    generateJWTToken(res, user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { ...user._doc, password: undefined }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------------------- LOGOUT -----------------------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------------------- VERIFY EMAIL -----------------------------
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    generateJWTToken(res, user);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user._doc, password: undefined }
    });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------------------- CHECK AUTH -----------------------------
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.error("Check auth error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------------------- SEND RESET CODE -----------------------------
export const sendResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    await sendPasswordResetEmail(email, resetCode);

    res.status(200).json({ success: true, message: "Reset code sent to email" });
  } catch (error) {
    console.error("Send reset code error:", error);
    res.status(500).json({ success: false, message: "Failed to send reset code" });
  }
};

// ----------------------------- VERIFY RESET CODE -----------------------------
export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.resetCode !== code || user.resetCodeExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset code" });
    }

    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Reset code verified" });
  } catch (error) {
    console.error("Verify reset code error:", error);
    res.status(500).json({ success: false, message: "Reset code verification failed" });
  }
};

// ----------------------------- RESET PASSWORD -----------------------------
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await sendResetSuccessEmail(email);

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Password reset failed" });
  }
};
