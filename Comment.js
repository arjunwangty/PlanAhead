const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.sequelize.define(
  "comment",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    course: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);
