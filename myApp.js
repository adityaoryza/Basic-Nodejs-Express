let express = require("express");
let app = express();
require("dotenv").config();
absolutePath = __dirname + "/views/index.html";

// Assets at the /public route using midleware
app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  // Do something
  // Call the next function in line:
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

module.exports = app;
