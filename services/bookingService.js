const mongoose = require("mongoose");
const Flight = require("../models/flight");
const Booking = require("../models/booking");

const bookSeatsWithTransaction = async ({
  userId,
  flightId,
  seats,
  travelClass,
}) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1. Fetch flight in transaction
    const flight = await Flight.findById(flightId).session(session);
    if (!flight) throw new Error("Flight not found");

    const seatMap = flight.seatMap[travelClass];
    if (!seatMap) throw new Error(`Invalid class: ${travelClass}`);

    // 2. Check if seats are valid
    const invalidSeats = seats.filter((seat) => !seatMap.includes(seat));
    if (invalidSeats.length > 0) {
      throw new Error(`Invalid seats: ${invalidSeats.join(", ")}`);
    }

    // 3. Check for conflicts
    const conflicts = await Booking.find({
      flight: flightId,
      travelClass,
      seat: { $in: seats },
      status: "confirmed",
    }).session(session);

    if (conflicts.length > 0) {
      const alreadyBooked = conflicts.map((b) => b.seat);
      throw new Error(`Seats already booked: ${alreadyBooked.join(", ")}`);
    }

    // 4. Calculate pricing
    const seatPrice = flight.prices[travelClass];
    const totalAmount = seatPrice * seats.length;

    // 5. Build documents (one per seat)
    const bookings = seats.map((seat) => ({
      user: userId,
      flight: flightId,
      seat,
      travelClass,
      totalAmount: seatPrice,
      currency: flight.prices.currency || "INR",
      status: "confirmed",
    }));

    // 6. Insert all seat bookings in transaction
    const inserted = await Booking.insertMany(bookings, { session });

    flight.seats[travelClass].available -= seats.length;

    await flight.save({ session });

    await session.commitTransaction();
    session.endSession();

    // 7. Return group response
    return {
      message: "Booking successful",
      flightId,
      seats,
      totalAmount,
      bookings: inserted,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Handle duplicate error (in case index catches it)
    if (error.code === 11000) {
      throw new Error("One or more seats already booked");
    }

    throw error;
  }
};

const cancelBookingService = async ({ bookingId, userId, userRole }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(bookingId)
      .populate("flight")
      .session(session);

    if (!booking) throw new Error("Booking not found");

    if (
      booking.user.toString() !== userId &&
      !["admin", "staff"].includes(userRole)
    )
      throw new Error("You are not allowed to cancel this booking");

    if (booking.status === "cancelled")
      throw new Error("Booking are already cancelled.");

    const now = new Date();
    const departure = new Date(booking.flight.departure.time);

    const hoursBefore = (departure - now) / (1000 * 60 * 60);

    if (hoursBefore < 2) {
      throw new Error("You cannot cancel 2 hours before the flight");
    }

    booking.status = "cancelled";
    booking.cancelledAt = now;
    booking.cancelledBy = userId;

    await booking.save({ session });

    const flight = await Flight.findById(booking.flight._id).session(session);
    flight.seats[booking.travelClass].available += 1;
    await flight.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Booking cancelled successfully",
      seat: booking.seat,
      cancelledAt: now,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err.message);
  }
};

module.exports = {
  bookSeatsWithTransaction,
  cancelBookingService,
};
