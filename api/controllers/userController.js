const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/User");
const Encrypt = require("../Encrypt");
const Booking = require("../models/Booking.js");
const Screening = require("../models/Screening.js");

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
    return res.json({ success: "Registration successful" });
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

    // Don't include password in response
    user.password = undefined;
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

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid 'id' parameter" });
  }

  const user = await User.findOne({ _id: ObjectId(req.params.id) });
  if (!user) {
    return res.status(404).json({ error: "No such user found" });
  }

  try {
    let screenings = await Screening.aggregate([
      {
        $lookup: {
          from: "bookings",
          let: { user: user._id, screening: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$user"] },
                    { $eq: ["$screeningId", "$$screening"] },
                  ],
                },
              },
            },
          ],
          as: "bookings",
        },
      },
      { $match: { "bookings.userId": user._id } },
    ]).exec();

    let releasedSeats = 0;
    // Free up seats occupied by this user
    screenings.forEach((screening) => {
      let modifiedSeats = [...screening.occupiedSeats];
      screening.bookings.forEach((booking) => {
        // Only keep seats that are not included in a booking
        modifiedSeats = modifiedSeats.filter(
          (seat) => !booking.seats.includes(seat)
        );
      });
      // Remember how many seats we removed for logging purposes
      releasedSeats += screening.occupiedSeats.length - modifiedSeats.length;
      Screening.updateOne(
        { _id: screening._id },
        { occupiedSeats: modifiedSeats }
      ).exec();
    });

    Booking.deleteMany({ userId: user._id }).exec();
    User.deleteOne({ _id: user._id }).exec();

    res.send(
      `Deleted user ${user.name}, \
      freeing up ${releasedSeats} seat(s) \
      over ${screenings.length} screening(s)`
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  whoami,
  createUser,
  login,
  logout,
  deleteUser,
};
