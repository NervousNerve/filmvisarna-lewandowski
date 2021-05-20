const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  seats: [{ type: Number }],
  price: { type: Number },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  screeningId: { type: mongoose.Types.ObjectId, ref: "Screening" },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
