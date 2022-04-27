const { User } = require("../models/index");
const { sign, verify } = require("../helpers/jwtHelper");
let bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class signinController {
  static postRegister(req, res, next) {
    let { email, password, currency } = req.body;
    // password = bcrypt.hashSync(password, salt);

    if (!email || !password || !currency || currency !== "RP")
      next({ name: "BadRequest" });
    else {
      User.create({
        email,
        password,
        currency,
      })
        .then((data) => {
          let access_token = sign(
            { id: data.id, email, currency },
            process.env.JWT_SECRET
          );
          res.status(201).json({ access_token });
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static postLogin(req, res, next) {
    let { email, password } = req.body;
    let access_token = null;

    if (!email || !password) next({ name: "BadRequestEmailPass" });
    else {
      User.findOne({ where: { email } })
        .then((data) => {
          if (!data) throw { name: "BadRequestEmailPass" };
          access_token = sign({
            id: data.id,
            email: data.email,
          });
          return bcrypt.compare(password, data.password);
        })
        .then((result) => {
          if (result === true) res.status(200).json({ access_token });
          else throw { name: "BadRequestEmailPass" };
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static postSignInGoogle(req, res, next) {
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
      User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          password: "aksdnqbnebqnwenqkjejmnxzhkcqiaid",
          currency: "RP",
        },
      })
        .then((data) => {
          let access_token = sign({
            id: data[0].id,
            email: data[0].email,
          });
          if (data[1] === true)
            res.status(201).json({ access_token, id: data[0].id });
          else res.status(200).json({ access_token, id: data[0].id });
        })
        .catch((err) => {
          next(err);
        });
    }
    verify().catch(console.error);
  }
}

module.exports = signinController;
