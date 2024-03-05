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

    // Attach the decoded payload to the request object
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

  // If the token exists
  if (token) {
    try {
      // Verify the token (assuming token is passed without "Bearer" prefix)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // If verification is successful, attach the user information to the request object
      req.user = decoded;
      // Proceed to the route handler
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    // If no token is provided, return unauthorized
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { isAdmin, authenticateUser };
