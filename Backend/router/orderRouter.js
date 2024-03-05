// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const orderController = require("../controller/orderController");

router.post("/placed", orderController.placedOrder);
router.post("/orderById", orderController.orderById);
router.get("/allorders", orderController.allorders);

module.exports = router;
