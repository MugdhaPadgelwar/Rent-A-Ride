const express = require("express");
const router = express.Router();

const Rating = require("../models/Rating");

const { authenticateUser } = require("../middleware/auth");
require("dotenv").config();

// POST endpoint for creating a new rating
router.post("/add", async (req, res) => {
  try {
    // Extract rating details from request body
    const {
      car_Id,
      overallRating,
      cleanliness,
      comfort,
      performance,
      fuelEfficiency,
      comment,
    } = req.body;

    // Create a new rating document
    const newRating = new Rating({
      car_Id,
      overallRating,
      cleanliness,
      comfort,
      performance,
      fuelEfficiency,
      comment,
    });

    // Save the new rating document to the database
    const savedRating = await newRating.save();

    res.status(201).json(savedRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for retrieving a rating by its ID
router.get("/getById", async (req, res) => {
  try {
    // Extract the rating ID from the query parameters
    const ratingId = req.query.ratingId;

    // Check if the rating ID is provided
    if (!ratingId) {
      return res
        .status(400)
        .json({ error: "Rating ID is required in query parameters." });
    }

    // Find the rating by its ID
    const rating = await Rating.findOne({ rating_Id: ratingId });

    // Check if the rating exists
    if (!rating) {
      return res
        .status(404)
        .json({ message: "Rating not found with the provided ID." });
    }

    // Return the rating
    res.json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT endpoint for updating a rating
router.put("/update", async (req, res) => {
  try {
    // Extract the rating ID from the query parameters
    const ratingId = req.query.ratingId;

    // Check if the rating ID is provided
    if (!ratingId) {
      return res
        .status(400)
        .json({ error: "Rating ID is required in query parameters." });
    }

    // Find the rating by its ID
    const rating = await Rating.findById(ratingId);

    // Check if the rating exists
    if (!rating) {
      return res
        .status(404)
        .json({ message: "Rating not found with the provided ID." });
    }

    // Extract the updated rating details from the request body
    const {
      overallRating,
      cleanliness,
      comfort,
      performance,
      fuelEfficiency,
      comment,
    } = req.body;

    // Update the rating details if provided
    if (overallRating !== undefined) rating.overallRating = overallRating;
    if (cleanliness !== undefined) rating.cleanliness = cleanliness;
    if (comfort !== undefined) rating.comfort = comfort;
    if (performance !== undefined) rating.performance = performance;
    if (fuelEfficiency !== undefined) rating.fuelEfficiency = fuelEfficiency;
    if (comment !== undefined) rating.comment = comment;

    // Save the updated rating
    await rating.save();

    // Return the updated rating
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE endpoint for deleting a rating by its ID
router.delete("/delete", async (req, res) => {
  try {
    // Extract the rating ID from the query parameters
    const ratingId = req.query.ratingId;

    // Check if the rating ID is provided
    if (!ratingId) {
      return res
        .status(400)
        .json({ error: "Rating ID is required in query parameters." });
    }

    // Find the rating by its ID and delete it
    const deletedRating = await Rating.findOneAndDelete({
      rating_Id: ratingId,
    });

    // Check if the rating was found and deleted
    if (!deletedRating) {
      return res
        .status(404)
        .json({ message: "Rating not found with the provided ID." });
    }

    // Return the deleted rating
    res.status(200).json(deletedRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
