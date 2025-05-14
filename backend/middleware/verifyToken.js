//verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized" });

    req.userId = decoded.userId; // ✅ ADD THIS
    req.user = {
      id: decoded.userId,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
