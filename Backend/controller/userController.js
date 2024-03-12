const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import middleware
const { verifyToken } = require("../middleware/auth");  
const nodemailer = require('nodemailer');

const User = require("../models/User");
// Import validators
const {
  validateEmail,
  validatePassword,
  validateUserId,
  validateUser, 
  createError,
} = require("../validators/userValidators");
const UserToken = require("../models/UserToken");

// Load environment variables
require("dotenv").config();

const register = async (req, res) => {
  try {
    // Validate request body
    validateUser(req.body);

    const { userName, email, password,role } = req.body;
    

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
};

// POST endpoint for user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    try {
      validateEmail(email); // Validate email
      validatePassword(password); // Validate password
    } catch (error) {
      return res.status(400).json({ error: error.message });
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
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful.",
      token: token,
      expiresIn: 3600, // Token expires in 1 Month
    });
    console.log("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update =
  (verifyToken,
  async (req, res) => {
    try {
      const { userId } = req.query; // Extract userId from query parameters
      const updateFields = req.body; // Extract fields to update from the request body

      // Check if userId is provided
      if (!userId) {
        return res
          .status(400)
          .json({ error: "userId is required in the query parameters" });
      }

      // Check if the authenticated user is authorized to update this user's information
      if (
        req.user &&
        req.user.user_Id &&
        req.user.user_Id.toString() !== userId
      ) {
        return res.status(403).json({
          message:
            "Unauthorized - You do not have permission to update this user",
        });
      }

      // Find the user in the database using the provided userId
      const userToUpdate = await User.findById(userId);

      // Check if the user exists
      if (!userToUpdate) {
        return res.status(404).json({ message: "User not found" });
      }

      // Extract user email from the decoded token
      const tokenUserEmail = req.decoded && req.decoded.email;

      // Check if the extracted user email matches the email of the user to be updated
      if (tokenUserEmail && tokenUserEmail !== userToUpdate.email) {
        return res.status(403).json({
          message:
            "Forbidden - Token email does not match the provided user email",
        });
      }

      // Update user information in the database
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        updateFields,
        { new: true }
      );

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

  const forgetPassword = async (req, res, next) => {
    const email = req.body.email;
  
    try {
      // Find user by email
      const user = await User.findOne({ email: { $regex: email, $options: 'i' } });
  
      // If user not found, create and return a custom 404 error
      if (!user) {
        return next(createError(404, "User not found"));
      }
  
      // Payload for JWT token
      const payload = {
        email: user.email
      };
  
      // Expiry time for JWT token (in seconds)
      const expiryTime = 300;
  
      // Sign JWT token with payload and secret key
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });
  
      // Save token in the database
      const newToken = new UserToken({
        userId: user._id,
        token: token
      });

      try {
        // Attempt to save the token
        await newToken.save();

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'shrutishrivastav938@gmail.com',
            pass: 'zicl ejeq evob rugp'
          }
        });
  
       // Email options
       const resetButtonLink = `${process.env.LIVE_URL}/reset-password?token=${token}`;
       const mailOptions = {
           from: 'shrutishrivastav938@gmail.com',
           to: user.email,
           subject: 'Password Reset Instructions',
           html: `
           <html> 
           <head> 
               <title>Password Reset Request</title> 
           </head> 
           <body> 
               <h1>Password reset request</h1> 
               <p>Dear ${user.userName},</p> 
               <p>We have received a request to reset your password for your account. To complete the password reset process, please click on the button below:</p>
               <a href="${process.env.LIVE_URL}/reset-password/${token}" style="text-decoration: none;">
              <button style="background-color: #4CAF50; color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; padding: 14px 20px; border: none; border-radius: 4px; cursor: pointer;">
                Reset Password
              </button>
               </a>
               <p>Please note that this link is only valid for 5 minutes. If you did not request a password reset, please discard this message.</p>
               <p>Thank you</p> 
           </body>
       </html>
                `
       };

        // Send email
        await transporter.sendMail(mailOptions);
  
        // Send response
        res.status(200).json({ success: true, message: "Password reset instructions sent" });
      } catch (error) {
        // If an error occurs during sending email, handle it
        return next(error);
      }
    } catch (error) {
      // If an error occurs during finding user or saving token, handle it
      return next(error);
    }
  }; 

 const resetpassword =  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
  
      // Check if token and newPassword are provided
      if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and newPassword are required' });
      }
  
      // Verify the JWT token
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }
  
        const userId = decoded.userId;
  
        // Find user by ID
        const user = await User.findById(userId);
  
        // Check if user exists
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Encrypt the new password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newPassword, salt);
  
        // Update user's password
        user.password = encryptedPassword;
  
        try {
          // Save the updated user
          const updateUser = await User.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true });
  
          // Respond with success message
          return res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
          console.error('Error updating user:', error);
          return res.status(500).json({ message: 'Something went wrong' });
        }
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
const deleteByUserId =
  (verifyToken,
  async (req, res) => {
    try {
      const { userId } = req.query; // Extract userId from the query parameters

      // Validate userId existence and type using the validation function
      // Assuming validateUserId is a function you've implemented elsewhere
      validateUserId(userId);

      // Find the user in the database using the provided userId
      const userToDelete = await User.findOne({ _id: userId });

      // If user with the given ID is not found, return 404 Not Found
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove the user from the database
      await User.deleteOne({ _id: userId });

      // Return success response
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// DELETE endpoint for deleting the image of a user by user ID
const deleteImageById =
  (verifyToken,
  async (req, res) => {
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

  const getUserById = async (req, res) => {
    try {
      const { userId } = req.query;
  
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = {
  register,
  login,
  update,
  forgetPassword,
  getUserById,
  deleteByUserId,
  deleteImageById,   
  resetpassword,

  


};