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
router.get("/user/id", userController.getUserById);
router.delete("/delete/id", userController.deleteByUserId);
router.get("/delete/image", userController.deleteImageById);

module.exports = router;
