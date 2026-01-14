const express = require("express");
const cors = require("cors");
const estimateRoutes = require("./routes/estimateRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes"); // 🆕 Import the new routes

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// 🔹 Register Routes
app.use("/api/auth", authRoutes); 
app.use("/api/estimate", estimateRoutes); 
app.use("/api/admin", adminRoutes); // 🆕 This registers /api/admin/rules

// Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "PreSales Estimator backend is running securely"
  });
});

// 🔹 Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Root check
app.get("/", (req, res) => {
  res.send("PreSales Estimator API is active");
});

module.exports = app;