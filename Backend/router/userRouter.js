// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import middleware

const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Allows for the registration of a new user with a username, email, password, and role. It checks if the email is already in use, hashes the password, and saves the new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's username.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address. Must be unique.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password. Will be hashed before storage.
 *               role:
 *                 type: string
 *                 description: The user's role within the system.
 *     responses:
 *       201:
 *         description: User registered successfully. Returns the created user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Invalid input, object invalid. Possible validation error.
 *       409:
 *         description: Email is already in use.
 *       500:
 *         description: Internal Server Error
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *         userName:
 *           type: string
 *           description: The user's username.
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *         password:
 *           type: string
 *           format: password
 *           description: The user's hashed password.
 *         role:
 *           type: string
 *           description: The user's role within the system.
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user by email and password, and returns a JWT token upon successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful. Returns JWT token and token expiration time.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated session.
 *                 expiresIn:
 *                   type: integer
 *                   description: Time in seconds until token expiration.
 *                   example: 3600
 *       400:
 *         description: Invalid input, object invalid. Possible validation error.
 *       401:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", userController.login);


router.post("/forget-password", userController.forgetPassword);
router.get("/user_id", userController.getUserById);

router.use(verifyToken);
/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user information
 *     description: Allows for updating user information. Requires a valid JWT token for authorization and userId in the query parameters.
 *     security:
 *       - bearerAuth: [] # References the security scheme defined above
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's new username.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's new email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's new password.
 *               role:
 *                 type: string
 *                 description: The user's new role within the system.
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: User information updated successfully. Returns the updated user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: userId is required in the query parameters.
 *       403:
 *         description: Unauthorized - You do not have permission to update this user.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized- No token provided or Unauthorized- Invalid token.
 *       500:
 *         description: Internal Server Error
 * components:
 *   securitySchemes:
 *     bearerAuth: # Name of the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *         userName:
 *           type: string
 *           description: The user's username.
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *         password:
 *           type: string
 *           format: password
 *           description: The user's hashed password.
 *         role:
 *           type: string
 *           description: The user's role within the system.
 *       additionalProperties: false
 */
router.put("/update", userController.update);
router.delete("/delete_id", userController.deleteByUserId);
router.delete("/delete_image", userController.deleteImageById);

module.exports = router;
