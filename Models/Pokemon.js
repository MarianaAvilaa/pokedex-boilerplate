//With Sequelize set up, we can now create models for our data. Models in Sequelize are the essence of Sequelize. A Sequelize Model represents a table in the DB, and every instance of the model represents a row in the table.

//This code defines a new Sequelize model named Pokemon with the fields name, type, trainer, date, and image


const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Pokemon = db.define("Pokemon", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trainer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Pokemon;

const Trainer = require("./Trainer");

Pokemon.belongsTo(Trainer);