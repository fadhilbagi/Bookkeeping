const { Post, Favorite } = require("../models/index");
function standart(req, res, next) {
  if (req.user.role == "admin") next();
  else {
    Post.findOne({ where: { id: req.params.id } }).then((data) => {
      if (!data) next({ name: "NotFound" });
      else if (data.userId === req.user.id) next();
      else next({ name: "Unauthorized" });
    });
  }
}

module.exports = { standart };
