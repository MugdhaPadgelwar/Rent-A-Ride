// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();

// Connect to the database
require("./database/connection");

// Load environment variables from .env file
require("dotenv").config();

// Set the port to listen for incoming requests
const port = process.env.SERVER_PORT;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Import route handlers
const userRoutes = require("./router/userRouter");
const ratingRoutes = require("./router/ratingRoutes");
const orderRoutes = require("./router/orderRoutes");
const locationRoutes = require("./router/locationRoutes");
const adminRoutes = require("./router/adminRoutes");
const carRoutes = require("./router/carRoutes");

// Mount route handlers
app.use("/users", userRoutes);
app.use("/ratings", ratingRoutes);
app.use("/orders", orderRoutes);
app.use("/locations", locationRoutes);
app.use("/admin", adminRoutes);
app.use("/cars", carRoutes);

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the Express application
module.exports = app;
