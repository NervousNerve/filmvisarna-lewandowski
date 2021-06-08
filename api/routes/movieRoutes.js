const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/:movieId", movieController.getMovieById);
router.get("/:test", movieController.getAllMovies);

module.exports = router;
