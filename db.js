const db = {};
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "heroku_029a0b50e9489da",
  "bceda05831a044",
  "ca6092a7",
  {
    host: "us-cdbr-iron-east-02.cleardb.net",
    dialect: "mysql",
    operationAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
