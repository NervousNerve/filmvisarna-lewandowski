const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
  let movies = await Movie.find().exec();
  res.json(movies);
};

const getMovieById = async (req, res) => {
  Movie.findById(req.params.movieId).exec((err, movie) => {
    if (err) {
      res.status(400).json({ error: "Something went wrong" });
      return;
    }
    if (!movie) {
      res
        .status(404)
        .json({ error: `Movie with id ${req.params.movieId} does not exist` });
      return;
    }
    res.json(movie);
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
};
