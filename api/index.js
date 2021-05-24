const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const port = 3001;
const uri =
  "mongodb+srv://dbAdmin:password1234@cluster0.bzbxx.mongodb.net/filmvisarna?retryWrites=true&w=majority";

const movieRoutes = require("./routes/movieRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use(express.json());

app.use(
  session({
    secret: "The Phantom Menace",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/theaters", theaterRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
