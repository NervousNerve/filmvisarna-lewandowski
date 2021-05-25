const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController")

router.get("/movies/:movieId", movieController.getMovieById);
router.get("/movies", movieController.getAllMovies);

module.exports = router;