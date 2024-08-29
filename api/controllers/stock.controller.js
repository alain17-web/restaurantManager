const stockService = require('../services/stock.service');
const stockValidator = require('../validators/stockValidator');

const stockController = {
    //READ
    getStock: async (req, res) => {
        try{
            const stock = await stockService.getStock();
            res.status(200).json(stock);
        }catch(error){
            console.error('Error getting stocks controller',error);
            return res.status(500).send('Error getting stocks controller',error);
        }
    },

    //UPDATE
    updateStock: async (req, res) => {
        try{
            const validateStock = await stockValidator.validate(req.body);
            const {item_name,quantity} = validateStock;

            const updateQty = await stockService.updateStock(item_name,quantity);
            if(updateQty){
                res.status(200).json({message:'Stock updated successfully.'});
            }else{
                res.status(404).json({error: 'Stock not found or no change made'});
            }
        }catch(error){
            console.error('Error updating stock controller', error);
            res.status(500).send('Error updating stock controller',error);
        }
    }
}

module.exports = stockController;