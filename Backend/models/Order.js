var mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      trim: true,
    },
    paymentDateAndTime: {
      type: Date,
      required: true,
    },
    modeOfPayment: {
      type: String,
      enum: ["credit_card", "debit_card", "net_banking", "upi", "wallet"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  payment: {
    type: paymentSchema,
    required: true,
  },
  bookingDateAndTime: {
    type: Date,
    required: true,
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
