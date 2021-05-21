const User = require("../models/User");
const Encrypt = require("../Encrypt");

const whoami = (req, res) => {
  return res.json(req.session.user || null);
};

const createUser = async (req, res) => {
  let userExists = await User.exists({
    email: req.body.email,
  });

  if (userExists) {
    return res.status(400).json({
      error: "A user with that email already exists",
    });
  }

  let user = await User.create(req.body);
  user.password = undefined;
  return res.json(user);
};

const login = async (req, res) => {
  let userExists = await User.exists({
    email: req.body.email,
  });

  if (userExists) {
    let user = await User.findOne({
      email: req.body.email,
    }).exec();

    req.body.password = Encrypt.encrypt(req.body.password);
    if (user.password === req.body.password) {
      req.session.user = user;
      req.session.user.password = undefined;
      user.password = undefined;
      return res.json({
        message: "Login successfull",
        loggedInUser: user,
      });
    }
  }

  return res.status(401).json({
    error: "Bad credentials",
  });
};

const logout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    return res.json({ message: "Logout successfull" });
  }

  return res.json({ error: "Already logged out" });
};

module.exports = {
  whoami,
  createUser,
  login,
  logout,
};
