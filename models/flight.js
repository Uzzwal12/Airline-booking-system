const { Schema, model } = require("mongoose");

const flightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
    },
    aircraftModel: {
      type: String,
      required: true,
    },
    departure: {
      airport: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
    },
    arrival: {
      airport: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
    },
    prices: {
      economy: {
        type: Number,
        required: true,
      },
      business: {
        type: Number,
        required: true,
      },
    },
    seats: {
      economy: {
        total: {
          type: Number,
          required: true,
        },
        available: {
          type: Number,
          required: true,
        },
      },
      business: {
        total: {
          type: Number,
          required: true,
        },
        available: {
          type: Number,
          required: true,
        },
      },
    },
    seatMap: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Flight", flightSchema);
