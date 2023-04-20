const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

absolutePath = __dirname + "/views/index.html";

// Assets at the /public route using midleware
app.use("/public", express.static(__dirname + "/public"));
// use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// middleware usage example
app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// main routes
app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

// // json routes
// app.get("/json", (req, res) => {
//   res.json({
//     message: "Hello json",
//   });
// });

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// chain midleware to create a time server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

// Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

// Get Query Parameter Input from the Client
app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

// Get Data from POST Requests
app.post("/name", function (req, res) {
  var firstName = req.body.first;
  var lastName = req.body.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.body;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

module.exports = app;
