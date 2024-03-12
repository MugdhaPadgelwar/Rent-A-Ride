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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         locationId:
 *           type: string
 *           description: ID of the user's location.
 *         userName:
 *           type: string
 *           description: Username of the user.
 *           minLength: 4
 *           maxLength: 20
 *         email:
 *           type: string
 *           description: Email address of the user.
 *           format: email
 *         password:
 *           type: string
 *           description: Password for the user account.
 *           minLength: 8
 *           maxLength: 200
 *         address:
 *           type: object
 *           description: User's address information.
 *         mobileNumber:
 *           type: string
 *           description: User's mobile number.
 *         age:
 *           type: integer
 *           description: User's age.
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: User's gender.
 *         userImage:
 *           type: string
 *           description: URL of the user's profile image.
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Role of the user. Can be "user" or "admin".
 *           required: true
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user in the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 $ref: '#/components/schemas/User/properties/userName'
 *               email:
 *                 $ref: '#/components/schemas/User/properties/email'
 *               password:
 *                 $ref: '#/components/schemas/User/properties/password'
 *               role:
 *                 $ref: '#/components/schemas/User/properties/role'
 *     responses:
 *       '201':
 *         description: Successfully registered user
 *         content:
 *           application/json:
 *             example:
 *               userName: "JohnDoe"
 *               email: "johndoe@example.com"
 *               password: "hashedPassword"
 *               role: "user"
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               error: "Validation Error: Invalid username format"
 *       '409':
 *         description: Conflict. Email is already in use.
 *         content:
 *           application/json:
 *             example:
 *               error: "Email is already in use."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */


router.post("/register", userController.register); 




/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login with email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 description: Password for the user account.
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful."
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # JWT token
 *               expiresIn: 3600 # Token expires in 1 hour
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid email or password."
 *       '401':
 *         description: Unauthorized. Invalid email or password.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid email or password."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.post("/login", userController.login); 





router.post("/forget-password", userController.forgetPassword);
router.get("/user_id", userController.getUserById);

router.use(verifyToken);

router.put("/update", userController.update);
router.delete("/delete_id", userController.deleteByUserId);
router.delete("/delete_image", userController.deleteImageById);

module.exports = router;
