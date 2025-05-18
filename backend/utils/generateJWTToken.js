// generateJWTToken.js

import jwt from "jsonwebtoken";
export const generateJWTToken = (res, user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // ✅ make sure this is included
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
