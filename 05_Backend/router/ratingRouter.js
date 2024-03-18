// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const ratingController = require("../controller/ratingController");

const { verifyToken } = require("../middleware/auth");



/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         carId:
 *           type: string
 *           description: ID of the rated car.
 *           required: true
 *         overallRating:
 *           type: number
 *           description: Overall rating of the car.
 *           minimum: 1
 *           maximum: 5
 *           required: true
 *         cleanliness:
 *           type: number
 *           description: Rating for cleanliness of the car.
 *           minimum: 1
 *           maximum: 5
 *           required: true
 *         comfort:
 *           type: number
 *           description: Rating for comfort of the car.
 *           minimum: 1
 *           maximum: 5
 *           required: true
 *         performance:
 *           type: number
 *           description: Rating for performance of the car.
 *           minimum: 1
 *           maximum: 5
 *           required: true
 *         fuelEfficiency:
 *           type: number
 *           description: Rating for fuel efficiency of the car.
 *           minimum: 1
 *           maximum: 5
 *           required: true
 *         comment:
 *           type: string
 *           description: Additional comment about the car.
 */ 

/**
 * @swagger
 * /ratings/id:
 *   get:
 *     summary: Get rating by ID
 *     description: Retrieve a rating from the database based on the provided rating ID.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the rating to retrieve.
 *     responses:
 *       '200':
 *         description: Rating found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 carId:
 *                   type: string
 *                   description: The ID of the car associated with the rating.
 *                 overallRating:
 *                   type: number
 *                   description: The overall rating given for the car (1 to 5).
 *                 cleanliness:
 *                   type: number
 *                   description: The cleanliness rating given for the car (1 to 5).
 *                 comfort:
 *                   type: number
 *                   description: The comfort rating given for the car (1 to 5).
 *                 performance:
 *                   type: number
 *                   description: The performance rating given for the car (1 to 5).
 *                 fuelEfficiency:
 *                   type: number
 *                   description: The fuel efficiency rating given for the car (1 to 5).
 *                 comment:
 *                   type: string
 *                   description: Additional comment provided with the rating.
 *       '404':
 *         description: Rating not found
 *         content:
 *           application/json:
 *             example:
 *               error: Rating not found.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.get("/id", ratingController.getRatingById);

router.use(verifyToken)

/**
 * @swagger
 * /ratings/add:
 *   post:
 *     summary: Add a new rating
 *     description: Add a new rating for a car.
 *     tags:
 *       - Ratings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       '201':
 *         description: Successfully added rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *             example:
 *               carId: "61517bb79a2f8d83c8088d6d"
 *               overallRating: 4
 *               cleanliness: 5
 *               comfort: 4
 *               performance: 5
 *               fuelEfficiency: 3
 *               comment: "Great car!"
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               error: "Validation Error: Invalid overall rating"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.post("/add", ratingController.addRating);


/**
 * @swagger
 * /ratings/update:
 *   put:
 *     summary: Update a rating by ID
 *     description: Update an existing rating in the system.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the rating to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               overallRating:
 *                 type: number
 *                 description: The new overall rating.
 *               cleanliness:
 *                 type: number
 *                 description: The new cleanliness rating.
 *               comfort:
 *                 type: number
 *                 description: The new comfort rating.
 *               performance:
 *                 type: number
 *                 description: The new performance rating.
 *               fuelEfficiency:
 *                 type: number
 *                 description: The new fuel efficiency rating.
 *               comment:
 *                 type: string
 *                 description: The new comment.
 *     responses:
 *       '200':
 *         description: Rating updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       '404':
 *         description: Rating not found
 *         content:
 *           application/json:
 *             example:
 *               error: Rating not found.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.put("/update", ratingController.updateById);


/**
 * @swagger
 * /ratings/delete:
 *   delete:
 *     summary: Delete a rating by ID
 *     description: Delete an existing rating by its ID.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the rating to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted rating
 *         content:
 *           application/json:
 *             example:
 *               message: "Rating deleted successfully."
 *       '404':
 *         description: Rating not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Rating not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.delete("/delete", ratingController.deleteById);
module.exports = router;
