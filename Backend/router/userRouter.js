const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("../middleware/auth");
const { authenticateUser } = require("../middleware/auth");
require("dotenv").config();
const { validateUser } = require("../validators/userValidators");

router.post("/register", async (req, res) => {
  try {
    // Validate request body
    validateUser(req.body);

    const { userName, email, password, role } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email is already in use.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document with provided user details
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new User document to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);

    // Check if the error is a validation error
    if (
      error.name === "ValidationError" ||
      error.message.startsWith("ValidationError")
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required in the request body.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_Id: user.user_Id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 month
    );

    res.status(200).json({
      message: "Login successful.",
      token: token,
      expiresIn: 3600, // Token expires in 1 hour (3600 seconds)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update", authenticateUser, async (req, res) => {
  try {
    const { userId } = req.query; // Extract userId from query parameters
    const updateFields = req.body; // Extract fields to update from the request body

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: "userId is required in the query parameters" });
    }

    // Check if the authenticated user is authorized to update this user's information
    if (req.user && req.user.user_Id && req.user.user_Id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized - You do not have permission to update this user" });
    }

    // Update user information in the database
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateFields, { new: true });

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.query;
  const { newPassword, confirmPassword } = req.body;

  // Check if email exists in the database
  const user = User.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Update user's password in the database
  user.password = newPassword;

  // Return success response
  res.json({ message: "Password reset successful" });
});


const validateUserId = (userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error("userId must be a non-empty string");
  }
};
router.get("/users_id", isAdmin, async (req, res) => {
  try {
    const { userId } = req.query; // Extract userId from the query parameters

    // Validate userId existence
    validateUserId(userId);

    // Find the user in the database using the provided userId
    const user = await User.findOne({ _id: userId });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user details
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/users_id", isAdmin, async (req, res) => {
  try {
    const { userId } = req.query; // Extract userId from the query parameters

    // Validate userId existence and type using the validation function
    validateUserId(userId);

    // Find the user in the database using the provided userId
    const userToDelete = await User.findOne({ _id: userId });

    // If user with the given ID is not found, return 404 Not Found
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the authenticated user is authorized to delete this user
    if (req.user.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized - You do not have permission to delete this user" });
    }

    // Remove the user from the database
    await User.deleteOne({ _id: userId });

    // Return success response
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*router.delete("/delete", (req, res) => {
  const userId = parseInt(req.query.userId);

  // Find the index of the user with the given user ID
  const index = User.findIndex((user) => user.id === userId);

  // If user with the given ID is not found, return 404 Not Found
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Remove the user from the array of users
  users.splice(index, 1);

  // Return success response
  res.json({ message: "User deleted successfully" });
});
*/
// DELETE endpoint for deleting the image of a user by user ID
router.delete("/image/delete", async (req, res) => {
  try {
    // Extract the user ID from the request body
    const userId = req.body.userId;

    // Check if the user ID is provided
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required in the request body." });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user's image
    user.user_image = undefined;
    await user.save();

    // Return a success message
    res.status(200).json({ message: "User image deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;


