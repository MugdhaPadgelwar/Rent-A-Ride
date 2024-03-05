// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const locationController = require("../controller/locationController");

router.post("/addLocation", locationController.postadd);
router.get("/allLocation", locationController.getAlllocation);
router.put("/updateLocation", locationController.updatelocation);

module.exports = router;
