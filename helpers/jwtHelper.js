const jwt = require("jsonwebtoken");

function sign(value) {
  let token = jwt.sign(value, process.env.JWT_SECRET);
  return token;
}

function verify(value) {
  let token = jwt.verify(value, process.env.JWT_SECRET);
  return token;
}

module.exports = { sign, verify };
