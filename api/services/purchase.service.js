const createConnection = require('../database/database');

const purchaseService = {
    //CREATE
    addPurchase: async ({purchase_date, total, delivery_date}) => {
        const connection = await createConnection({})
        try{
            const [purchase] = await connection.execute('INSERT into purchases (purchase_date,total,delivery_date)VALUES (?,?,?)',[purchase_date,total,delivery_date]);

            return {purchase_id:purchase.insertId,purchase_date,total,delivery_date}
        }catch(error){
            console.error('Error addPurchase service',error);
            throw error;
        }finally {
            await connection.end()
        }
    },

    //READ
    getAllPurchases: async () => {
        const connection = await createConnection({})
        try{
            const [purchases] = await connection.execute('SELECT * FROM purchases ORDER BY purchase_id DESC')
            return purchases
        }catch(error){
            console.error('Error in getAllPurchases service', error)
            throw error;
        }finally {
            await connection.end()
        }
    },

    //UPDATE
    updatePurchase: async (purchase_id,total,delivery_date) => {
        if (!purchase_id || total === undefined || delivery_date === undefined) {
            throw new Error('One or more parameters are undefined')
        }
        const connection = await createConnection({})
        try{
            const [updatedPurchase] = await connection.execute('UPDATE purchases SET total = ?, delivery_date = ? WHERE purchase_id = ?',[total,delivery_date,purchase_id]);

            return updatedPurchase.affectedRows > 0;

        }catch(error){
            console.error('Error updatePurchase service',error);
            throw error;
        }finally {
            await connection.end()
        }
    },

    //DELETE
    deletePurchase: async (purchase_id) => {
        const connection = await createConnection({})
        try{
           const [deletedOrder] = await connection.execute('DELETE FROM purchases WHERE purchase_id = ?', [purchase_id]);
           return deletedOrder.affectedRows > 0;
        }catch(error){
            console.error('Error deletePurchase service',error);
            throw error;
        }finally {
            await connection.end()
        }
    }

}

module.exports = purchaseService;