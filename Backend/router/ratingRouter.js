// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const ratingController = require("../controller/ratingController");

router.post("/add", ratingController.addRating);
router.get("/id", ratingController.getRatingById);
router.put("/update", ratingController.updateById);
router.delete("/delete", ratingController.deleteById);

module.exports = router;
