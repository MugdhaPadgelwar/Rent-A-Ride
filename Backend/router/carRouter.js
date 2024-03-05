// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware
// const { authenticateUser, isAdmin } = require("../middleware/auth");

const carController = require("../controller/carController");
// router.use(authenticateUser);
router.post("/add", carController.add);
router.get("/all", carController.getAllCars);
router.get("/modelName", carController.getByModelName);
router.put("/updateCars", carController.updateCars);
router.delete("/deleteCars", carController.deleteCars);
router.get("/getCarByLocationId", carController.getCarByLocationId);

module.exports = router;
