let express = require("express");
let app = express();
absolutePath = __dirname + "/views/index.html";

// Assets at the /public route using midleware
app.use("/public", express.static(__dirname + "/public"));

// main routes
app.get("/", function (req, res) {
  //   res.send("Hello Express");
  res.sendFile(absolutePath);
});

// json routes
app.get("/json", (req, res) => {
  res.json({
    message: "Hello json",
  });
});
module.exports = app;
