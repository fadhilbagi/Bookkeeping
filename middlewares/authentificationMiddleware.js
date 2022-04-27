const { sign, verify } = require("../helpers/jwtHelper");
const { User } = require("../models/index");

function authentication(req, res, next) {
  if (req.headers.token === null || req.headers.access_token === undefined)
    next({ name: "TokenError" });
  try {
    const payload = verify(req.headers.access_token);
    const { id, email } = payload;
    if (verify(req.headers.access_token)) {
      User.findOne({ where: { email } }).then((data) => {
        if (!data) next({ name: "TokenError" });
        req.user = data;
        console.log(req.user.role);
        next();
      });
    } else {
      next({ name: "TokenError" });
    }
  } catch (error) {
    next({ name: "TokenError" });
  }
}

module.exports = authentication;
