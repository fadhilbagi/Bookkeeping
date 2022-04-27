"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookkeeping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookkeeping.belongsTo(models.User);
    }
  }
  Bookkeeping.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "title must not null" },
          notEmpty: { msg: "title must not empty" },
        },
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: { msg: "UserId must not null" },
          notEmpty: { msg: "UserId must not empty" },
        },
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notNull: { msg: "date must not null" },
          notEmpty: { msg: "date must not empty" },
        },
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: { msg: "amount must not null" },
          notEmpty: { msg: "amount must not empty" },
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "type must not null" },
          notEmpty: { msg: "type must not empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Bookkeeping",
    }
  );
  return Bookkeeping;
};
