const createConnection = require('../database/database');

const purchaseService = {
    //CREATE
    addPurchase: async ({purchase_date, total, delivery_date}) => {
        const connection = await createConnection({})
        try{
            const [purchase] = await connection.execute('INSERT into purchases (purchase_date,total,delivery_date)VALUES (?,?,?)',[purchase_date,total,delivery_date]);

            return {id:purchase.insertId,purchase_date,total,delivery_date}
        }catch(error){
            console.error('Error addPurchase service',error);
            throw error;
        }finally {
            await connection.end()
        }
    }
}

module.exports = purchaseService;