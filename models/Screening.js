const mongoose = require("mongoose");

const screeningSchema = mongoose.Schema({
  date: { type: Date },
  occupiedSeats: [{ type: Number }],
  movieId: { type: mongoose.Types.ObjectId, ref: "Movie" },
  theaterId: { type: mongoose.Types.ObjectId, ref: "Theater" },
});

const Screening = mongoose.model("Screening", screeningSchema);

module.exports = Screening;
