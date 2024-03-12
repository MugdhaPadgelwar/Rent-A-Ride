// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const locationController = require("../controller/locationController");
const { verifyToken } = require("../middleware/auth");

router.use(verifyToken);


/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations related to locations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           description: The city of the location
 *         state:
 *           type: string
 *           description: The state of the location
 *         area:
 *           type: object
 *           properties:
 *             pickup:
 *               type: string
 *               description: The pickup area
 *             drop:
 *               type: string
 *               description: The drop area
 *         dateTime:
 *           type: object
 *           properties:
 *             pickupDateAndTime:
 *               type: string
 *               format: date-time
 *               description: The pickup date and time
 *             dropDateAndTime:
 *               type: string
 *               format: date-time
 *               description: The drop date and time
 *       required:
 *         - city
 *         - state
 *         - area
 *         - dateTime

 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message
 *           example: Internal Server Error
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           description: The city of the location
 *         state:
 *           type: string
 *           description: The state of the location
 *         area:
 *           type: object
 *           properties:
 *             pickup:
 *               type: string
 *               description: The pickup area
 *             drop:
 *               type: string
 *               description: The drop area
 *         dateTime:
 *           type: object
 *           properties:
 *             pickupDateAndTime:
 *               type: string
 *               format: date-time
 *               description: The pickup date and time
 *             dropDateAndTime:
 *               type: string
 *               format: date-time
 *               description: The drop date and time
 *         _id:
 *           type: string
 *           description: The ID of the location
 *         __v:
 *           type: integer
 *           description: The version of the location
 *           example: 0
 */

/**
 * @swagger
 * /locations/postLocation:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     description: Create a new location with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: The newly created location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     security:
 *       - BearerAuth: []
 */

router.post("/postLocation", locationController.postLocation);
router.put("/updateLocation", locationController.updateLocation);

module.exports = router;
