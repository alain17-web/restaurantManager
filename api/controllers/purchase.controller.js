const purchaseService = require('../services/purchase.service');
const purchaseValidator = require('../validators/purchaseValidator');
const updateTotalValidator = require('../validators/updateTotalValidator');
const updateDelDateValidator = require('../validators/updateDelDateValidator');

//See comments in booking.controller to understand the logic on this controller called in the router
const purchaseController = {
    //CREATE
    addPurchase: async (req, res) => {
        try{
            const validatePurchase = await purchaseValidator.validate(req.body,{abortEarly:false});

            const {purchase_date,totalPurchase,status,delivery_date} = validatePurchase;

            const purchaseResult = await purchaseService.addPurchase({purchase_date,totalPurchase,delivery_date});

            res.status(200).json({message: 'Order created successfully', purchaseResult});

        }catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({error:error.message});
            }
            res.status(500).json({message:'Error creating purchase controller',error});
        }
    },

    //READ
    getAllUndeliveredPurchases: async(req,res)=>{
        try{
            const purchases = await purchaseService.getAllUndeliveredPurchases();
            res.status(200).json(purchases);
        }catch(error){
            console.error('Error getAllPurchases controller',error)
            res.status(500).json({message:"Error getAllPurchases controller",error});
        }
    },

    getAllDeliveredPurchases: async(req,res)=>{
        try{
            const purchases = await purchaseService.getAllDeliveredPurchases();
            res.status(200).json(purchases);
        }catch(error){
            console.error('Error getAllDeliveredPurchases controller',error)
            res.status(500).json({message:"Error getAllDeliveredPurchases",error});
        }
    },

    getLastDeliveredPurchaseId: async(req,res)=>{
        try{
            const purchaseId = await purchaseService.getLastDeliveredPurchaseId();
            res.status(200).json(purchaseId);
        }catch(error){
            console.error('Error getLastDeliveredPurchaseId controller',error)
            res.status(500).json({message:"Error getLastDeliveredPurchaseId controller",error});
        }
    },

    //UPDATE
    updateTotalPurchase: async (req, res) => {
        try {
            const purchase_id = req.params.purchase_id;
            const validatePurchase = await updateTotalValidator.validate(req.body);

            const {totalPurchase} = validatePurchase;

            const updatedPurchase = await purchaseService.updateTotalPurchase(purchase_id, totalPurchase);

            if (updatedPurchase) {
                res.status(200).json({message: 'Purchase total updated successfully.'});
            } else {
                res.status(404).json({error: 'Purchase not found or no change made'});
            }
        }catch(error){
            console.error('Error updateTotalPurchase controller', error)
            res.status(500).json({message:"Error updateTotalPurchase controller",error});
        }
    },

    updateDelDate: async (req, res) => {
        try{
            const purchase_id = req.params.purchase_id;
            const validatePurchase = await updateDelDateValidator.validate(req.body);

            const {delivery_date} = validatePurchase;

            const updatedDelDate = await purchaseService.updateDelDate(purchase_id,delivery_date);

            if(updatedDelDate){
                res.status(200).json({message: 'Delivery date updated successfully.'});
            } else {
                res.status(404).json({error:'Delivery date updated successfully.'});
            }
        }catch(error){
            console.error('Error updateDelDate controller',error)
            res.status(500).json({message:"Error updateDelDate controller",error});
        }
    },

    //DELETE
    deletePurchase: async (req, res) => {
        try{
            const purchase_id = req.params.purchase_id;
            const deletedPurchase = await purchaseService.deletePurchase(purchase_id);
            if (deletedPurchase > 0) {
                res.status(200).json({message: 'Purchase deleted successfully.'});
            } else {
                res.status(404).json({error: 'Purchase not found'});
            }
        }catch(error){
            console.error('Error deletePurchase controller',error)
            res.status(500).json({message: 'Error deleting Purchase Controller',error});
        }
    }
}
module.exports = purchaseController;