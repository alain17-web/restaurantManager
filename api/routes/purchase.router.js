const purchaseRouter = require("express").Router();
const purchaseController = require("../controllers/purchase.controller");
const {authenticate,authorize} = require("../middlewares/authenticate");

purchaseRouter.route("/addPurchase")
    .post(authenticate, authorize([1]), purchaseController.addPurchase);

purchaseRouter.route("/")
    .get(authenticate,authorize([1]),purchaseController.getAllPurchases)

purchaseRouter.route("/updateTotal/:purchase_id")
    .patch(authenticate,authorize([1]),purchaseController.updateTotalPurchase)

purchaseRouter.route("/:purchase_id")
    .delete(authenticate,authorize([1]),purchaseController.deletePurchase)


module.exports = purchaseRouter;