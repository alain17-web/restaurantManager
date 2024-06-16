const orderRouter = require("express").Router();
const orderController = require("../controllers/order.controller");
const { authenticate, authorize} = require("../middlewares/authenticate");

orderRouter.route("/addOrder")
    .post(authenticate,authorize([2]),orderController.addOrder);

orderRouter.route("/")
    .get(authenticate,authorize([1]),orderController.getAllOrders);

orderRouter.route("/:id")
    .patch(authenticate,authorize([9]),orderController.updateOrder);

orderRouter.route("/:id")
    .delete(authenticate,authorize([2]),orderController.deleteOrder);


module.exports = orderRouter;