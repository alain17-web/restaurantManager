const orderRouter = require("express").Router();
const orderController = require("../controllers/order.controller");
const { authenticate, authorize} = require("../middlewares/authenticate");

orderRouter.route("/addOrder")
    .post(authenticate,authorize([2]),orderController.addOrder);

orderRouter.route("/")
    .get(authenticate,authorize([1,9]),orderController.getAllOrders);

orderRouter.route("/lastValidatedOrderId")
    .get(authenticate,authorize([1]),orderController.getLastValidatedOrderId)

orderRouter.route("/:order_id")
    .get(authenticate,authorize([9]),orderController.getOrderById)


orderRouter.route("/:id")
    .patch(authenticate,authorize([9]),orderController.updateOrder);

orderRouter.route("/:id")
    .delete(authenticate,authorize([1]),orderController.deleteOrder);


module.exports = orderRouter;