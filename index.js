const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("./db.js");

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

//mysql://bceda05831a044:ca6092a7@us-cdbr-iron-east-02.cleardb.net/heroku_029a0b50e9489da?reconnect=true

app.get("/comments", function(req, res) {
  mysql.pool.query("SELECT * FROM comments", function(err, results) {
    if (err) throw err;
    res.send(results);
    console.log("Sent list of items");
  });
});

app.post("/comments", function(req, res) {
  console.log(req.body);
  var data = {
    username: req.body.username,
    course: req.body.course,
    year: req.body.year,
    comment: req.body.comment
  };
  mysql.pool.query("INSERT INTO comments SET ?", data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "success",
      no: null,
      username: req.body.username,
      course: req.body.course,
      year: req.body.year,
      comment: req.body.comment
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
