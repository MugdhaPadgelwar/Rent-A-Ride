// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware
const { authenticateUser, isAdmin } = require("../middleware/auth");

const userController = require("../controller/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/update", userController.update);
router.put("/forget-password", userController.forgetPassword);
router.get("/user_id", userController.getUserById);
router.delete("/delete_id", userController.deleteByUserId);
router.delete("/delete_image", userController.deleteImageById);

module.exports = router;
