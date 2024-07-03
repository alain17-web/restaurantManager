const purchaseRouter = require("express").Router();
const purchaseController = require("../controllers/purchase.controller");
const {authenticate,authorize} = require("../middlewares/authenticate");

purchaseRouter.route("/addPurchase")
    .post(authenticate, authorize([1]), purchaseController.addPurchase);

purchaseRouter.route("/")
    .get(authenticate,authorize([1]),purchaseController.getAllPurchases)

purchaseRouter.route("/:id")
    .patch(authenticate,authorize([1]),purchaseController.updatePurchase)


module.exports = purchaseRouter;