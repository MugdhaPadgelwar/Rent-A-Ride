const express = require("express");
const router = express.Router();

//internal imports
const { isAdmin, verifyToken } = require("../middleware/auth");

// Load environment variables
require("dotenv").config();

const citiesController = require("../controller/citiesController");

//protected routes
router.use(verifyToken,isAdmin)
router.post("/add", citiesController.addCities);
router.delete("/delete", citiesController.deleteCityById);
router.get("/getAll", citiesController.getAllCities);

module.exports = router;
