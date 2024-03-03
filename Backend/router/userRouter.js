const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Location = require("../models/Location");
const Car = require("../models/Car");
const Order = require("../models/Order");
const Rating = require("../models/Rating");
const mongoose = require("mongoose");

router.post("/locations", async (req, res) => {
  try {
    const { location_id, city, state } = req.body;

    // Validation
    if (!location_id || !city || !state) {
      return res
        .status(400)
        .json({
          error:
            "Location ID, City, and State are required in the request body.",
        });
    }

    // Create a new Location document
    const newLocation = new Location({
      location_id,
      city,
      state,
    });

    // Save the new Location document to the database
    const savedLocation = await newLocation.save();

    res.status(201).json(savedLocation);
  } catch (error) {
    console.error(error);

    // Check if the error is a validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
