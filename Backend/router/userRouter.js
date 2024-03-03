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
const { v4: uuidv4 } = require("uuid");

router.post("/locations", async (req, res) => {
  try {
    const { city, state } = req.body;

    // Validation
    if (!city || !state) {
      return res.status(400).json({
        error: "City and State are required in the request body.",
      });
    }

    // Check if the city already exists
    const existingLocation = await Location.findOne({ city, state });
    if (existingLocation) {
      return res.status(409).json({
        error: "City already exists for the provided state.",
      });
    }

    // Create a new Location document with provided city and state
    const newLocation = new Location({
      location_Id: uuidv4(), // Generate a new UUID for location_Id
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



router.get('/locations/all', async (req, res) => {
  try {
    // Retrieve all locations from the database
    const allLocations = await Location.find();

    res.status(200).json(allLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/register', async (req, res) => {
  try {
    const { user_Name, email, password, role } = req.body;

    // Validation
    if (!user_Name || !email || !password || !role) {
      return res.status(400).json({
        error: 'Username, email, password, and role are required in the request body.',
      });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'Email is already in use.',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document with provided user details
    const newUser = new User({
      user_Id: uuidv4(), // Generate a new UUID for user_Id
      user_Name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new User document to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);

    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;










