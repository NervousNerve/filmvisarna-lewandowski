const ObjectId = require("mongoose").Types.ObjectId;
const Booking = require("../models/Booking");
const Screening = require("../models/Screening");
const Rebate = require("../models/Rebate");

const calcRow = require("../../src/util/calcRow");

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

/* Parameters in req.body:
 * screeningId:  ObjectId of the screening
 * tickets:      Object with three properties:
 *               { adult, child, senior }
 *               Specifying number of each type of ticket requested
 * seats:        Array of specific, requested seat numbers,
 *               or 'undefined' to select seats automatically
 *
 * If successful, returns the newly created Booking object
 */
const createBooking = async (req, res) => {
  const { screeningId, tickets, seats } = req.body;

  if (!req.session?.user) {
    return res.status(401).json({
      error: "Not logged in",
    });
  }

  if (!ObjectId.isValid(screeningId)) {
    return res.status(400).json({
      error: "Invalid 'screeningId' parameter",
    });
  }

  if (
    !tickets ||
    !Number.isInteger(tickets?.child + tickets?.adult + tickets?.senior) ||
    tickets.child < 0 ||
    tickets.adult < 0 ||
    tickets.senior < 0
  ) {
    return res.status(400).json({
      error: "Invalid 'tickets' parameter",
    });
  }

  if ((!Array.isArray(seats) || !seats.length) && seats !== undefined) {
    return res.status(400).json({
      error: "Invalid 'seats' parameter",
    });
  }

  const totalTickets = tickets.child + tickets.adult + tickets.senior;

  if (seats !== undefined && seats.length !== totalTickets) {
    return res.status(400).json({
      error: "Number of 'tickets' and 'seats' do not match",
    });
  }

  try {
    const screening = await Screening.findOne({
      _id: screeningId,
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

    if (freeSeats < totalTickets) {
      return res.status(403).json({
        error: "Not enough free seats available",
      });
    }

    let selectedSeats;
    if (seats?.length) {
      // If specific seats are requested, make sure none of them are occupied
      selectedSeats = [...seats];
      for (const s of selectedSeats) {
        if (
          !Number.isInteger(s) ||
          s <= 0 ||
          s > screening.theaterId.seats ||
          screening.occupiedSeats.includes(s)
        ) {
          return res.status(403).json({
            error: `Requested seat '${s}' is occupied or invalid`,
          });
        }
      }
    } else {
      // No seats specified, pick the first available seats
      selectedSeats = [];
      let seatsLeft = totalTickets;
      for (let i = 1; i <= screening.theaterId.seats && seatsLeft; i++) {
        if (!screening.occupiedSeats.includes(i)) {
          selectedSeats.push(i);
          seatsLeft--;
        }
      }
    }

    // Replace seat numbers with objects containing both seat and row
    selectedSeats = selectedSeats.map((seat) => {
      return {
        seat,
        row: calcRow(seat, screening.theaterId.seatsPerRow),
      };
    });

    const rebates = await Rebate.findOne().exec();

    const price = Math.round(
      (tickets.child * rebates.childMultiplier +
        tickets.adult * rebates.adultMultiplier +
        tickets.senior * rebates.seniorMultiplier) *
        screening.movieId.price
    );

    const booking = await Booking.create({
      seats: selectedSeats,
      price: price,
      userId: req.session.user._id,
      screeningId: screening._id,
    });

    // Set our seats as occupied for this screening
    screening.occupiedSeats.push(...selectedSeats.map((s) => s.seat));
    await screening.save();

    // "Populate" our booking with data from screening
    booking.screeningId = screening;
    return res.json(booking);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

/* Finds bookings for the currently logged in user
 *
 * Parameters:
 * req.query.previous: If 'true' this function returns only past bookings,
 *                     otherwise only returns future bookings
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

    return res.json(bookings);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getRebates = async (req, res) => {
  try {
    let rebates = await Rebate.findOne().exec();
    res.json(rebates);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteBooking = async (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({
      error: "Not logged in",
    });
  }

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid 'id' parameter" });
  }

  const booking = await Booking.findOne({
    _id: ObjectId(req.params.id),
    userId: req.session.user._id,
  });
  if (!booking) {
    return res.status(404).json({ error: "No such booking found" });
  }

  const screening = await Screening.findOne({
    _id: ObjectId(booking.screeningId),
  });
  if (!screening) {
    return res.status(404).json({ error: "No such screening found" });
  }

  try {
    let modifiedSeats = [...screening.occupiedSeats];
    modifiedSeats = modifiedSeats.filter(
      (occupidSeat) => !booking.seats.includes(occupidSeat)
    );

    Screening.updateOne(
      { _id: screening._id },
      { occupiedSeats: modifiedSeats }
    ).exec();

    Booking.deleteOne({ _id: booking._id }).exec();
    res.json({ success: "Booking successfully deleted." });
  } catch {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  deleteBooking,
  getBookingById,
  getBookingsByUser,
  createBooking,
  getRebates,
};
