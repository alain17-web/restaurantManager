const purchaseService = require('../services/purchase.service');
const purchaseValidator = require('../validators/purchaseValidator');
const updateTotalValidator = require('../validators/updateTotalValidator');
const updateDelDateValidator = require('../validators/updateDelDateValidator');
const purchaseItemService = require("../services/purchaseItem.service");

const purchaseController = {
    //CREATE
    addPurchase: async (req, res) => {
        try{
            const validatePurchase = await purchaseValidator.validate(req.body,{abortEarly:false});

            const {purchase_date,total,status,delivery_date} = validatePurchase;

            const purchaseResult = await purchaseService.addPurchase({purchase_date,total,delivery_date});

            res.status(201).json({message: 'Order created successfully', purchaseResult});

        }catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({errors:error.errors});
            }
            res.status(500).json({message:'Error creating purchase controller',error});
        }
    },

    //READ
    getAllPurchases: async(req,res)=>{
        try{
            const purchases = await purchaseService.getAllPurchases();
            res.status(201).json(purchases);
        }catch(error){
            console.error('Error getAllPurchases controller',error)
            res.status(500).json({message:"Error getAllPurchases controller",error});
        }
    },

    //UPDATE
    updateTotalPurchase: async (req, res) => {
        try {
            const purchase_id = req.params.purchase_id;
            const validatePurchase = await updateTotalValidator.validate(req.body);

            const {total} = validatePurchase;

            const updatedPurchase = await purchaseService.updateTotalPurchase(purchase_id, total);

            if (updatedPurchase) {
                res.status(201).json({message: 'Purchase total updated successfully.'});
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
                res.status(201).json({message: 'Delivery date updated successfully.'});
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