const orderItemRouter = require("express").Router();
const orderItemController = require("../controllers/orderItem.controller");
const { authenticate, authorize} = require("../middlewares/authenticate");

orderItemRouter.route("/addOrderItem")
    .post(authenticate, authorize([2]),orderItemController.addOrderItem)

orderItemRouter.route("/")
    .get(authenticate,authorize([9]),orderItemController.getFirstUnvalidatedOrderItems)

orderItemRouter.route("/:order_id")
    .get(authenticate, authorize([1]),orderItemController.getOrderItemByOrderId)

orderItemRouter.route("/:order_id")
    .patch(authenticate,authorize([9]),orderItemController.updateOrderItemFromKitchen)

orderItemRouter.route("/:order_id")
    .delete(authenticate,authorize([1]),orderItemController.deleteOrderItemByOrderId)

module.exports = orderItemRouter;
