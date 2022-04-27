function errorHandler(err, req, res, next) {
  // console.log(err.name, "<<<<");
  if (err.name == "TokenError")
    res.status(401).json({ message: "Token is wrong" });
  else if (err.name == "BadRequestEmailPass")
    res.status(401).json({ message: "incorrect email/password" });
  else if (err.name == "BadRequest")
    res.status(400).json({ message: "incorrect input" });
  else if (err.name == "Unauthorized")
    res.status(403).json({ message: "Unauthorized" });
  else if (err.name == "NotFound")
    res.status(404).json({ message: "Data Not Found" });
  else if (err.name == "SequelizeUniqueConstraintError")
    res.status(400).json({ message: "email must be unique" });
  else if (err.name == "SequelizeValidationError")
    res.status(400).json({ message: err.errors[0].message });
  else res.status(500).json({ message: "internal Server Error" });
}

module.exports = errorHandler;
