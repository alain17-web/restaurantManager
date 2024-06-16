const orderRouter = require("express").Router();
const orderController = require("../controllers/order.controller");
const { authenticate, authorize} = require("../middlewares/authenticate");

orderRouter.route("/addOrder")
    .post(authenticate,authorize([2]),orderController.addOrder);

orderRouter.route("/")
    .get(authenticate,authorize([2]),orderController.getAllOrders);



module.exports = orderRouter;