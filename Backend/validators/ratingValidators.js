// validation function for overall rating
const validateOverallRating = (rating) => {
  // Check if rating is missing or outside the valid range
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Overall rating is required and must be between 1 and 5.");
  }
};

// validation function for cleanliness rating
const validateCleanliness = (cleanliness) => {
  // Check if cleanliness rating is missing or outside the valid range
  if (!cleanliness || cleanliness < 1 || cleanliness > 5) {
    throw new Error(
      "Cleanliness rating is required and must be between 1 and 5."
    );
  }
};

// validation function for comfort rating
const validateComfort = (comfort) => {
  // Check if comfort rating is missing or outside the valid range
  if (!comfort || comfort < 1 || comfort > 5) {
    throw new Error("Comfort rating is required and must be between 1 and 5.");
  }
};

// validation function for performance rating
const validatePerformance = (performance) => {
  // Check if performance rating is missing or outside the valid range
  if (!performance || performance < 1 || performance > 5) {
    throw new Error(
      "Performance rating is required and must be between 1 and 5."
    );
  }
};

// validation function for fuel efficiency rating
const validateFuelEfficiency = (fuelEfficiency) => {
  // Check if fuel efficiency rating is missing or outside the valid range
  if (!fuelEfficiency || fuelEfficiency < 1 || fuelEfficiency > 5) {
    throw new Error(
      "Fuel efficiency rating is required and must be between 1 and 5."
    );
  }
};

// Export the validation functions
module.exports = {
  validateOverallRating,
  validateCleanliness,
  validateComfort,
  validatePerformance,
  validateFuelEfficiency,
};
