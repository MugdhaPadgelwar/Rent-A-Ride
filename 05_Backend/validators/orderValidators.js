// validation function for user ID
const userIdValidation = (userId) => {
  if (typeof userId !== "string" || !userId.trim()) {
    throw new Error("userId must be a non-empty string");
  }
};

// validation function for car ID
const carIdValidation = (carId) => {
  if (typeof carId !== "string" || !carId.trim()) {
    throw new Error("carId must be a non-empty string");
  }
};

//// validation function for location ID
const locationIdValidation = (locationId) => {
  if (typeof locationId !== "string" || !locationId.trim()) {
    throw new Error("locationId must be a non-empty string");
  }
};

// validation function for total price
const totalPriceValidation = (totalPrice) => {
  if (typeof totalPrice !== "number" || isNaN(totalPrice) || totalPrice <= 0) {
    throw new Error("totalPrice must be a positive number");
  }
};

// validation function for payment
const paymentValidation = (payment) => {
  if (!payment || typeof payment !== "object") {
    throw new Error("payment must be an object");
  }

  const {
    transactionId,
    paymentDateAndTime,
    modeOfPayment,
    totalAmount,
    status,
  } = payment;

  // validation for transaction ID
  if (typeof transactionId !== "string" || !transactionId.trim()) {
    throw new Error("transactionId must be a non-empty string");
  }

  // validation for time and date
  const parsedDate = new Date(paymentDateAndTime);
  if (isNaN(parsedDate)) {
    throw new Error("paymentDateAndTime must be a valid Date object");
  }

  const validModes = [
    "credit_card",
    "debit_card",
    "net_banking",
    "upi",
    "wallet",
  ];

  // validation for mode of payment
  if (
    typeof modeOfPayment !== "string" ||
    !validModes.includes(modeOfPayment)
  ) {
    throw new Error(
      "modeOfPayment must be one of: credit_card, debit_card, net_banking, upi, wallet"
    );
  }

  // validation for total amount
  if (
    typeof totalAmount !== "number" ||
    isNaN(totalAmount) ||
    totalAmount <= 0
  ) {
    throw new Error("totalAmount must be a positive number");
  }

  // validation for status
  const validStatus = ["pending", "successful", "failed"];
  if (typeof status !== "string" || !validStatus.includes(status)) {
    throw new Error("status must be one of: pending, successful, failed");
  }
};

// validation function for booking date and time
const bookingDateAndTimeValidation = (bookingDateAndTime) => {
  const parsedDate = new Date(bookingDateAndTime);
  if (isNaN(parsedDate)) {
    throw new Error("bookingDateAndTime must be a valid Date object");
  }
};

// validation function for cancellation reason
const cancellationReasonValidation = (cancellationReason) => {
  if (typeof cancellationReason !== "string" && cancellationReason !== null) {
    throw new Error("cancellationReason must be a string or null");
  }
};

// validation function for cancellation date and time
const cancellationDateAndTimeValidation = (cancellationDateAndTime) => {
  if (cancellationDateAndTime !== null) {
    const parsedDate = new Date(cancellationDateAndTime);
    if (isNaN(parsedDate)) {
      throw new Error(
        "cancellationDateAndTime must be a valid Date object or null"
      );
    }
  }
};

module.exports = {
  userIdValidation,
  carIdValidation,
  locationIdValidation,
  totalPriceValidation,
  paymentValidation,
  bookingDateAndTimeValidation,
  cancellationReasonValidation,
  cancellationDateAndTimeValidation,
};
