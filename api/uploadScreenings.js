const mongoose = require("mongoose");

const Screening = require("./models/Screening");
const data = [];
const uri =
  "mongodb+srv://dbAdmin:password1234@cluster0.bzbxx.mongodb.net/filmvisarna?retryWrites=true&w=majority";

for (let i = 0; i < 32; i++) {
  let date = new Date("2021-05-17");
  date.setDate(17 + i);

  date.setHours(14);
  data.push({
    date: date,
    movieId: 0,
  });

  date.setHours(18);
  data.push({
    date: date,
  });

  date.setHours(21);
  data.push({
    date: date,
  });
}

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    await Screening.create(data);
    console.log("Screening uploaded");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
})();
