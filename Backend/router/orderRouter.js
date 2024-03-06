// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const orderController = require("../controller/orderController");

const { verifyToken } = require("../middleware/auth");

router.get("/allorders", orderController.allorders);

//protected routes
router.use(verifyToken);
router.post("/placed", orderController.placedOrder);
router.get("/orderById", orderController.orderById);
router.delete("/cancel", orderController.cancleOrder);

module.exports = router;
