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
}

module.exports = stockService;