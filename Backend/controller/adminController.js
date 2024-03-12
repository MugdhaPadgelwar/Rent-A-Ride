const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import middleware
const { isAdmin } = require("../middleware/auth");

const User = require("../models/User");

const getAllUsers =
  (isAdmin,
  async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find({role:"user"}, { password: 0 }); // Exclude password from the response


      // Return the list of users
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = {
  getAllUsers,
};
