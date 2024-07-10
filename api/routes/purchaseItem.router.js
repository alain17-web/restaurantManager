const purchaseItemRouter = require("express").Router();
const purchaseItemController = require("../controllers/purchaseItem.controller");
const {authenticate,authorize} = require("../middlewares/authenticate")


purchaseItemRouter.route('/addPurchaseItem')
    .post(authenticate,authorize([1]),purchaseItemController.addPurchaseItem)

purchaseItemRouter.route('/:purchase_id')
    .get(authenticate,authorize([1]),purchaseItemController.getPurchaseItemByPurchaseId)

module.exports = purchaseItemRouter;