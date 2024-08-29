const stockService = require('../services/stock.service');

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
    }
}

module.exports = stockController;