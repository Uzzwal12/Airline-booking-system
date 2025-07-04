const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    flight: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Flight",
    },
    seat: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one seat must be selected",
      },
    },
    travelClass: {
      type: String,
      enum: ["economy", "business"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "failed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

bookingSchema.index(
  { flight: 1, travelClass: 1, seat: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "confirmed" },
  }
);

module.exports = model("Booking", bookingSchema);
