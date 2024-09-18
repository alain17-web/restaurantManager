const financialSummaryService = require('../services/financialSummary.service');
const financeValidator = require('../validators/financeValidator');

//See comments in booking.controller to understand the logic on this controller called in the router
const financialSummaryController = {
    //CREATE
    addFinancialSummary: async (req, res) => {
        try {
            const validateSummary = await financeValidator.validate(req.body, {abortEarly: false});

            const {
                total = null,
                order_date = null,
                order_id = null,
                comments = null,
                totalPurchase = null,
                purchase_date = null,
                purchase_id = null,
                remarks = null,
                total_on_hand
            } = validateSummary;

            const summary = await financialSummaryService.addFinancialSummary({
                total,
                order_date,
                order_id,
                comments,
                totalPurchase,
                purchase_date,
                purchase_id,
                remarks,
                total_on_hand,
            })

            res.status(200).json({message: 'Financial Summary Successfully', summary});
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.error('ValidationError', error);
                return res.status(400).json({error: error.message});
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

    getLastTotal_on_hand: async (req, res) => {
        try{
            const totalOnHand = await financialSummaryService.getLastTotal_on_hand()
            return res.status(200).json(totalOnHand);
        }catch(error){
            console.error('Error getLastTotal_on_hand controller', error);
            res.status(500).json({message: 'Error getLastTotal_on_hand', error});
        }
    },

    //UPDATE
    updateFinancialSummary: async (req, res) => {
        try{
            const id = req.params.id;
            const validateSummary = await financeValidator.validate(req.body, {abortEarly: false});

            const {
                total,
                order_date,
                order_id,
                comments,
                totalPurchase,
                purchase_date,
                purchase_id,
                remarks,
                total_on_hand,


            } = validateSummary;

            const updatedSummary = await financialSummaryService.updateFinancialSummary(
                id,
                total,
                order_date,
                order_id,
                comments,
                totalPurchase,
                purchase_date,
                purchase_id,
                remarks,
                total_on_hand,

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
    },

    //DELETE
    deleteFinancialSummary: async (req, res) => {
        try{
            const id = req.params.id;
            const deletedSummary = await financialSummaryService.deleteFinancialSummary(id);
            if(deletedSummary > 0) {
                res.status(200).json({message: 'Financial Summary deleted successfully.'});
            }else{
                res.status(404).json({message: 'Financial Summary not found '});
            }
        }catch (error) {
            console.error('Error deleteFinancialSummary', error);
            res.status(500).json({message: 'Error deleteFinancialSummary', error});
        }
    }
}
module.exports = financialSummaryController