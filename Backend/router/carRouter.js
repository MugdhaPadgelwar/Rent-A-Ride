const express = require("express");
const router = express.Router();

const Car = require("../models/Car");

const { v4: uuidv4 } = require("uuid");
const { authenticateUser } = require("../middleware/auth");
require("dotenv").config();

// POST endpoint for creating a new car
router.post("/add", authenticateUser, async (req, res) => {
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
      !location_Id ||
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
router.get("/all", async (req, res) => {
  try {
    // Fetch all cars from the database
    const cars = await Car.find();

    // Check if there are no cars found
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found." });
    }

    // Return the list of cars
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for getting a car by car model using query parameters
router.get("/byModelName", async (req, res) => {
  try {
    // Extract the car model from the query parameters
    const carModel = req.query.model;

    // Check if car model is provided
    if (!carModel) {
      return res
        .status(400)
        .json({ error: "Car model is required in query parameters." });
    }

    // Find the car by its model and select only specific fields
    const car = await Car.findOne({ car_Model: carModel }).select(
      "car_Model car_Brand car_Year car_Image"
    );

    // Check if the car exists
    if (!car) {
      return res
        .status(404)
        .json({ message: "Car not found with the provided model." });
    }

    // Return only the selected fields of the car found
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT endpoint for updating car details (e.g., car price) by car ID passed through query parameters
router.put("/update", async (req, res) => {
  try {
    // Extract the car ID from the query parameters
    const carId = req.query.carId;

    // Extract the new car price from the request body
    const { car_Price_PerHour } = req.body;

    // Check if the car ID is provided
    if (!carId) {
      return res
        .status(400)
        .json({ error: "Car ID is required in query parameters." });
    }

    // Check if the new car price is provided
    if (!car_Price_PerHour) {
      return res.status(400).json({ error: "New car price is required." });
    }

    // Find the car by its ID and update its price
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { car_Price_PerHour },
      { new: true }
    );

    // Check if the car exists
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Return the updated car
    res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE endpoint for deleting a car by car ID passed through query parameters
router.delete("/delete", async (req, res) => {
  try {
    // Extract the car ID from the query parameters
    const carId = req.query.carId;

    // Check if the car ID is provided
    if (!carId) {
      return res
        .status(400)
        .json({ error: "Car ID is required in query parameters." });
    }

    // Find the car by its ID and delete it
    const deletedCar = await Car.findByIdAndDelete(carId);

    // Check if the car exists
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Return a success message
    res.status(200).json({ message: "Car deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for getting a car by location ID
router.get("car/locationId", async (req, res) => {
  try {
    // Extract the location ID from the query parameters
    const locationId = req.query.location_Id;

    // Check if location ID is provided
    if (!locationId) {
      return res
        .status(400)
        .json({ error: "Location ID is required in query parameters." });
    }

    // Find the car by its location ID
    const car = await Car.findOne({ location_Id: locationId });

    // Check if the car exists
    if (!car) {
      return res
        .status(404)
        .json({ message: "Car not found with the provided location ID." });
    }

    // Return the car details
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
