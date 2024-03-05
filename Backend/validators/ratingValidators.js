const validateOverallRating = (rating) => {
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Overall rating is required and must be between 1 and 5.");
  }
};

const validateCleanliness = (cleanliness) => {
  if (!cleanliness || cleanliness < 1 || cleanliness > 5) {
    throw new Error(
      "Cleanliness rating is required and must be between 1 and 5."
    );
  }
};

const validateComfort = (comfort) => {
  if (!comfort || comfort < 1 || comfort > 5) {
    throw new Error("Comfort rating is required and must be between 1 and 5.");
  }
};

const validatePerformance = (performance) => {
  if (!performance || performance < 1 || performance > 5) {
    throw new Error(
      "Performance rating is required and must be between 1 and 5."
    );
  }
};

const validateFuelEfficiency = (fuelEfficiency) => {
  if (!fuelEfficiency || fuelEfficiency < 1 || fuelEfficiency > 5) {
    throw new Error(
      "Fuel efficiency rating is required and must be between 1 and 5."
    );
  }
};

module.exports = {
  validateOverallRating,
  validateCleanliness,
  validateComfort,
  validatePerformance,
  validateFuelEfficiency,
};
