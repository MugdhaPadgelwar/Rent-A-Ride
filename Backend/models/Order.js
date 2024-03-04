var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

  const { v4: uuidv4 } = require('uuid');

  const paymentSchema = new mongoose.Schema(
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
  
  const orderSchema = new mongoose.Schema({
    order_Id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: uuidv4,
    },
    car_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    },
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    location_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
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
