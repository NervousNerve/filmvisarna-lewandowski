const Theater = require("../models/Theater");

const getAllTheaters = async (req, res) => {
  let theater = await Theater.find().exec();
  res.json(theater);
};

module.exports = {
  getAllTheaters,
};
