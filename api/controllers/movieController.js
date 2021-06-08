const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
  let searchQuery = `${req.query.search}`;

  // let option = `$options: "i"`;

  try {
    let movies = await Movie.find({
      $or: [
        { title: { $regex: searchQuery || "", $options: "i" } },
        { plot: { $regex: searchQuery || "", $options: "i" } },
        { fullPlot: { $regex: searchQuery || "", $options: "i" } },
        { director: { $regex: searchQuery || "", $options: "i" } },
        {
          actors: {
            $elemMatch: { $regex: searchQuery || "", $options: "i" },
          },
        },
      ],

      genre: {
        $elemMatch: { $regex: req.query.genre || "", $options: "i" },
      },
      language: {
        $elemMatch: { $regex: req.query.language || "", $options: "i" },
      },
      actors: {
        $elemMatch: { $regex: req.query.actors || "", $options: "i" },
      },
      director: { $regex: req.query.director || "", $options: "i" },
      runtime: {
        $gte: req.query.minRuntime || 0,
        $lte: req.query.maxRuntime || 1000,
      },
      rated: { $regex: req.query.rated || "", $options: "i" },
      price: {
        $gte: req.query.minPrice || 0,
        $lte: req.query.maxPrice || 1000,
      },
    }).exec();
    res.json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not read filter parameters" });
  }
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
