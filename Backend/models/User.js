var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

// Create an embedded schema for the user's address
const addressSchema = new Schema(
  {
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

// Create the user schema
const userSchema = new Schema({
  user_Id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  location_Id: {
    type: String,
    trim: true,
    // Add a reference to the Location model for the foreign key relationship
    ref: "Location",
  },
  user_Name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    // Note: You should consider using a more secure way to store passwords, like bcrypt
  },
  address: {
    type: addressSchema,
  },
  mobile_Number: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    trim: true,
  },
  user_image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["buyer", "renter", "admin"],
  },
});

userSchema.plugin(require("mongoose-autopopulate"));
// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
