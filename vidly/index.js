const genres = require("./routes/genres");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect(
    "mongodb://localhost/playground",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.error("Could not connect to mongodb", err));

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
