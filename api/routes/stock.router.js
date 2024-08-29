const stockRouter = require("express").Router();
const stockController = require("../controllers/stock.controller");
const {authenticate,authorize} = require("../middlewares/authenticate");


stockRouter.route("/")
    .get(authenticate,authorize([1]),stockController.getStock)


module.exports = stockRouter;