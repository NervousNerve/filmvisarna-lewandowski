const Booking = require("../models/Booking");
const Screening = require("../models/Screening");

const createBooking = async (req, res) => {
  // TODO: Uncomment this check when login is working
  // if (!req.session?.user) {
  //   return res.status(401).json({ error: "Not logged in" });
  // }

  try {
    const screening = await Screening.findOne({
      _id: req.body.screeningId,
    })
      .populate("theaterId")
      .populate("movieId")
      .exec();

    const freeSeats =
      screening.theaterId.seats - screening.occupiedSeats.length;
    if (freeSeats < req.body.seats) {
      return res.status(403).json({ error: "Not enough free seats available" });
    }

    let lastOccupiedSeat = 0;
    if (screening.occupiedSeats.length > 0) {
      lastOccupiedSeat =
        screening.occupiedSeats[screening.occupiedSeats.length - 1];
    }
    // Create an array of seats for this this booking
    const seats = Array.from(
      new Array(req.body.seats),
      (undefined, i) => i + lastOccupiedSeat + 1
    );

    const booking = await Booking.create({
      seats,
      price: screening.movieId.price * seats.length,
      // TODO: Uncomment this when login is working
      // userId: req.session.user.id,
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
