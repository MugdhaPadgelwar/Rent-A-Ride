var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

  // Create an embedded schema for the user's address
  const addressSchema = new mongoose.Schema(
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
        minlength: 6,
        maxlength: 6,
      },
    },
    { _id: false }
  );
  
  // Create the user schema
  const userSchema = new mongoose.Schema({
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    userName: {
      type: String,
      trim: true,
      required: true,
      minlength: 4,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 100,
      validate: {
        validator: function (value) {
          // Basic email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 50,
      // Note: You should consider using a more secure way to store passwords, like bcrypt
    },
    address: {
      type: addressSchema,
    },
    mobileNumber: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    age: {
      type: Number,
      min: 1,
      max: 150, // Adjust max age as needed
    },
    gender: {
      type: String,
      trim: true,
      enum: ['male', 'female', 'other'],
    },
    userImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  });

userSchema.plugin(require("mongoose-autopopulate"));
// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
