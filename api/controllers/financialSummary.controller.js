const financialSummaryService = require('../services/financialSummary.service');
const financeValidator = require('../validators/financeValidator');

const financialSummaryController = {
    //CREATE
    addFinancialSummary: async (req, res) => {
        try {
            const validateSummary = await financeValidator.validate(req.body, {abortEarly: false});

            const {income,income_date,comments,spendings,spending_date,remarks,total_on_hand,profits} = validateSummary;

            const summary = await financialSummaryService.addFinancialSummary({income,income_date,comments,spendings,spending_date,remarks,total_on_hand,profits})

            res.status(201).json({message: 'Financial Summary Successfully', summary});
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.error('ValidationError', error);
                return res.status(400).json({errors: error.errors});
            }
            console.error('Error controller creating the finacialSummary', error);
            res.status(500).json({message:'Error controller creating the financialSummary', error});
        }
    }
}
module.exports = financialSummaryController