const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function() {
  mongoose
    .connect(
      "mongodb://localhost/playground",
      { useNewUrlParser: true }
    )
    .then(() => winston.info("Connected to mongodb"));
};
