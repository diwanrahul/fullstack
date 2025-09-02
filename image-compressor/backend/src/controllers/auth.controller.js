const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return sendError(res, "Email, password and name are required", 400);
    }
    const existing = await User.findOne({ email });
    if (existing) return sendError(res, "User already exists", 400);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });

    return sendSuccess(res, null, "User registered successfully", 201);
  } catch (err) {
    sendError(res, err.message, 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found", 400);

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return sendError(res, "Invalid email or password", 400);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return sendSuccess(
      res,
      {
        token,
        user: { id: user._id, email: user.email, name: user.name },
      },
      "User logged in successfully",
      200
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  blacklistedTokens.add(token);
  return sendSuccess(res, "Logged out successfully", 200);
};
