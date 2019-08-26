const express = require("express");
const comments = express.Router();
const cors = require("cors");
const Comment = require("./Comment");
comments.use(cors());

comments.get("/list", function(req, res) {
  Comment.findAll().then(result => res.json(result));
  console.log("Sent list of items");
});

comments.post("/list", function(req, res) {
  console.log(req.body);
  const data = {
    username: req.body.username,
    course: req.body.course,
    year: req.body.year,
    comment: req.body.comment
  };
  Comment.create(data).catch(err => {
    res.send("error: " + err);
  });
});

module.exports = comments;
