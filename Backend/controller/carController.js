//Import Model
const Car = require("../models/Car");

const { verifyToken } = require("../middleware/auth");

require("dotenv").config();
const {
  validateUserId,
  validateLocationId,
  validateCarModel,
  validateCarBrand,
  validateCarYear,
  validateCarImage,
  validateCarNoPlate,
  validateCarCapacity,
  validateCarType,
  validateCarFuelType,
  validateCarMileage,
  validateCarPricePerHour,
  validateCarInsuranceNumber,
  validateAvailability,
  validateCarId,
} = require("../validators/carValidators");

// POST endpoint for creating a new car
const add =
  (verifyToken,
  async (req, res) => {
    try {
      // Extract car details from request body
      const {
        userId,
        locationId,
        carModel,
        carBrand,
        carYear,
        carImage,
        carNoPlate,
        carCapacity,
        carType,
        carFuelType,
        carMileage,
        carPricePerHour,
        carInsuranceNumber,
        availability,
      } = req.body;

      // Validation
      validateUserId(userId);
      validateLocationId(locationId);
      validateCarModel(carModel);
      validateCarBrand(carBrand);
      validateCarYear(carYear);
      validateCarImage(carImage);
      validateCarNoPlate(carNoPlate);
      validateCarCapacity(carCapacity);
      validateCarType(carType);
      validateCarFuelType(carFuelType);
      validateCarMileage(carMileage);
      validateCarPricePerHour(carPricePerHour);
      validateCarInsuranceNumber(carInsuranceNumber);
      validateAvailability(availability);

      // Create a new car document
      const newCar = new Car({
        userId,
        locationId,
        carModel,
        carBrand,
        carYear,
        carImage,
        carNoPlate,
        carCapacity,
        carType,
        carFuelType,
        carMileage,
        carPricePerHour,
        carInsuranceNumber,
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
const getAllCars = async (req, res) => {
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
};

// GET endpoint for getting cars by car model using query parameters
const getByModelName = async (req, res) => {
  try {
    // Extract the car model from the query parameters
    const carModel = req.query.model;

    // Check if car model is provided
    if (!carModel) {
      return res
        .status(400)
        .json({ error: "Car model is required in query parameters." });
    }

    // Find the cars by their model
    const cars = await Car.find({ carModel: carModel });

    // Check if cars were found
    if (!cars || cars.length === 0) {
      return res
        .status(404)
        .json({ message: "No cars found with the provided model." });
    }

    // Return all details of the cars found
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT endpoint for updating car details by car ID passed through query parameters
const updateCars =
  (verifyToken,
  async (req, res) => {
    try {
      // Extract the car ID from the query parameters
      const carId = req.query.carId;

      // Extract the new car price from the request body
      const { carPricePerHour } = req.body;

      // Validate new car price
      try {
        validateCarPricePerHour(carPricePerHour);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

      // Check if the car ID is provided
      if (!carId) {
        return res
          .status(400)
          .json({ error: "Car ID is required in query parameters." });
      }

      // Find the car by its ID and update its price
      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        { carPricePerHour },
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

// DELETE endpoint for deleting a car by car ID passed through request body
const deleteCars =
  (verifyToken,
  async (req, res) => {
    try {
      // Extract the car ID from the request body
      const { carId } = req.body;

      // Validate car ID
      validateCarId(carId);

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

const getCarByLocationId = async (req, res) => {
  try {
    // Extract the location ID from the request body
    const { locationId } = req.body;

    // Validate location ID
    validateLocationId(locationId);

    // Find the car by its location ID
    const car = await Car.findOne({ locationId });

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
};

module.exports = {
  add,
  getAllCars,
  getByModelName,
  updateCars,
  deleteCars,
  getCarByLocationId,
};
