const authRouter = require("express").Router();
const authController = require('../controllers/auth.controller');


authRouter.route("/login")
    .post(authController.login);

authRouter.route("/logout")
    .post(authController.logout);

module.exports = authRouter;