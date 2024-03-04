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
const { authenticateUser } = require("../middleware/auth");
require("dotenv").config();

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

router.get("/locations/all", async (req, res) => {
  try {
    // Retrieve all locations from the database
    const allLocations = await Location.find();

    res.status(200).json(allLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { user_Name, email, password, role } = req.body;

    // Validation
    if (!user_Name || !email || !password || !role) {
      return res.status(400).json({
        error:
          "Username, email, password, and role are required in the request body.",
      });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email is already in use.",
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
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required in the request body.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_Id: user.user_Id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful.",
      token: token,
      expiresIn: 3600, // Token expires in 1 hour (3600 seconds)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Import the authentication middleware

// POST endpoint for creating a new car
router.post("/cars", authenticateUser, async (req, res) => {
  try {
    // Extract car details from request body
    const {
      user_Id,
      car_Model,
      car_Brand,
      car_Year,
      car_Image,
      car_No_Plate,
      car_Capacity,
      car_Type,
      car_FuelType,
      car_Mileage,
      car_Price_PerHour,
      car_InsuranceNumber,
      availability,
    } = req.body;

    // Validation
    if (
      !user_Id ||
      !car_Model ||
      !car_Brand ||
      !car_Year ||
      !car_No_Plate ||
      !car_Capacity ||
      !car_Type ||
      !car_FuelType ||
      !car_Mileage ||
      !car_Price_PerHour ||
      !car_InsuranceNumber ||
      availability === undefined
    ) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    // Create a new car document
    const newCar = new Car({
      user_Id,
      car_Model,
      car_Brand,
      car_Year,
      car_Image,
      car_No_Plate,
      car_Capacity,
      car_Type,
      car_FuelType,
      car_Mileage,
      car_Price_PerHour,
      car_InsuranceNumber,
      availability,
    });

    // Save the new car document to the database
    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});  

// GET endpoint for getting all cars
router.get('/cars', async (req, res) => {
  try {
    // Fetch all cars from the database
    const cars = await Car.find();

    // Check if there are no cars found
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: 'No cars found.' });
    }

    // Return the list of cars
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint for getting a car by car model using query parameters
router.get('/cars', async (req, res) => {
  try {
    // Extract the car model from the query parameters
    const carModel = req.query.model;

    // Check if car model is provided
    if (!carModel) {
      return res.status(400).json({ error: 'Car model is required in query parameters.' });
    }

    // Find the car by its model and select only specific fields
    const car = await Car.findOne({ car_Model: carModel }, 'car_Model car_Brand car_Year car_Image');

    // Check if the car exists
    if (!car) {
      return res.status(404).json({ message: 'Car not found with the provided model.' });
    }

    // Return only the selected fields of the car found
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







// // Search cars by location ID
// router.get("/cars/search", async (req, res) => {
//   try {
//     const { locationId } = req.query;

//     // Validation
//     if (!locationId) {
//       return res.status(400).json({
//         error: "Location ID is required.",
//       });
//     }

//     // Search for cars by location ID
//     const cars = await Car.find({ location_Id: locationId });

//     if (cars.length === 0) {
//       return res.status(404).json({
//         error: "No cars found for the provided location ID.",
//       });
//     }

//     res.status(200).json(cars);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// PUT endpoint to update user details
router.put("/users", authenticateUser, async (req, res) => {
  try {
    const { user_Id } = req.query; // Extract userId from query parameters
    const updateFields = req.body;

    // Validation: Check if userId is provided
    if (!user_Id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Find the user by userId
    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user details
    Object.assign(user, updateFields);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/forgot-password", (req, res) => {
  const { email } = req.query;
  const { newPassword, confirmPassword } = req.body;

  // Check if email exists in the database
  const user = User.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Update user's password in the database
  user.password = newPassword;

  // Return success response
  res.json({ message: "Password reset successful" });
});
router.delete("/users", (req, res) => {
  const userId = parseInt(req.query.userId);

  // Find the index of the user with the given user ID
  const index = User.findIndex((user) => user.id === userId);

  // If user with the given ID is not found, return 404 Not Found
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Remove the user from the array of users
  users.splice(index, 1);

  // Return success response
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
