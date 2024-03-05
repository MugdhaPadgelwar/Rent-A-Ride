// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware
const { isAdmin } = require("../middleware/auth");

const adminController = require("../controller/adminController");

router.get("/users/list", isAdmin, adminController.getAllUsers);
// router.put("/forget-password", userController.forgetPassword);
// router.get("/user/id", userController.getUserById);
// router.delete("/delete/id", userController.deleteByUserId);
// router.get("/delete/image", userController.deleteImageById);

module.exports = router;
