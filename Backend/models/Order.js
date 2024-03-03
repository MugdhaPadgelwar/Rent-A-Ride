var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    transaction_Id: {
      type: String,
      trim: true,
    },
    paymentDateAndTime: {
      type: Date,
    },
    modeofPayment: {
      type: String,
    },
    total_Amount: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { _id: false }
);

// Create the order schema
const orderSchema = new Schema({
  order_Id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  car_Id: {
    type: String,
    trim: true,
    // Add a reference to the Car model for the foreign key relationship
    ref: "Car",
  },
  user_Id: {
    type: String,
    trim: true,
    // Add a reference to the User model for the foreign key relationship
    ref: "User",
  },
  location_Id: {
    type: String,
    trim: true,
    // Add a reference to the Location model for the foreign key relationship
    ref: "Location",
  },
  total_Price: {
    type: Number,
  },
  payment: {
    type: paymentSchema,
  },
  bookingDateAndTime: {
    type: Date,
  },
  cancellationReason: {
    type: String,
  },
  cancellationDateAndTime: {
    type: Date,
  },
});

// Add plugin to set order_id as primary key
orderSchema.plugin(require("mongoose-autopopulate"));

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
