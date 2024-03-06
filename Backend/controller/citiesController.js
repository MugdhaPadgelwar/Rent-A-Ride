const { authenticateUser, isAdmin } = require("../middleware/auth");

//Import Model
const Cities = require("../models/City");

const addCities = async (req, res) => {
  try {
    const { city, state } = req.body;

    // Validation
    if (!city || !state) {
      return res.status(400).json({
        error: "City and State are required in the request body.",
      });
    }

    // Check if the city already exists
    const existingLocation = await Cities.findOne({ city, state });
    if (existingLocation) {
      return res.status(409).json({
        error: "City already exists for the provided state.",
      });
    }

    // Create a new Location document with provided city and state
    const newLocation = new Cities({
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


const deleteCityById = async (req, res) => {
  try {
    const { cityId } = req.body; // Extract cityId from the request body

    if (!cityId) {
      return res.status(400).json({ message: "City ID is required" });
    }

    // Find the city in the database using the provided cityId
    const cityToDelete = await Cities.findById(cityId);

    // If city with the given ID is not found, return 404 Not Found
    if (!cityToDelete) {
      return res.status(404).json({ message: "City not found" });
    }

    // Remove the city from the database
    await Cities.deleteOne({ _id: cityId });

    // Return success response
    res.json({ message: "City deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCities = async (req, res) => {
  try {
    // Query the database to retrieve all cities
    const cities = await Cities.find();

    // Send the retrieved cities as a response
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  addCities, 
  deleteCityById, 
  getAllCities,
};
