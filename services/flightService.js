const Flight = require("../models/flight");

const createFlight = async (flightData) => {
  const flightExists = await Flight.findOne({
    flightNumber: flightData.flightNumber,
  });
  if (flightExists) throw new Error("Flight with this number already exists");

  const flight = await Flight.create(flightData);
  return flight;
};

const getAllFlights = async () => {
  return await Flight.find().sort({ departure: 1 });
};

module.exports = { createFlight, getAllFlights };
