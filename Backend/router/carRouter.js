// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware
const { verifyToken } = require("../middleware/auth");

const carController = require("../controller/carController");

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Operations related to cars
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         locationId:
 *           type: string
 *           description: The ID of the location
 *         carModel:
 *           type: string
 *           description: The model of the car
 *         carBrand:
 *           type: string
 *           description: The brand of the car
 *         carYear:
 *           type: number
 *           description: The manufacturing year of the car
 *         carImage:
 *           type: string
 *           description: The image URL of the car
 *         carNoPlate:
 *           type: string
 *           description: The number plate of the car
 *         carCapacity:
 *           type: number
 *           description: The seating capacity of the car
 *         carType:
 *           type: string
 *           description: The type of the car (automatic/manual)
 *         carFuelType:
 *           type: string
 *           description: The fuel type of the car
 *         carMileage:
 *           type: number
 *           description: The mileage of the car
 *         carPricePerHour:
 *           type: number
 *           description: The rental price per hour of the car
 *         carInsuranceNumber:
 *           type: string
 *           description: The insurance number of the car
 *         availability:
 *           type: boolean
 *           description: The availability status of the car
 *       required:
 *         - userId
 *         - locationId
 *         - carModel
 *         - carBrand
 *         - carYear
 *         - carImage
 *         - carNoPlate
 *         - carCapacity
 *         - carType
 *         - carFuelType
 *         - carMileage
 *         - carPricePerHour
 *         - carInsuranceNumber
 *         - availability
 */

/**
 * @swagger
 * /cars/all:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get("/all", carController.getAllCars);

/**
 * @swagger
 * /cars/modelName:
 *   get:
 *     summary: Get cars by model name
 *     tags: [Cars]
 *     description: Get cars based on the model name.
 *     parameters:
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: The model name to filter cars by.
 *     responses:
 *       200:
 *         description: List of cars matching the model name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/modelName", carController.getByModelName);

/**
 * @swagger
 * /cars/getCarByLocationId:
 *   get:
 *     summary: Get cars by location ID
 *     tags: [Cars]
 *     description: Get cars based on the location ID.
 *     parameters:
 *       - in: query
 *         name: locationId
 *         schema:
 *           type: string
 *         description: The ID of the location to filter cars by.
 *         required: true
 *     responses:
 *       200:
 *         description: List of cars matching the location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/getCarByLocationId", carController.getCarByLocationId);

router.use(verifyToken);

/**
 * @swagger
 * /cars/add:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     description: Add a new car with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The newly added car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/add", carController.add);

/**
 * @swagger
 * /cars/updateCars:
 *   put:
 *     summary: Update car details
 *     tags: [Cars]
 *     description: Update the details of a car by providing the car ID in the query parameter and the updated data in the request body.
 *     parameters:
 *       - in: query
 *         name: carId
 *         schema:
 *           type: string
 *         description: The ID of the car to update.
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carPricePerHour:
 *                 type: number
 *                 description: The updated price per hour for the car.
 *             required:
 *               - carPricePerHour
 *     responses:
 *       200:
 *         description: The updated details of the car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/updateCars", carController.updateCars);

/**
 * @swagger
 * /cars/deleteCars:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     description: Delete a car by providing the car ID in the request body. This is a protected route requiring authorization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *                 description: The ID of the car to delete.
 *             required:
 *               - carId
 *     responses:
 *       204:
 *         description: Car successfully deleted
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/deleteCars", carController.deleteCars);  




module.exports = router;
