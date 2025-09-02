const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendError } = require("../utils/response");
const { head } = require("../app");


async function auth(req, res, next) {
  try {
    // 1. Read from cookies OR Authorization header
    const header = req.headers.authorization;
    const cookieToken = req.cookies?.token;
    const token = cookieToken || header?.split(" ")[1];

    // console.log("token", token, header, cookieToken);
    if (!token) return sendError(res, "Unauthorized", 401);

    // 2. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.id);

    if (!user) return sendError(res, "User not found", 401);

    // 3. Attach user to req (not res!)
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    return sendError(res, "Invalid token", 401);
  }
}

module.exports = auth;
