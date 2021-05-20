const mongoose = require("mongoose");

const Encrypt = require("../Encrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Encrypt password before saving it to database.
userSchema.pre("save", async function (next) {
  this.password = Encrypt.encrypt(this.password);
  return next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
