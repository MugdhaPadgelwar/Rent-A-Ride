// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const userController = require("../controller/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/update", userController.update);
router.put("/forget-password", userController.forgetPassword);
router.get("/getUserById", userController.getUserById);
router.delete("/deleteByUserId", userController.deleteByUserId);
router.get("/deleteImageById ", userController.deleteImageById);

module.exports = router;
