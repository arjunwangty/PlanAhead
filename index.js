const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "client/public")));
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const Users = require("./Users.js");
const Comments = require("./Comments.js");

app.use("/users", Users);
app.use("/comments", Comments);

//mysql://bceda05831a044:ca6092a7@us-cdbr-iron-east-02.cleardb.net/heroku_029a0b50e9489da?reconnect=true

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
