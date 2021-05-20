const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: { type: String },
  seats: { type: Number },
  seatsPerRow: [{ type: Number }],
});

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
