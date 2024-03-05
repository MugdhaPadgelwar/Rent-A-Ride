// Validation function for city
const validateCity = (city) => {
  if (!city || city.trim() === "") {
    throw new Error("City is required and must not be an empty string.");
  }
};

// Validation function for state
const validateState = (state) => {
  if (!state || state.trim() === "") {
    throw new Error("State is required and must not be an empty string.");
  }
};

// Validation function for location area
const validateLocationArea = (area) => {
  if (!area || area.trim() === "") {
    throw new Error(
      "Location area is required and must not be an empty string."
    );
  }
};

// Validation function for date and time
const validateDateTime = (dateTime) => {
  if (!dateTime) {
    throw new Error("Date and time are required.");
  }
};

module.exports = {
  validateCity,
  validateState,
  validateDateTime,
  validateLocationArea,
};
