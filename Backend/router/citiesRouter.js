const express = require("express");
const router = express.Router();

//internal imports
const { isAdmin, verifyToken } = require("../middleware/auth");

// Load environment variables
require("dotenv").config();

const citiesController = require("../controller/citiesController");

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: Operations related to cities
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           description: The name of the city
 *         state:
 *           type: string
 *           description: The state of the city
 *       required:
 *         - city
 *         - state
 *
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
 *           description: The name of the city
 *         state:
 *           type: string
 *           description: The state of the city
 *         _id:
 *           type: string
 *           description: The ID of the city
 *         __v:
 *           type: integer
 *           description: The version of the city
 *           example: 0
 */

router.get('/location',citiesController.getCityByName)
// router.use(verifyToken, isAdmin);

/**
 * @swagger
 * /cities/add:
 *   post:
 *     summary: Add a new city
 *     tags: [Cities]
 *     description: Add a new city with the provided details. This is an admin-protected route.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       201:
 *         description: The newly added city
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
 */
router.post("/add",isAdmin, citiesController.addCities);

/**
 * @swagger
 * /cities/delete:
 *   delete:
 *     summary: Delete a city by ID
 *     tags: [Cities]
 *     description: Delete a city by providing the city ID. This is an admin-protected route.
 *     parameters:
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: string
 *         description: The ID of the city to delete.
 *         required: true
 *     responses:
 *       204:
 *         description: City successfully deleted
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/delete",isAdmin, citiesController.deleteCityById);

/**
 * @swagger
 * /cities/getAll:
 *   get:
 *     summary: Get all cities
 *     tags: [Cities]
 *     description: Get a list of all cities.
 *     responses:
 *       200:
 *         description: List of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 */
router.get("/getAll",isAdmin, citiesController.getAllCities);

module.exports = router;
