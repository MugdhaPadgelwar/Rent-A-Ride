const validateUserName = (userName) => {
  if (!userName) {
    throw new Error("Username is required.");
  }
  if (userName.length < 4 || userName.length > 20) {
    throw new Error("Username must be between 4 and 20 characters.");
  }
};

const validateEmail = (email) => {
  if (!email) {
    throw new Error("Email is required.");
  }
  if (email.length > 100) {
    throw new Error("Email must be at most 100 characters long.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }
};

// Validation function for password
const validatePassword = (password) => {
  if (!password) {
    throw new Error("Password is required.");
  }
  if (password.length < 8 || password.length > 50) {
    throw new Error("Password must be between 8 and 50 characters long.");
  }
};

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
// Validation function for role
const validateRole = (role) => {
  if (!role) {
    throw new Error("Role is required.");
  }
  if (!["user", "admin"].includes(role)) {
    throw new Error("Invalid role.");
  }
};

const validateUserId = (userId) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("userId must be a non-empty string");
  }
};

const validateUser = (userData) => {
  validateUserName(userData.userName);
  validateEmail(userData.email);
  validatePassword(userData.password);
  validateRole(userData.role);
};

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
  validateUserId, 
  createError,
};
