const Booking = require("../models/Booking");

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id }).exec();

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
