const Booking = require("../models/Booking.js");

const getBookingsByUser = async (req, res) => {
  let idToFind = req.query.userId;

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
  getBookingsByUser,
};