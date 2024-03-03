var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const ratingSchema = new mongoose.Schema({
    rating_Id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: uuidv4, // Set a default value using uuidv4
    },
    car_Id: {
      type: String,
      trim: true,
      // Add a reference to the Car model for the foreign key relationship
      ref: 'Car',
    },
    overallRating: {
      type: Number,
    },
    cleanliness: {
      type: Number,
    },
    comfort: {
      type: Number,
    },
    performance: {
      type: Number,
    },
    fuelEfficiency: {
      type: Number,
    },
    comment: {
      type: String,
    },
  });


ratingSchema.plugin(require("mongoose-autopopulate"));
// Create the User model
const Rating = mongoose.model("Rating", ratingSchema);

// Export the User model
module.exports = Rating;
