// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const orderController = require("../controller/orderController");

router.post("/placed", orderController.placedOrder);
router.get("/orderById", orderController.orderById);
router.delete("/cancel", orderController.cancleOrder);
router.get("/allorders", orderController.allorders);

module.exports = router;
