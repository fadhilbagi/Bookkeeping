const router = require("express").Router();
const errorMiddleware = require("../middlewares/errorMiddleware");
const mainController = require("../controllers/mainController");

router.post("/", mainController.postBookkeeping);
router.get("/", mainController.getBookkeeping);

router.use(errorMiddleware);

module.exports = router;
