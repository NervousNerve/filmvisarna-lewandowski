const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
  // let movies = await Movie.find().exec();

  console.log(req.body);
  console.log(req.params.test.title);

  let movies = await Movie.find({
    title: req.params.test.title,
    // runtime: { $gte: 80 },
  }).exec();
  res.json(movies);

  //   var query = {};
  //   if( your_variable !== "" ) {
  //       query["some_key"] = your_variable;
  //   }
  //   if( your_second_variable !== "" ) {
  //       query["some_other_key"] = your_second_variable;
  //   }
  //   mongoose.model('customers').find(query, function(err, c) {
  //     //do something
  // });
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
