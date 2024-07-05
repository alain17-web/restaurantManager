const financeRouter = require("express").Router();
const financialSummaryController = require("../controllers/financialSummary.controller");
const { authenticate, authorize } = require('../middlewares/authenticate');

financeRouter.route('/addFinanceSummary')
    .post(authenticate,authorize([1]),financialSummaryController.addFinancialSummary)


module.exports = financeRouter;