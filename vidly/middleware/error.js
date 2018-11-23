const winston = require("winston");

module.exports = function(err, req, res, next) {
  // log exceptins
  winston.error(err.message, err);

  res.status(500).send("Sever error");
};
