const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "orbital@NUS2019",
  database: "comments"
});
db.connect();

app.get("/comments", function(req, res) {
  db.query("SELECT * FROM comments.comments", function(err, results) {
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
  db.query("INSERT INTO comments.comments SET ?", data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data sukses diinput!",
      no: null,
      username: req.body.username,
      course: req.body.course,
      year: req.body.year,
      comment: req.body.comment
    });
  });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
