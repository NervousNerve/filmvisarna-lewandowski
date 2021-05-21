const Booking = require("../models/Booking");
const Screening = require("../models/Screening");

/* Parameters in req.body:
 * screeningId: ObjectId of the screening
 * seats: Number of seats
 *
 * If successful, returns the newly created Booking object
 */
const createBooking = async (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  if (typeof req.body.seats !== "number" || req.body.seats < 1) {
    return res.status(400).json({ error: "Invalid number of 'seats'" });
  }

  try {
    const screening = await Screening.findOne({
      _id: req.body.screeningId,
    })
      .populate("theaterId")
      .populate("movieId")
      .exec();

    if (!screening)
      throw new Error("No such screening found. Invalid 'screeningId'");

    const freeSeats =
      screening.theaterId.seats - screening.occupiedSeats.length;
    if (freeSeats < req.body.seats) {
      return res.status(403).json({ error: "Not enough free seats available" });
    }

    // TODO: When the seat selection front-end is finished,
    // make this function accept an array of requested seats
    // in body.seats and try to book those
    // For now, we automatically select the first available seats

    // If there are any occupied seats, find the last one
    const lastOccupiedSeat = screening.occupiedSeats.length
      ? screening.occupiedSeats[screening.occupiedSeats.length - 1]
      : 0;

    // Create an array with the requested number of seats,
    // following the last already occupied seat
    const seats = Array.from(
      new Array(req.body.seats),
      (undefined, i) => i + lastOccupiedSeat + 1
    );

    const booking = await Booking.create({
      seats,
      price: screening.movieId.price * seats.length,
      userId: req.session.user._id,
      screeningId: screening._id,
    });

    // Set our seats as occupied for this screening
    screening.occupiedSeats.push(...seats);
    await screening.save();

    return res.json(booking);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { createBooking };
