const mongoose = require("mongoose");

const Theater = require("../models/Theater");
const data = require("./Theaters.json");
const uri =
  "mongodb+srv://dbAdmin:password1234@cluster0.bzbxx.mongodb.net/filmvisarna?retryWrites=true&w=majority";

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    await Theater.create(data);
    console.log("Theaters uploaded");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
})();
