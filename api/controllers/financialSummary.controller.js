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
    },

    //READ
    getAllFinancialSummaries: async (req, res) => {
        try {
            const summaries = await financialSummaryService.getAllFinancialSummaries()
            return res.status(200).json(summaries);
        }catch (error) {
            console.error('Error controller getAllFinancialSummaries', error);
            return res.status(500).json({message: 'Error controller getAllFinancialSummaries', error});
        }
    },

    //UPDATE
    updateFinancialSummary: async (req, res) => {
        try{
            const id = req.params.id;
            const validateSummary = await financeValidator.validate(req.body, {abortEarly: false});

            const {
                income,
                income_date,
                comments,
                spendings,
                spending_date,
                remarks,
                total_on_hand,
                profits,

            } = validateSummary;

            const updatedSummary = await financialSummaryService.updateFinancialSummary(
                id,
                income,
                income_date,
                comments,
                spendings,
                spending_date,
                remarks,
                total_on_hand,
                profits
            )
            if (updatedSummary) {
                res.status(200).json({message: 'Financial Summary updated Successfully'});
            }else{
                res.status(404).json({message: 'Financial Summary not found or no change made'});
            }
        }catch (error) {
            console.error('Error updateFinancialSummary', error);
            res.status(500).json({message: 'Error updateFinancialSummary', error});
        }
    }
}
module.exports = financialSummaryController