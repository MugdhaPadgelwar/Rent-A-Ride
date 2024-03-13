// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const orderController = require("../controller/orderController");

const { verifyToken,isAdmin } = require("../middleware/auth"); 

router.use(verifyToken,isAdmin);


/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         carId:
 *           type: string
 *           description: The ID of the car associated with the order.
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order.
 *         locationId:
 *           type: string
 *           description: The ID of the location where the car is booked.
 *         totalPrice:
 *           type: number
 *           description: The total price of the order.
 *         payment:
 *           type: object
 *           description: The payment information for the order.
 *           properties:
 *             // Define payment schema properties here
 *         bookingDateAndTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the booking was made.
 *         cancellationReason:
 *           type: string
 *           description: The reason for cancellation, if the order is canceled.
 *         cancellationDateAndTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was canceled, if applicable.
 */

/**
 * @swagger
 * /orders/allorders:
 *   get:
 *     summary: Get all orders
 *     description: Fetch all orders from the database.
 *     tags:
 *       - Orders
 *     responses:
 *       '200':
 *         description: Successfully retrieved orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.get("/allorders",isAdmin, orderController.allorders);



/**
 * @swagger
 * /orders/placed:
 *   post:
 *     summary: Place a new order
 *     description: Place a new order in the system.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *               carId:
 *                 type: string
 *                 description: The ID of the car being ordered.
 *               locationId:
 *                 type: string
 *                 description: The ID of the location where the car will be picked up.
 *               totalPrice:
 *                 type: number
 *                 description: The total price of the order.
 *               payment:
 *                 type: object
 *                 description: The payment information for the order.
 *                 properties:
 *                   // Define payment schema properties here
 *               bookingDateAndTime:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the booking is made.
 *     responses:
 *       '201':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the order creation.
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Bad request. One or more parameters are missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message indicating the error that occurred.
 */

router.post("/placed", orderController.placedOrder); 


/**
 * @swagger
 * /orders/orderById:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve an order from the database by its ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               message: Order not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.get("/orderById", orderController.orderById); 




/**
 * @swagger
 * /orders/cancel:
 *   delete:
 *     summary: Cancel an order
 *     description: Cancel an existing order in the system.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to cancel.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancellationReason:
 *                 type: string
 *                 description: The reason for canceling the order.
 *               cancellationDateAndTime:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the cancellation occurred.
 *     responses:
 *       '200':
 *         description: Order canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the order cancellation.
 *       '400':
 *         description: Bad request. Order ID is missing or cancellation reason is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message indicating the error that occurred.
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               error: Order not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.delete("/cancel", orderController.cancleOrder);


router.use(verifyToken);
module.exports = router;
