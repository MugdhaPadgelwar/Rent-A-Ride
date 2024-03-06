const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const citiesController = require("../controller/citiesController");

router.post("/add", citiesController.addCities);

module.exports = router;