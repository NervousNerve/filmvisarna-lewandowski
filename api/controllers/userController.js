const User = require("../models/User");
const Encrypt = require("../Encrypt");

const createUser = async (req, res) => {
  let userExists = await User.exists({
    email: req.body.email
  });

  if (userExists) {
    return res
      .status(400)
      .json({
        error: "A user with that email already exists"
      });
  }

  let user = await User.create(req.body);
  user.password = undefined;
  return res.json(user);
};

const login = async (req, res) => {
  let userExists = await User.exists({
    email: req.body.email
  });

  if (userExists) {
    let user = await User.findOne({
      email: req.body.email
    }).exec();

    req.body.password = Encrypt.encrypt(req.body.password);
    if (user.password === req.body.password) {
      user.password = undefined;
      return res.json({
        message: "Login successfull",
        loggedInUser: user
      });
    }
  }

  return res.status(401).json({
    error: "Bad credentials"
  });
};

module.exports = {
  createUser,
  login,
};