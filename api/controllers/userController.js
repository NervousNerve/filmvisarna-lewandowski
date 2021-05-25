const User = require("../models/User");
const Encrypt = require("../Encrypt");
const Booking = require("../models/Booking.js");

const whoami = (req, res) => {
  return res.json(req.session.user || null);
};

const createUser = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    return res.status(400).json({ error: "Something is missing in request" });
  }

  try {
    let userExists = await User.exists({ email: req.body.email });
    if (userExists) {
      return res.status(403).json({ error: "User already exists" });
    }

    let user = await User.create(req.body);
    user.password = undefined;
    return res.json(user);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(401).json({ error: "Bad credentials" });
    }

    req.body.password = Encrypt.encrypt(req.body.password);
    if (user.password !== req.body.password) {
      return res.status(401).json({ error: "Bad credentials" });
    }

    delete user.password;
    req.session.user = user;
    return res.json({ message: "Login successful", loggedInUser: user });
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const logout = (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ error: "Not logged in" });
  }

  delete req.session.user;
  return res.json({ message: "Logout successful" });
};

module.exports = {
  whoami,
  createUser,
  login,
  logout,
};
