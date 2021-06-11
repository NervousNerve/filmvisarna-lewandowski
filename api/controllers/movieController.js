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

const getValues = async (req, res) => {
  let values;

  try {
    values = await Movie.aggregate([
      { $unwind: "$genre" },
      { $unwind: "$language" },
      {
        $group: {
          _id: null,
          genre: { $addToSet: "$genre" },
          language: { $addToSet: "$language" },
          rated: { $addToSet: "$rated" },
        },
      },
    ]).exec();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }

  values[0].genre.sort();
  values[0].language.sort();
  values[0].rated.sort();

  res.json(values[0]);
};

module.exports = {
  getAllMovies,
  getMovieById,
  getValues,
};
