// Import middleware
const { verifyToken,isAdmin } = require("../middleware/auth");

//Import Model
const Location = require("../models/Location");

// post the location details if provided

const postLocation =
  (verifyToken,
  async (req, res) => {
    try {
      // Extract the location details from the request body
      const { city, state, area, dateTime } = req.body;

      // Extract pickup and drop times from the dateTime object
      const { pickupDateAndTime, dropDateAndTime } = dateTime;

      // Create a new location object
      const newLocation = new Location({
        city,
        state,
        area,
        dateTime: {
          pickupDateAndTime,
          dropDateAndTime,
        },
      });

      // Save the new location to the database
      const savedLocation = await newLocation.save();

      // Return the newly created location
      res.status(201).json(savedLocation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

const updateLocation =
  (verifyToken,
  async (req, res) => {
    try {
      // Extract the location ID from the request body
      const { locationId, city, state, area, dateTime } = req.body;

      // If locationId is not provided, return a 400 Bad Request response
      if (!locationId) {
        return res
          .status(400)
          .json({ message: "Location ID is required in the request body" });
      }

      // Find the location in the database by its ID
      let location = await Location.findById(locationId);

      // If the location doesn't exist, return a 404 Not Found response
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }

      // Extract pickup and drop times from the dateTime object
      const { pickupDateAndTime, dropDateAndTime } = dateTime;

      // Update the location object with the new details
      location.city = city || location.city;
      location.state = state || location.state;
      location.area = area || location.area;
      location.dateTime.pickupDateAndTime =
        pickupDateAndTime || location.dateTime.pickupDateAndTime;
      location.dateTime.dropDateAndTime =
        dropDateAndTime || location.dateTime.dropDateAndTime;

      // Save the updated location to the database
      const updatedLocation = await location.save();

      // Return the updated location
      res.status(200).json(updatedLocation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  const getAllLocation =(isAdmin,async (req, res) => {
    try {
      // Query the database to retrieve all cities
      const location = await Location.find();
  
      // Send the retrieved cities as a response
      res.json(location);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


module.exports = {
  postLocation,
  updateLocation,
  getAllLocation,
  
};
