const Booking = require("../models/Booking");
// Screening is needed for populate
const Screening = require("../models/Screening");

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id })
      .populate("screeningId")
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
