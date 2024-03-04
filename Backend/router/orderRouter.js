const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { authenticateUser } = require("../middleware/auth");
require("dotenv").config();

// Apply the middleware to the '/orders' route
router.post("/add", authenticateUser, async (req, res) => {
  try {
    // Destructure details from the request body
    const {
      user_Id,
      car_Id,
      location_Id,
      total_Price,
      payment,
      bookingDateAndTime,
      cancellationReason,
      cancellationDateAndTime,
    } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      order_Id: uuidv4(),
      user_Id: req.user.userId, // Access userId from the authenticated user
      car_Id,
      location_Id,
      total_Price,
      payment,
      bookingDateAndTime,
      cancellationReason,
      cancellationDateAndTime,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the created order
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Apply the middleware to the route
router.get("/getById", authenticateUser, async (req, res) => {
  try {
    // Get the order_id from query parameters
    const order_id = req.query.order_id;

    // Validate order_id existence
    if (!order_id) {
      return res
        .status(400)
        .json({ message: "order_id is required in the query parameters" });
    }

    // Find the order in the database using the provided order_id
    const order = await Order.findOne({ order_Id: order_id });

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the authenticated user is authorized to view this order
    if (order.user_Id !== req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized - You do not have permission to view this order",
      });
    }

    // Respond with the order details
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete", authenticateUser, async (req, res) => {
  try {
    // Get the object_id from request body
    const { object_id } = req.body;

    // Validate object_id existence
    if (!object_id || !mongoose.Types.ObjectId.isValid(object_id)) {
      return res
        .status(400)
        .json({ message: "Valid object_id is required in the request body" });
    }

    // Find the order in the database using the provided object_id
    const order = await Order.findById(object_id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the authenticated user is authorized to delete this order
    if (order.user_Id !== req.user.userId) {
      return res.status(403).json({
        message:
          "Unauthorized - You do not have permission to delete this order",
      });
    }

    // Delete the order from the database
    await Order.findByIdAndDelete(object_id);

    // Respond with a success message
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
