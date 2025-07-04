const express = require("express");
const {
  create,
  getAll,
  getFlightDetails,
} = require("../controllers/flightController");

const {
  handleValidation,
} = require("../middleware/validators/handleValidation");
const {
  createFlightValidation,
} = require("../middleware/validators/flightValidator");
const { protect, authorize } = require("../middleware/authMiddleware");

const flightRouter = express.Router();

flightRouter.post(
  "/",
  protect,
  authorize("admin", "staff"),
  createFlightValidation,
  handleValidation,
  create
);
flightRouter.get("/", getAll);
flightRouter.get("/:id", getFlightDetails);

module.exports = { flightRouter };
