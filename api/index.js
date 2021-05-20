const express = require("express");

const app = express();
const port = 3001;

const movieRoutes = require("./routes/movieRoutes");

app.use(express.json());

app.use("/api/v1/movies", movieRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
