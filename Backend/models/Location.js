var mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    pickup: {
      type: String,
      trim: true,
    },
    drop: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

// Create an embedded schema for date and time
const dateTimeSchema = new mongoose.Schema(
  {
    pickupDateAndTime: {
      type: Date,
    },
    dropDateAndTime: {
      type: Date,
    },
  },
  { _id: false }
);

// Create the location schema
const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
  area: {
    type: areaSchema,
  },
  dateTime: {
    type: dateTimeSchema,
  },
});
// Plugin for autopopulation
locationSchema.plugin(require("mongoose-autopopulate"));

// Create the Location model
const Location = mongoose.model("Location", locationSchema);

// Export the Location model
module.exports = Location;
