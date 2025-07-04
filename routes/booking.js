const express = require("express");
const { createBooking } = require("../controllers/bookingController");
const {
  bookingValidation,
} = require("../middleware/validators/bookingValidator");
const {
  handleValidation,
} = require("../middleware/validators/handleValidation");
const { protect, authorize } = require("../middleware/authMiddleware");

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  protect,
  authorize("passenger"),
  bookingValidation,
  handleValidation,
  createBooking
);

module.exports = { bookingRouter };
