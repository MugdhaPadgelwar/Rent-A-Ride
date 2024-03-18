var mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  cleanliness: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comfort: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  performance: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  fuelEfficiency: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
});

ratingSchema.plugin(require("mongoose-autopopulate"));
// Create the User model
const Rating = mongoose.model("Rating", ratingSchema);

// Export the User model
module.exports = Rating;
