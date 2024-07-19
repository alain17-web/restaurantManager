const purchaseItemRouter = require("express").Router();
const purchaseItemController = require("../controllers/purchaseItem.controller");
const {authenticate,authorize} = require("../middlewares/authenticate")


purchaseItemRouter.route('/addPurchaseItem')
    .post(authenticate,authorize([1]),purchaseItemController.addPurchaseItem)

purchaseItemRouter.route('/:purchase_id')
    .get(authenticate,authorize([1]),purchaseItemController.getPurchaseItemByPurchaseId)

purchaseItemRouter.route("/updateDelivery_date/:purchase_id")
    .patch(authenticate,authorize([1]),purchaseItemController.updateDeliveryDate)

purchaseItemRouter.route("/updateQty/:purchase_id/:item_id")
    .patch(authenticate,authorize([1]),purchaseItemController.updateQtyByIdAndPurchaseId)

purchaseItemRouter.route("/:purchase_id")
    .delete(authenticate,authorize([1]),purchaseItemController.deletePurchaseItem)

module.exports = purchaseItemRouter;