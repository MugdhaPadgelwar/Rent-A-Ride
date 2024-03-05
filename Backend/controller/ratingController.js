// Import middleware
const { authenticateUser, isAdmin } = require("../middleware/auth");

//Import Model
const Rating = require("../models/Rating");

// Import validators
const {
  validateOverallRating,
  validateCleanliness,
  validateComfort,
  validatePerformance,
  validateFuelEfficiency,
} = require("../validators/ratingValidators");

const addRating = async (req, res) => {
  try {
    const {
      car,
      overallRating,
      cleanliness,
      comfort,
      performance,
      fuelEfficiency,
      comment,
    } = req.body;

    // Validate attributes
    validateOverallRating(overallRating);
    validateCleanliness(cleanliness);
    validateComfort(comfort);
    validatePerformance(performance);
    validateFuelEfficiency(fuelEfficiency);

    // Create a new rating document
    const newRating = new Rating({
      car,
      overallRating,
      cleanliness,
      comfort,
      performance,
      fuelEfficiency,
      comment,
    });

    // Save the rating to the database
    const savedRating = await newRating.save();

    res.status(201).json(savedRating);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// GET endpoint to get a rating by ID
const getRatingById = async (req, res) => {
  try {
    const ratingId = req.query.id;

    // Find the rating by ID
    const foundRating = await Rating.findById(ratingId);

    // Check if the rating exists
    if (!foundRating) {
      return res.status(404).json({ error: "Rating not found." });
    }

    // Return the found rating
    res.status(200).json(foundRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT endpoint to update a rating by ID
const updateById = async (req, res) => {
  try {
    const ratingId = req.query.id;
    const {
      overallRating,
      cleanliness,
      comfort,
      performance,
      fuelEfficiency,
      comment,
    } = req.body;

    // Validate attributes
    validateOverallRating(overallRating);
    validateCleanliness(cleanliness);
    validateComfort(comfort);
    validatePerformance(performance);
    validateFuelEfficiency(fuelEfficiency);

    // Find the rating by ID
    const foundRating = await Rating.findById(ratingId);

    // Check if the rating exists
    if (!foundRating) {
      return res.status(404).json({ error: "Rating not found." });
    }

    // Update the rating fields
    foundRating.overallRating = overallRating;
    foundRating.cleanliness = cleanliness;
    foundRating.comfort = comfort;
    foundRating.performance = performance;
    foundRating.fuelEfficiency = fuelEfficiency;
    foundRating.comment = comment;

    // Save the updated rating
    const updatedRating = await foundRating.save();

    res.status(200).json(updatedRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteById = async (req, res) => {
  try {
    const ratingId = req.query.id;

    // Find the rating by ID and delete it
    const deletedRating = await Rating.findById(ratingId);

    // Check if the rating exists
    if (!deletedRating) {
      return res.status(404).json({ error: "Rating not found." });
    }

    res.status(200).json({ message: "Rating deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addRating,
  getRatingById,
  updateById,
  deleteById,
};
