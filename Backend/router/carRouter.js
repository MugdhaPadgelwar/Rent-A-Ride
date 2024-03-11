// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware
const { verifyToken } = require("../middleware/auth");

const carController = require("../controller/carController");

router.get("/all", carController.getAllCars);
router.get("/modelName", carController.getByModelName);
router.get("/getCarByLocationId", carController.getCarByLocationId);

router.use(verifyToken);
router.post("/add", carController.add);
router.put("/updateCars", carController.updateCars);
router.delete("/deleteCars", carController.deleteCars);

module.exports = router;
