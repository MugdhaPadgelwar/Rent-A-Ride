// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const locationController = require("../controller/locationController");
const { verifyToken } = require("../middleware/auth");

//protected routes
router.use(verifyToken);
router.post("/postLocation", locationController.postLocation);
router.put("/updateLocation", locationController.updateLocation);

module.exports = router;
