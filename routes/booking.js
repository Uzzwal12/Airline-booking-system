const express = require("express");
const {
  createBooking,
  cancelBooking,
} = require("../controllers/bookingController");
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

bookingRouter.patch("/:id/cancel", protect, cancelBooking);

module.exports = { bookingRouter };
