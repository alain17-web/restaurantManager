const purchaseItemService = require('../services/purchaseItem.service');
const purchaseItemValidator = require('../validators/purchaseItemValidator');
const updateQtyValidator = require('../validators/updateQtyValidator');
const updateDelDateValidator = require('../validators/updateDelDateValidator');
const purchaseService = require("../services/purchase.service");



const purchaseItemController = {
    //CREATE
    addPurchaseItem: async (req, res) => {
        try{
            const validatedPurchaseItem = await purchaseItemValidator.validate(req.body);

            const {purchase_id,name,type,cost,qty,delivery_date} = validatedPurchaseItem;

            const purchaseItemResult = await purchaseItemService.addOrderItem({purchase_id,name,type,cost,qty,delivery_date});

            res.status(201).json({message:"PurchaseItem Successfully added",purchaseItemResult});
        }catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({errors:error.errors});
            }
            res.status(500).json({errors:error.errors});
        }
    },

    //READ
    getPurchaseItemByPurchaseId: async(req,res)=>{
        try{
            const {purchase_id} = req.params;

            const purchaseItem = await purchaseItemService.getPurchaseItemByPurchaseId(purchase_id);

            res.status(200).json({purchaseItem});
        }catch(error){
            console.error('Error getPurchaseItemByPurchaseId controller',error)
            res.status(500).json({errors:error.errors});
        }
    },



    //UPDATE
    updateDeliveryDate: async (req, res) => {
        try{
            const purchase_id = req.params.purchase_id
            const id = req.params.id;
            const validatedPurchaseItem = await updateDelDateValidator.validate(req.body);

            const {delivery_date} = validatedPurchaseItem;

            const updatedDelDate = await purchaseItemService.updateDeliveryDate(purchase_id,id,delivery_date);
            if(updatedDelDate){
                res.status(201).json({message:"Delivery_date updated successfully."});
            } else {
                res.status(404).json({error:'Delivery_date not found'});
            }
        }catch(error){
            console.error('Error UpdateDeliveryDate controller',error)
            res.status(500).json({errors:error.errors});
        }
    },

    updateQtyByIdAndPurchaseId: async(req,res)=>{
        try{
            const purchase_id = req.params.purchase_id
            const id = req.params.id;
            const validatedItem = await updateQtyValidator.validate(req.body);
            const {qty} = validatedItem;

            const updatedItem = await purchaseItemService.updateQtyByIdAndPurchaseId(purchase_id,id,qty);

            if(updatedItem){
                res.status(201).json({message:"Qty updated successfully."});
            }else {
                res.status(404).json({error:'PurchaseItem not found'});
            }

        }catch(error){
            console.error('Error updateQtyByIdAndPurchaseId controller',error)
            res.status(500).json({errors:error.errors});
        }
    },


    //DELETE
    deletePurchaseItem: async(req,res)=>{
        try{
            const purchaseId = req.params.purchase_id;
            const deletedItem = await purchaseItemService.deletePurchaseItem(purchaseId);
            if(deletedItem){
                res.status(200).json({message:"PurchaseItem deleted successfully."});
            }else{
                res.status(404).json({error:'PurchaseItem not found'});
            }
        }catch(error){
            console.error('Error deleting Purchase Controller',error)
            res.status(500).json({errors:error.errors});
        }
    }
}
module.exports = purchaseItemController;