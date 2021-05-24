const ObjectId = require("mongoose").Types.ObjectId;
const Booking = require("../models/Booking");
// Screening is needed for populate
const Screening = require("../models/Screening");

const getBookingById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid id parameter" });
  }

  try {
    const booking = await Booking.findOne({ _id: req.params.id })
      .populate({
        path: "screeningId userId",
        populate: {
          path: "movieId theaterId",
        },
      })
      .exec();

    if (!booking) {
      return res.status(404).json({ error: "No such booking found" });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getBookingById,
};
