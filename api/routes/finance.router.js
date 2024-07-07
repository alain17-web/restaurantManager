const financeRouter = require("express").Router();
const financialSummaryController = require("../controllers/financialSummary.controller");
const { authenticate, authorize } = require('../middlewares/authenticate');

financeRouter.route('/addFinanceSummary')
    .post(authenticate,authorize([1]),financialSummaryController.addFinancialSummary)

financeRouter.route('/')
    .get(authenticate,authorize([1]),financialSummaryController.getAllFinancialSummaries)

financeRouter.route("/:id")
    .patch(authenticate,authorize([1]),financialSummaryController.updateFinancialSummary)


module.exports = financeRouter;