const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");

// Import routes
const usersRoute = require("./routes/usersRoute");
const orderRoute = require("./routes/ordersRoute");
const carRoute = require("./routes/carRoute");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Set up routes
app.use("/api/v1/user", usersRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/car", carRoute);

// Error handling middleware
app.use(errorHandler);

// Export the handler
module.exports.handler = serverless(app);
