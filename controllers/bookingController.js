const {
  bookSeatsWithTransaction,
  cancelBookingService,
} = require("../services/bookingService");

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

const cancelBooking = async (req, res) => {
  try {
    console.log("req", req.params);
    const userId = req.user.id;
    const bookingId = req.params.id;

    const userRole = req.user.role;
    const result = await cancelBookingService({
      bookingId,
      userId,
      userRole,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Booking cancel error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking, cancelBooking };
