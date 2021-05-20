const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  runtime: { type: Number },
  rated: { type: String },
  genre: [{ type: String }],
  actors: [{ type: String }],
  director: { type: String },
  language: [{ type: String }],
  plot: { type: String },
  imageUrl: { type: String },
  trailerUrl: { type: String },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
