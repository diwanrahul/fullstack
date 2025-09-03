require("dotenv").config();
const app = require("../app");
const connectDB = require("../utils/db");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res); // ✅ pass req/res directly to Express
};
