var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

// Create an embedded schema for area
const areaSchema = new Schema(
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
const dateTimeSchema = new Schema(
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
const locationSchema = new Schema({
  location_Id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  area: {
    type: areaSchema,
  },
  date_time: {
    type: dateTimeSchema,
  },
});

// Plugin for autopopulation
locationSchema.plugin(require("mongoose-autopopulate"));

// Create the Location model
const Location = mongoose.model("Location", locationSchema);

// Export the Location model
module.exports = Location;
