const purchaseItemService = require('../services/purchaseItem.service');
const purchaseItemValidator = require('../validators/purchaseItemValidator');

const purchaseItemController = {
    //CREATE
    addPurchaseItem: async (req, res) => {
        try{
            const validatedPurchaseItem = await purchaseItemValidator.validate(req.body);

            const {purchase_id,name,type,cost} = validatedPurchaseItem;

            const purchaseItemResult = await purchaseItemService.addOrderItem({purchase_id,name,type,cost});

            res.status(201).json({message:"PurchaseItem Successfully added",purchaseItemResult});
        }catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({errors:error.errors});
            }
            res.status(500).json({errors:error.errors});
        }
    }
}
module.exports = purchaseItemController;