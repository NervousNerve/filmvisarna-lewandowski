const mongoose = require("mongoose");

const Screening = require("./models/Screening");
const Movie = require("./models/Movie");
const Theater = require("./models/Theater");

const uri =
  "mongodb+srv://dbAdmin:password1234@cluster0.bzbxx.mongodb.net/filmvisarna?retryWrites=true&w=majority";

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const movies = await Movie.find().exec();
    const theaters = await Theater.find().exec();
    const data = [];

    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 3; j++) {
        let date = new Date("2021-05-17");
        date.setDate(17 + i);
        date.setHours(14 + j * 3);
        data.push({
          date: date,
          movieId: movies[Math.floor(Math.random() * movies.length)]._id,
          theaterId: theaters[Math.floor(Math.random() * theaters.length)]._id,
        });
      }
    }

    await Screening.create(data);
    console.log("Screening uploaded");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
})();
