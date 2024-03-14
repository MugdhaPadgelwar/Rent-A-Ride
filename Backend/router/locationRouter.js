// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const locationController = require("../controller/locationController");
const { verifyToken,isAdmin } = require("../middleware/auth");

router.use(verifyToken);

//location tag
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations related to locations
 */

// location schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         _id:
 *          type: string
 *          description: Object id 
 *          required: false
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

 *     ErrorResponseLocation:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message
 *           example: Internal Server Error
 *
 *     SuccessResponseLocation:
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


//postlocation 
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
 *               $ref: '#/components/schemas/SuccessResponseLocation'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseLocation'
 *     security:
 *       - BearerAuth: []
 */
router.post("/postLocation",verifyToken, locationController.postLocation);
//updatelocation
/**
 * @swagger
 * /locations/updateLocation:
 *   put:
 *     summary: Update a location
 *     tags: [Locations]
 *     description: Update an existing location with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: The updated location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseLocation'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseLocation'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseLocation'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseLocation'
 *     security:
 *       - BearerAuth: []
 */
router.put("/updateLocation",verifyToken, locationController.updateLocation);
router.get('/location',locationController.getLocationByName)
router.use(isAdmin);
router.get("/getAllLocations",isAdmin,locationController.getAllLocation)

module.exports = router;
