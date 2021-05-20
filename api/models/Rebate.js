const mongoose = require("mongoose");

const rebateSchema = mongoose.Schema({
  childMultiplier: { type: Number, required: true },
  adultMultiplier: { type: Number, required: true },
  seniorMultiplier: { type: Number, required: true },
});

const Rebate = mongoose.model("Rebate", rebateSchema);

module.exports = Rebate;
