var mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
});

citiesSchema.plugin(require("mongoose-autopopulate"));

// Create the city model
const Cities = mongoose.model("Cities", citiesSchema);

// Export the Location model
module.exports = Cities;
