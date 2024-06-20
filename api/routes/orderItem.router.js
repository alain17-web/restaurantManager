const orderItemRouter = require("express").Router();
const orderItemController = require("../controllers/orderItem.controller");
const { authenticate, authorize} = require("../middlewares/authenticate");

orderItemRouter.route("/addOrderItem")
    .post(authenticate, authorize([2]),orderItemController.addOrderItem)

orderItemRouter.route("/")
    .get(authenticate,authorize([9]),orderItemController.getFirstUnvalidatedOrderItems)

orderItemRouter.route("/:order_id")
    .get(authenticate, authorize([1,9]),orderItemController.getOrderItemByOrderId)

module.exports = orderItemRouter;
