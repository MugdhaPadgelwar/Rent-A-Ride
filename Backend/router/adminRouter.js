// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware
const { verifyToken, isAdmin } = require("../middleware/auth");

const adminController = require("../controller/adminController");

router.use(verifyToken, isAdmin);
router.get("/users/list", isAdmin, adminController.getAllUsers);

module.exports = router;
