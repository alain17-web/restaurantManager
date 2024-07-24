const purchaseService = require('../services/purchase.service');
const purchaseValidator = require('../validators/purchaseValidator');
const updatePurchaseValidator = require('../validators/updatePurchaseValidator');

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
    updatePurchase: async (req, res) => {
        try {
            const purchase_id = req.params.purchase_id;
            const validatePurchase = await updatePurchaseValidator.validate(req.body);

            const {total,delivery_date} = validatePurchase;

            const updatedPurchase = await purchaseService.updatePurchase(purchase_id, total, delivery_date);

            if (updatedPurchase) {
                res.status(201).json({message: 'Purchase updated successfully.'});
            } else {
                res.status(404).json({error: 'Purchase not found or no change made'});
            }
        }catch(error){
            console.error('Error updatePurchase controller', error)
            res.status(500).json({message:"Error updatePurchase controller",error});
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