const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const citiesController = require("../controller/citiesController");

const { verifyToken } = require("../middleware/auth");

router.post("/add", citiesController.addCities);
router.delete("/delete", citiesController.deleteCityById);
router.get("/getAll", citiesController.getAllCities);

module.exports = router;
