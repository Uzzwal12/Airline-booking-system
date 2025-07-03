const { createFlight, getAllFlights } = require("../services/flightService");

const create = async (req, res) => {
  try {
    const flight = await createFlight(req.body);
    res.status(201).json({ message: "Flight created", flight });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const flights = await getAllFlights();
    res.status(200).json({ flights });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching flights", error: err.message });
  }
};

module.exports = { create, getAll };
