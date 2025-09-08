const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const authRoutes = require("./routes/auth.routes");
const compressRoutes = require("./routes/compress.routes");
const cookieParser = require("cookie-parser");
const historyRoutes = require("./routes/history.routes");
const app = express();

const path = require("path");
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    },
  })
);
app.use(helmet());
app.use(cookieParser());
// app.use(cors({ credentials: true, origin: "*" }));
app.use(
  cors({
    origin: "https://kilobytekutter.vercel.app", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if using cookies/auth
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/compress", compressRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => res.json({ message: "Backend is running ✅" }));

module.exports = app;
