const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seat: { type: Number },
  row: { type: Number },
});

const bookingSchema = new mongoose.Schema({
  seats: [{ type: seatSchema }],
  price: { type: Number },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  screeningId: { type: mongoose.Types.ObjectId, ref: "Screening" },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
