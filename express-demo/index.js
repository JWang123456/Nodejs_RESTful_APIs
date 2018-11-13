const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const logger = require("./middleware/logger");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));
app.use(logger); //custom midware

app.use("/api/courses", courses);
app.use("/", home);
if (app.get("env") === "development") {
  // app.use(helmet());
  app.use(morgan("tiny"));
  startupDebugger("Morgen enabled");
}

dbDebugger("Connected to db....");

// console.log("Application Name:" + config.get("name"));

// console.log("Mail Server:" + config.get("mail.host"));
// console.log("Mail Pass:" + config.get("mail.password"));

app.listen(3000, () => console.log("Listening on 30000"));
