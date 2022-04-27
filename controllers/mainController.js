const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User, Favorite, Bookkeeping } = require("../models/index");

class mainController {
  static getBookkeeping(req, res, next) {
    const { date } = req.query;
    let condition = date
      ? { date, UserId: req.user.id }
      : { UserId: req.user.id };
    Bookkeeping.findAll({ where: condition })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getBookById(req, res, next) {
    Bookkeeping.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        if (!data) throw { name: "NotFound" };
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static postBookkeeping(req, res, next) {
    const { date, amount, title, type } = req.body;
    Bookkeeping.create({ UserId: req.user.id, date, amount, title, type })
      .then((data) => {
        res.status(201).json({
          message: `Bookkeeping with id ${data.id} created`,
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static patchBookkeeping(req, res, next) {
    const { date, amount, title, type } = req.body;
    Bookkeeping.update(
      { date, amount, title, type },
      { where: { id: req.params.id } }
    )
      .then((data) => {
        res.status(201).json({
          message: `Bookkeeping with id ${req.params.id} updated`,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteBookkeeping(req, res, next) {
    Bookkeeping.destroy({ where: { id: req.params.id }, returning: true })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = mainController;
