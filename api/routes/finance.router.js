const financeRouter = require("express").Router();
const financialSummaryController = require("../controllers/financialSummary.controller");
const { authenticate, authorize } = require('../middlewares/authenticate');

financeRouter.route('/addFinanceSummary')
    .post(authenticate,authorize([1,9]),financialSummaryController.addFinancialSummary)

financeRouter.route('/')
    .get(authenticate,authorize([1,10]),financialSummaryController.getAllFinancialSummaries)

financeRouter.route('/lastTotalOnHand')
    .get(authenticate,authorize([1,9, 10]),financialSummaryController.getLastTotal_on_hand)

financeRouter.route("/:id")
    .patch(authenticate,authorize([1]),financialSummaryController.updateFinancialSummary)

financeRouter.route("/:id")
    .delete(authenticate,authorize([1]),financialSummaryController.deleteFinancialSummary)


module.exports = financeRouter;