const express = require("express");
const { db } = require("./db/db");
const routes = require("./routes/transactions");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

// CORS configuration (allowing specific origin and credentials)
app.use(
  cors({
    origin: "http://localhost:3000", // Specify your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", routes);
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
});

// Start server
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});

// Connect to database
db();
