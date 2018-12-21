require("express-async-errors");
const winston = require("winston");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
