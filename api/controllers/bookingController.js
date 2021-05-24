const ObjectId = require("mongoose").Types.ObjectId;
const Booking = require("../models/Booking");
// Screening is needed for populate
const Screening = require("../models/Screening");

const getBookingById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Invalid id parameter",
    });
  }

  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
    })
      .populate({
        path: "screeningId userId",
        populate: {
          path: "movieId theaterId",
        },
      })
      .exec();

    if (!booking) {
      return res.status(404).json({
        error: "No such booking found",
      });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

/* Parameters:
 * req.body.screeningId:  ObjectId of the screening
 * req.body.seats:        Number of seats requested
 *
 * If successful, returns the newly created Booking object
 */

const createBooking = async (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({
      error: "Not logged in",
    });
  }

  if (!ObjectId.isValid(req.body.screeningId)) {
    return res.status(400).json({
      error: "Invalid 'screeningId' parameter",
    });
  }

  if (!Array.isArray(req.body.seats) || !req.body.seats.length) {
    return res.status(400).json({
      error: "Invalid 'seats' parameter",
    });
  }

  try {
    const screening = await Screening.findOne({
      _id: req.body.screeningId,
    })
      .populate("theaterId")
      .populate("movieId")
      .exec();

    if (!screening) {
      return res.status(404).json({
        error: "No such screening found",
      });
    }

    const freeSeats =
      screening.theaterId.seats - screening.occupiedSeats.length;
    if (freeSeats < req.body.seats) {
      return res.status(403).json({
        error: "Not enough free seats available",
      });
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
    return res.status(400).json({
      error: err.message,
    });
  }
};

const getBookingsByUser = async (req, res) => {
  let idToFind = req.query.userid;

  Booking.find({
    userId: idToFind
  }).exec((err, bookings) => {
    if (err) {
      res.status(400).json({
        error: "Something went wrong"
      });
      return;
    }
    if (!bookings) {
      res.json({
        message: `No bookings to show`
      });
      return;
    }
    res.json(bookings);
  });
};

module.exports = {
  getBookingById,
  getBookingsByUser,
  createBooking,
};
