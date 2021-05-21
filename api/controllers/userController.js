const User = require("../models/User");

const createUser = async (req, res) => {
  let userExists = await User.exists({ email: req.body.email });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "A user with that email already exists" });
  }

  let user = await User.create(req.body);
  user.password = undefined;
  return res.json(user);
};

module.exports = {
  createUser,
};
