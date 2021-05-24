const Booking = require("../models/Booking.js");

const getBookingsByUser = async (req, res) => {
  // //might have to be changed depending on how things go
  let idToFind = req.body._id;

  if (err) {
    Booking.find({ userId: idToFind }).exec((err, bookings) => {
      res.status(400).json({ error: "Something went wrong" });
      return;
    });
  }
  if (!bookings) {
    res.json({ message: `No bookings to show` });
    return;
  }
  res.json(bookings);
};

module.exports = {
  getBookingsByUser,
};
