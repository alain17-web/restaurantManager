const purchaseService = require('../services/purchase.service');
const purchaseValidator = require('../validators/purchaseValidator');

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
    }
}
module.exports = purchaseController;