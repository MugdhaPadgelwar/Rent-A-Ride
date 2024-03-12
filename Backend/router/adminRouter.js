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
 * components:
 *   schemas: # It should be 'schemas' not 'schema'
 *     user: # This defines a schema named 'user'
 *       type: object
 *       properties: # It should be 'properties' not 'properities'
 *         userName:
 *           type: string
 *         email:
 *           type: string
 */




/**
 * @swagger
 * /admin/users/list:
 *   get:
 *     summary: Get list of all the users
 *     description: Retrieve list of all users as admin
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
router.get("/users/list", isAdmin, adminController.getAllUsers);


module.exports = router;
