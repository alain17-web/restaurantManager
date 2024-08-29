const createConnection = require('../database/database');

const stockService = {
    //CREATE IS IN MYSQL

    //READ
    getStock: async () => {
        const connection = await createConnection();
        try{
           const [stock] = await connection.query(`SELECT * FROM stock`);
           return stock;
        }catch(error){
            console.error('Error getting stock service',error)
            throw error;
        }finally {
            await connection.end();
        }
    },

    //UPDATE
    updateStock: async (item_name,quantity) => {
        const connection = await createConnection();
        try{
            const [updatedQty] = await connection.execute('UPDATE stock set quantity = quantity + ? WHERE item_name = ?', [quantity,item_name]);
            return updatedQty.affectedRows > 0;
        }catch(error){
            console.error('Error updateStock service',error)
            throw error;
        }finally {
            await connection.end();
        }
    }
}

module.exports = stockService;