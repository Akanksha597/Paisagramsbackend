const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
// ✅ Use routes
app.use("/v1/auth", authRoutes);

// ✅ Serve uploads folder publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api", require("./routes/pdfRoutes"));

app.use("/api", require("./routes/downloadRoutes"));

// ✅ 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
});

// const PORT = process.env.PORT || 5016;
const serverless = require("serverless-http");

module.exports = serverless(app);

