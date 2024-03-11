// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware

const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forget-password", userController.forgetPassword);
router.get("/user_id", userController.getUserById);

router.use(verifyToken);
router.put("/update", userController.update);
router.delete("/delete_id", userController.deleteByUserId);
router.delete("/delete_image", userController.deleteImageById);

module.exports = router;
