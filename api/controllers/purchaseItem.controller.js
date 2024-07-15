const purchaseItemService = require('../services/purchaseItem.service');
const purchaseItemValidator = require('../validators/purchaseItemValidator');


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
    }
}
module.exports = purchaseItemController;