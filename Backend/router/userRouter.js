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
      location_Id,
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
      !location_Id||
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
      location_Id,
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
router.get('/cars/name', async (req, res) => {
  try {
    // Extract the car model from the query parameters
    const carModel = req.query.model;

    // Check if car model is provided
    if (!carModel) {
      return res.status(400).json({ error: 'Car model is required in query parameters.' });
    }

    // Find the car by its model and select only specific fields
    const car = await Car.findOne({ car_Model: carModel }).select('car_Model car_Brand car_Year car_Image');

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

// PUT endpoint for updating car details (e.g., car price) by car ID passed through query parameters
router.put('/cars', async (req, res) => {
  try {
    // Extract the car ID from the query parameters
    const carId = req.query.carId;

    // Extract the new car price from the request body
    const { car_Price_PerHour } = req.body;

    // Check if the car ID is provided
    if (!carId) {
      return res.status(400).json({ error: 'Car ID is required in query parameters.' });
    }

    // Check if the new car price is provided
    if (!car_Price_PerHour) {
      return res.status(400).json({ error: 'New car price is required.' });
    }

    // Find the car by its ID and update its price
    const updatedCar = await Car.findByIdAndUpdate(carId, { car_Price_PerHour }, { new: true });

    // Check if the car exists
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found.' });
    }

    // Return the updated car
    res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE endpoint for deleting a car by car ID passed through query parameters
router.delete('/cars', async (req, res) => {
  try {
    // Extract the car ID from the query parameters
    const carId = req.query.carId;

    // Check if the car ID is provided
    if (!carId) {
      return res.status(400).json({ error: 'Car ID is required in query parameters.' });
    }

    // Find the car by its ID and delete it
    const deletedCar = await Car.findByIdAndDelete(carId);

    // Check if the car exists
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found.' });
    }

    // Return a success message
    res.status(200).json({ message: 'Car deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET endpoint for getting a car by location ID
router.get('/cars/location', async (req, res) => {
  try {
    // Extract the location ID from the query parameters
    const locationId = req.query.location_Id;

    // Check if location ID is provided
    if (!locationId) {
      return res.status(400).json({ error: 'Location ID is required in query parameters.' });
    }

    // Find the car by its location ID
    const car = await Car.findOne({ location_Id: locationId });

    // Check if the car exists
    if (!car) {
      return res.status(404).json({ message: 'Car not found with the provided location ID.' });
    }

    // Return the car details
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


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
 

// DELETE endpoint for deleting the image of a user by user ID
router.delete('/users/image', async (req, res) => {
  try {
    // Extract the user ID from the request body
    const userId = req.body.userId;

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in the request body.' });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Delete the user's image
    user.user_image = undefined;
    await user.save();

    // Return a success message
    res.status(200).json({ message: 'User image deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Apply the middleware to the '/orders' route
router.post('/orders', authenticateUser, async (req, res) => {
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 


// Apply the middleware to the '/order' route
router.get('/orders', authenticateUser, async (req, res) => {
  try {
    // Get the order_id from query parameters
    const order_id = req.query.order_id;

    // Validate order_id existence
    if (!order_id) {
      return res.status(400).json({ message: "order_id is required in the query parameters" });
    }

    // Find the order in the database using the provided order_id
    const order = await Order.findOne({ order_Id: order_id });

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the authenticated user is authorized to view this order
    if (order.user_Id !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized - You do not have permission to view this order" });
    }

    // Respond with the order details
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
