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
 * /admin/users/list:
 *   get:
 *     summary: Get list of all the users
 *     description: Retrieve list of all users as admin
 *     tags:
 *      - Admin
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
