const ObjectId = require("mongoose").Types.ObjectId;
const Booking = require("../models/Booking");
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
 * req.body.seats:        Array of requested seat numbers
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
    if (freeSeats < req.body.seats.length) {
      return res.status(403).json({
        error: "Not enough free seats available",
      });
    }

    // Make sure every requested seat is a valid seat number
    // and not already occupied
    for (const s of req.body.seats) {
      if (
        isNaN(s) ||
        s <= 0 ||
        s > screening.theaterId.seats ||
        screening.occupiedSeats.includes(s)
      ) {
        return res.status(403).json({
          error: `Requested seat '${s}' is occupied or invalid`,
        });
      }
    }

    const booking = await Booking.create({
      seats: req.body.seats,
      price: screening.movieId.price * req.body.seats.length,
      userId: req.session.user._id,
      screeningId: screening._id,
    });

    // Set our seats as occupied for this screening
    screening.occupiedSeats.push(...req.body.seats);
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
    userId: idToFind,
  }).exec((err, bookings) => {
    if (err) {
      res.status(400).json({
        error: "Something went wrong",
      });
      return;
    }
    if (!bookings) {
      res.json({
        message: `No bookings to show`,
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
