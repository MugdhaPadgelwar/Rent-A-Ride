// Import middleware
const { authenticateUser, isAdmin } = require("../middleware/auth");

//Import Model
const Location = require("../models/Location");

const postadd = async (req, res) => {
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
};

const getAlllocation = async (req, res) => {
  try {
    // Retrieve all locations from the database
    const allLocations = await Location.find();

    res.status(200).json(allLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT endpoint for updating a location
const updatelocation = async (req, res) => {
  try {
    // Extract the location ID from the query parameters
    const locationId = req.query.locationId;

    // Extract the location details from the request body
    const { city, state, area, dateTime } = req.body;

    // Check if the location ID is provided
    if (!locationId) {
      return res
        .status(400)
        .json({ error: "Location ID is required in query parameters." });
    }

    // Find the location by its ID
    const location = await Location.findById(locationId);

    // Check if the location exists
    if (!location) {
      return res
        .status(404)
        .json({ message: "Location not found with the provided ID." });
    }

    // Update the location details if provided
    if (city) location.city = city;
    if (state) location.state = state;

    // Ensure that location.area is initialized before updating its properties
    if (!location.area) {
      location.area = {}; // Initialize area object if it does not exist
    }

    if (area) {
      if (area.pickup) location.area.pickup = area.pickup;
      if (area.drop) location.area.drop = area.drop;
    }

    // Ensure that location.date_time is initialized before updating its properties
    if (!location.dateTime) {
      location.dateTime = {}; // Initialize date_time object if it does not exist
    }

    if (dateTime) {
      if (dateTime.pickupDateAndTime)
        location.dateTime.pickupDateAndTime = new Date(
          dateTime.pickupDateAndTime
        );
      if (dateTime.dropDateAndTime)
        location.dateTime.dropDateAndTime = new Date(dateTime.dropDateAndTime);
    }

    // Save the updated location
    await location.save();

    // Return the updated location
    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  postadd,
  getAlllocation,
  updatelocation,
};
