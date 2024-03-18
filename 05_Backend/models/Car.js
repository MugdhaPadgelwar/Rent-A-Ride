var mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Location",
  },
  carModel: {
    type: String,
    trim: true,
    required: true,
  },
  carBrand: {
    type: String,
    trim: true,
    required: true,
  },
  carYear: {
    type: Number,
    required: true,
  },
  carImage: {
    type: String,
    required: true,
  },
  carNoPlate: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation using regular expression for car number plate
        return /^[A-Z]{2}\s\d{2}\s[A-Z]{1,2}\s\d{4}$/i.test(value);
      },
      message: "Invalid car number plate format",
    },
  },
  carCapacity: {
    type: Number,
    enum: [4, 5, 7],
    required: true,
  },
  carType: {
    type: String,
    required: true,
    enum: ["automatic", "manual"],
  },
  carFuelType: {
    type: String,
    required: true,
    enum: ["diesel", "petrol", "electric"],
  },
  carMileage: {
    type: Number,
    required: true,
  },
  carPricePerHour: {
    type: Number,
    required: true,
  },
  carInsuranceNumber: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  availability: {
    type: Boolean,
    required: true,
  },
});
carSchema.plugin(require("mongoose-autopopulate"));
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
