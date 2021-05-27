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

  if (
    isNaN(req.body.seats) &&
    !Array.isArray(req.body.seats) &&
    !req.body.seats.length
  ) {
    return res.status(400).json({
      error: "Invalid 'seats' parameter. Expected Number or non-empty Array",
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

/* Finds bookings for the currently logged in user
 *
 * Parameters:
 * req.body.previous: If 'true' this function returns only past bookings,
 *                    otherwise only returns future bookings
 */
const getBookingsByUser = async (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({
      error: "Not logged in",
    });
  }

  const idToFind = ObjectId(req.session.user._id);

  const fromDate =
    req.query.previous === "true" ? new Date(1900, 01, 01) : new Date();
  const toDate =
    req.query.previous === "true" ? new Date() : new Date(3000, 01, 01);

  try {
    let bookings = await Booking.aggregate([
      // First we find all bookings for the current user
      { $match: { userId: idToFind } },
      {
        // Kind of like .populate.
        // Find all screenings that match our 'screeningId',
        // and store them in 'screeningId'
        $lookup: {
          from: "screenings",
          localField: "screeningId",
          foreignField: "_id",
          as: "screeningId",
        },
      },
      // $lookup creates an array, but since we will only ever have one
      // screening per booking $unwind gives us that single object instead
      { $unwind: "$screeningId" },
      // Finally filters bookings that have a screening with a matching date
      { $match: { "screeningId.date": { $gte: fromDate, $lte: toDate } } },
      {
        $lookup: {
          from: "movies",
          localField: "screeningId.movieId",
          foreignField: "_id",
          as: "screeningId.movieId",
        },
      },
      { $unwind: "$screeningId.movieId" },
      {
        $lookup: {
          from: "theaters",
          localField: "screeningId.theaterId",
          foreignField: "_id",
          as: "screeningId.theaterId",
        },
      },
      { $unwind: "$screeningId.theaterId" },
    ]).exec();

    if (!bookings.length) {
      return res.status(404).json({ error: "No bookings found" });
    }
    return res.json(bookings);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getBookingById,
  getBookingsByUser,
  createBooking,
};
