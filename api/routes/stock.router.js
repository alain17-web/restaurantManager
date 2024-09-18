//See comments in booking.router to understand the router
const stockRouter = require("express").Router();
const stockController = require("../controllers/stock.controller");
const {authenticate,authorize} = require("../middlewares/authenticate");


stockRouter.route("/")
    .get(authenticate,authorize([1,10]),stockController.getStock)

stockRouter.route("/updateStock")
    .patch(authenticate,authorize([1,9]),stockController.updateStock)


module.exports = stockRouter;