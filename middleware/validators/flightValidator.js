const { body } = require("express-validator");

exports.createFlightValidation = [
  body("flightNumber")
    .notEmpty()
    .withMessage("Flight number cannot be empty")
    .isString()
    .withMessage("Flight number must be a string"),
  body("aircraftModel")
    .notEmpty()
    .withMessage("Aircraft model is required")
    .isString()
    .withMessage("Aircraft model must be a string"),

  body("departure.airport")
    .notEmpty()
    .withMessage("Departure airport is required")
    .isString()
    .withMessage("Departure airport must be a string"),

  body("departure.time")
    .notEmpty()
    .withMessage("Departure time is required")
    .isISO8601()
    .withMessage("Departure time must be a valid ISO date"),

  body("arrival.airport")
    .notEmpty()
    .withMessage("Arrival airport is required")
    .isString()
    .withMessage("Arrival airport must be a string"),

  body("arrival.time")
    .notEmpty()
    .withMessage("Arrival time is required")
    .isISO8601()
    .withMessage("Arrival time must be a valid ISO date"),

  body("prices.economy")
    .notEmpty()
    .withMessage("Economy price is required")
    .isNumeric()
    .withMessage("Economy price must be a number"),

  body("prices.business")
    .notEmpty()
    .withMessage("Business price is required")
    .isNumeric()
    .withMessage("Business price must be a number"),

  body("seatsAvailable.economy")
    .notEmpty()
    .withMessage("Economy seat count is required")
    .isInt({ min: 1 })
    .withMessage("Economy seat count must be at least 1"),

  body("seatsAvailable.business")
    .notEmpty()
    .withMessage("Business seat count is required")
    .isInt({ min: 1 })
    .withMessage("Business seat count must be at least 1"),

  body("seatMap")
    .notEmpty()
    .withMessage("SeatMap is required")
    .custom((value) => {
      if (typeof value !== "object" || Array.isArray(value)) {
        throw new Error("Seat map must be an object with class keys");
      }
      for (let key in value) {
        if (!Array.isArray(key)) {
          throw new Error(`Seat list for class '${key}' must be an array`);
        }
      }

      return true;
    }),
];
