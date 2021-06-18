const mongoose = require("mongoose");

const Movie = require("../models/Movie");
const data = require("./Movies.json");
const uri =
  "mongodb+srv://dbAdmin:password1234@cluster0.bzbxx.mongodb.net/filmvisarna?retryWrites=true&w=majority";

for (const movie of data) {
  movie.price = movie.runtime;

  movie.genre = movie.genre.split(", ");
  movie.actors = movie.actors.split(", ");
  movie.language = movie.language.split(", ");
}

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    await Movie.create(data);
    console.log("Movies uploaded");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
})();
