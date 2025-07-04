const { bookSeatsWithTransaction } = require("../services/bookingService");

const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { flightId, seats, travelClass } = req.body;
    const booking = await bookSeatsWithTransaction({
      userId,
      flightId,
      seats,
      travelClass,
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking };
