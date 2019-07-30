const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "bceda05831a044",
  password: "ca6092a7",
  database: "heroku_029a0b50e9489da"
});

module.exports.pool = db;
