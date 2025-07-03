const express = require("express");
const { create, getAll } = require("../controllers/flightController");

const {
  handleValidation,
} = require("../middleware/validators/handleValidation");
const {
  createFlightValidation,
} = require("../middleware/validators/flightValidator");

const flightRouter = express.Router();

flightRouter.post("/", createFlightValidation, handleValidation, create);
flightRouter.get("/", getAll);

module.exports = { flightRouter };
