var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

  const { v4: uuidv4 } = require('uuid');

  const carSchema = new mongoose.Schema({
    car_Id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: uuidv4, // Set a default value using uuidv4
    },
    user_Id: {
      type: String,
      trim: true,
      // Add a reference to the User model for the foreign key relationship
      ref: 'User',
    },
    car_Model: {
      type: String,
      trim: true,
    },
    car_Brand: {
      type: String,
      trim: true,
    },
    car_Year: {
      type: Number,
    },
    car_Image: {
      type: String,
    },
    car_No_Plate: {
      type: String,
      trim: true,
    },
    car_Capacity: {
      type: Number,
    },
    car_Type: {
      type: String,
      enum: ['automatic', 'manual'],
    },
    car_FuelType: {
      type: String,
      enum: ['diesel', 'petrol', 'electric'],
    },
    car_Mileage: {
      type: Number,
    },
    car_Price_PerHour: {
      type: Number,
    },
    car_InsuranceNumber: {
      type: String,
      trim: true,
    },
    availability: {
      type: Boolean,
    },
  });
carSchema.plugin(require("mongoose-autopopulate"));
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
