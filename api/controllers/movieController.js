const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
  let searchQuery = req.query.search || "";
  let minDate = new Date(req.query.date ? (req.query.date + " 00:00:00") : "1000-01-01");
  let maxDate = new Date(req.query.date ? (req.query.date + " 23:59:59") : "3000-01-01");

  try {
    let movies = await Movie.aggregate([
      {
        $lookup: {
          from: "screenings",
          localField: "_id",
          foreignField: "movieId",
          as: "screenings",
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { plot: { $regex: searchQuery, $options: "i" } },
            { fullPlot: { $regex: searchQuery, $options: "i" } },
            { director: { $regex: searchQuery, $options: "i" } },
            {
              actors: {
                $elemMatch: { $regex: searchQuery, $options: "i" },
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
          screenings: {
            $elemMatch: { date: { $lte: maxDate, $gte: minDate }}
          }
        },
      },

    ]).exec();
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
