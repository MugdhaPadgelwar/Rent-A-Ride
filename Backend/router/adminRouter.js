const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Car = require("../models/Car");
const Order = require("../models/Order");

const { authenticateUser } = require("../middleware/auth");
require("dotenv").config();

// GET endpoint for retrieving all users
router.get("/users/list", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for retrieving all cars
router.get("/cars/list", async (req, res) => {
  try {
    // Retrieve all cars from the database
    const cars = await Car.find();

    // Return the list of cars
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for retrieving all orders
router.get("/orders/list", async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find();

    // Return the list of orders
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
