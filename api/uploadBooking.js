const mongoose = require("mongoose");

const Booking = require("./models/Booking");
const Screening = require("./models/Screening");
const User = require("./models/User");


const uri =
  "mongodb+srv://dbAdmin:password1234@cluster0.bzbxx.mongodb.net/filmvisarna?retryWrites=true&w=majority";

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const user = await User.find().exec();
    const screening = await Screening.find().exec();
    const data = [];

    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 3; j++) {
        let date = new Date("2021-05-17");
        date.setDate(17 + i);
        date.setHours(14 + j * 3);
        data.push({
          date: date,
          userId: user[Math.floor(Math.random() * movies.length)]._id,
          screeningId: screening[Math.floor(Math.random() * theaters.length)]._id,
        });
      }
    }

    await Booking.create(data);
    console.log("Booking uploaded");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
})();
