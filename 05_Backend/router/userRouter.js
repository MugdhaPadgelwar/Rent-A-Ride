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
 * /users/register:
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
 * /users/login:
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



/**
 * @swagger
 * /users/forget-password:
 *   post:
 *     summary: Send password reset instructions to the user's email
 *     description: |
 *       Sends password reset instructions to the user's email address. This endpoint requires the user's email.
 *     tags:
 *       - Authentication
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
 *                 description: The email address of the user requesting a password reset.
 *     responses:
 *       '200':
 *         description: Password reset instructions sent successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password reset instructions sent
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.post("/forget-password", userController.forgetPassword);  




/**
 * @swagger
 * /users/user_id:
 *   get:
 *     summary: Get user details by user ID
 *     description: |
 *       Retrieves user details from the database based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve details for.
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.get("/user_id", userController.getUserById);



/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user information
 *     description: |
 *       Updates user information in the database based on the provided user ID and fields to update.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties to update here
 *     responses:
 *       '200':
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User information updated successfully
 *               user:
 *                 // User object with updated information
 *       '400':
 *         description: Bad request. Missing userId in query parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: userId is required in the query parameters
 *       '403':
 *         description: Forbidden. Unauthorized to update this user's information.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized - You do not have permission to update this user
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
 
router.put("/update", userController.update); 


/**
 * @swagger
 * /users/delete_id:
 *   delete:
 *     summary: Delete user by ID
 *     description: Deletes a user from the database based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.delete("/delete_id", userController.deleteByUserId); 


/**
 * @swagger
 * /users/delete_image:
 *   delete:
 *     summary: Delete user image by ID
 *     description: Deletes the image associated with a user based on the provided user ID.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user whose image is to be deleted.
 *     responses:
 *       '200':
 *         description: User image deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User image deleted successfully
 *       '400':
 *         description: Bad request. Missing user ID in request body.
 *         content:
 *           application/json:
 *             example:
 *               error: User ID is required in the request body.
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

router.delete("/delete_image", userController.deleteImageById);  
router.put("/reset-password",userController.resetpassword);



module.exports = router;
