const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3001;
const uri =

const movieRoutes = require("./routes/movieRoutes");

app.use(express.json());

app.use("/api/v1/movies", movieRoutes);

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
