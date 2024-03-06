// Validation function for user ID
const validateUserId = (userId) => {
  if (!userId) {
    throw new Error("User ID is required.");
  }
  // Add additional validation rules for user ID if needed
};

// Validation function for user ID
const validateCarId = (carId) => {
  if (!carId) {
    throw new Error("Car ID is required.");
  }
  // Add additional validation rules for user ID if needed
};
// Validation function for location ID
const validateLocationId = (locationId) => {
  if (!locationId) {
    throw new Error("Location ID is required.");
  }
  // Add additional validation rules for location ID if needed
};

// Validation function for car model
const validateCarModel = (carModel) => {
  if (!carModel) {
    throw new Error("Car model is required.");
  }
  // Add additional validation rules for car model if needed
};

// Validation function for car brand
const validateCarBrand = (carBrand) => {
  if (!carBrand) {
    throw new Error("Car brand is required.");
  }
  // Add additional validation rules for car brand if needed
};

// Validation function for car year
const validateCarYear = (carYear) => {
  if (!carYear) {
    throw new Error("Car year is required.");
  }
  // Add additional validation rules for car year if needed
};

// Validation function for car image
const validateCarImage = (carImage) => {
  if (!carImage) {
    throw new Error("Car image is required.");
  }
  // Add additional validation rules for car image if needed
};

// Validation function for car number plate
const validateCarNoPlate = (carNoPlate) => {
  if (!carNoPlate) {
    throw new Error("Car number plate is required.");
  }
  const carNoPlateRegex = /^[A-Z]{2}\s\d{2}\s[A-Z]{1,2}\s\d{4}$/i;
  if (!carNoPlateRegex.test(carNoPlate)) {
    throw new Error("Invalid car number plate format.");
  }
};

// Validation function for car capacity
const validateCarCapacity = (carCapacity) => {
  if (!carCapacity) {
    throw new Error("Car capacity is required.");
  }
  if (![4, 5, 7].includes(carCapacity)) {
    throw new Error("Car capacity must be either 4, 5, or 7.");
  }
};

// Validation function for car type
const validateCarType = (carType) => {
  if (!carType) {
    throw new Error("Car type is required.");
  }
  if (!["automatic", "manual"].includes(carType)) {
    throw new Error("Car type must be either 'automatic' or 'manual'.");
  }
};

// Validation function for car fuel type
const validateCarFuelType = (carFuelType) => {
  if (!carFuelType) {
    throw new Error("Car fuel type is required.");
  }
  if (!["diesel", "petrol", "electric"].includes(carFuelType)) {
    throw new Error("Invalid car fuel type.");
  }
};

// Validation function for car mileage
const validateCarMileage = (carMileage) => {
  if (!carMileage) {
    throw new Error("Car mileage is required.");
  }
};

// Validation function for car price per hour
const validateCarPricePerHour = (carPricePerHour) => {
  if (!carPricePerHour) {
    throw new Error("Car price per hour is required.");
  }
};

// Validation function for car insurance number
const validateCarInsuranceNumber = (carInsuranceNumber) => {
  if (!carInsuranceNumber) {
    throw new Error("Car insurance number is required.");
  }
  if (carInsuranceNumber.length < 5 || carInsuranceNumber.length > 20) {
    throw new Error(
      "Car insurance number must be between 5 and 20 characters long."
    );
  }
};

// Validation function for car availability
const validateAvailability = (availability) => {
  if (availability === undefined) {
    throw new Error("Car availability is required.");
  }
};

module.exports = {
  validateUserId,
  validateLocationId,
  validateCarModel,
  validateCarBrand,
  validateCarYear,
  validateCarImage,
  validateCarNoPlate,
  validateCarCapacity,
  validateCarType,
  validateCarFuelType,
  validateCarMileage,
  validateCarPricePerHour,
  validateCarInsuranceNumber,
  validateAvailability, 
  validateCarId,
};
