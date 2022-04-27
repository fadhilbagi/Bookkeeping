const router = require("express").Router();
const userController = require("../controllers/userController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const authentication = require("../middlewares/authentificationMiddleware");
const bookRouter = require("./bookkeep");

router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.post("/signInGoogle", userController.postSignInGoogle);

router.use(authentication);
router.use("/bookkeep", bookRouter);

router.use(errorMiddleware);

module.exports = router;
