const Screening = require("../models/Screening");
const ObjectId = require("mongoose").Types.ObjectId;

const getScreenings = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Invalid movieId",
    });
  }
  try {
    let screenings = await Screening.find({
      movieId: req.params.id,
      date: { $gte: new Date() },
    }).populate("theaterId");
    if (screenings.length < 1) {
      res.status(400).json({
        error: "No results found",
      });
    }
    res.json(screenings);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err.message,
    });
  }
};
module.exports = {
  getScreenings,
};
