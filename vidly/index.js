require("express-async-errors");
const winston = require("winston");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();

require('./startup/routes')(app);

process.on("uncaughtException", ex => {
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", ex => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(winston.transports.File, {
  filename: "logfile.log"
});

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb://localhost/playground",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.error("Could not connect to mongodb", err));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
