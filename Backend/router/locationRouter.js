// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const locationController = require("../controller/locationController");


router.post("/postLocation", locationController.postLocation); 
router.put("/updateLocation", locationController.updateLocation);

module.exports = router;
