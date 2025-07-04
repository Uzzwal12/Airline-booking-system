const { body } = require("express-validator");

exports.bookingValidation = [
  body("flightId")
    .notEmpty()
    .withMessage("flightId is required")
    .isMongoId()
    .withMessage("flightId must be a valid ID"),
  body("seats")
    .isArray({ min: 1 })
    .withMessage("seats must be a non-empty array"),

  body("travelClass")
    .notEmpty()
    .withMessage("travelClass is required")
    .isIn(["economy", "business"])
    .withMessage("travelClass must be economy or business"),
];
