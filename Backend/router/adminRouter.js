// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware
const { verifyToken, isAdmin } = require("../middleware/auth");

const adminController = require("../controller/adminController");

router.use(verifyToken, isAdmin);




/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Operations related to users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponseUserList:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message
 *           example: Internal Server Error
 *
 *     SuccessResponseUserList:
 *       type: array
 *       items:
 *         $ref: '#/userRouter/components/schemas/User'
 */


/**
 * @swagger
 * /admin/users/list:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Admin]
 *     description: Fetch all users from the database.
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseUserList'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseUserList'
 *     security:
 *       - BearerAuth: []
 */
router.get("/users/list", isAdmin, adminController.getAllUsers);


module.exports = router;
