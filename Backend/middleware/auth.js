const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAdmin = (req, res, next) => {
  // Get the token from the request headers
  const { authorization: token } = req.headers;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token using the secret key from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: User is not an admin" });
    }

    // If user is admin, attach the decoded payload to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const authenticateUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, attach the user information to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { isAdmin, authenticateUser };
