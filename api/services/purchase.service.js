const createConnection = require('../database/database');

const purchaseService = {
    //CREATE
    addPurchase: async ({purchase_date, totalPurchase, delivery_date}) => {
        const connection = await createConnection({})
        try{
            const [purchase] = await connection.execute('INSERT into purchases (purchase_date,totalPurchase,delivery_date)VALUES (?,?,?)',[purchase_date,totalPurchase,delivery_date]);

            return {purchase_id:purchase.insertId,purchase_date,totalPurchase,delivery_date}
        }catch(error){
            console.error('Error addPurchase service',error);
            throw error;
        }finally {
            await connection.end()
        }
    },

    //READ
    getAllUndeliveredPurchases: async () => {
        const connection = await createConnection({})
        try{
            const [purchases] = await connection.execute('SELECT * FROM purchases WHERE delivery_date = "en attente" ORDER BY purchase_id DESC')
            return purchases
        }catch(error){
            console.error('Error in getAllPurchases service', error)
            throw error;
        }finally {
            await connection.end()
        }
    },

    getAllDeliveredPurchases: async () => {
        const connection = await createConnection({})
        try{
            const [purchases] = await connection.execute('SELECT * FROM purchases WHERE delivery_date != "en attente" ORDER BY purchase_id DESC')
            return purchases
        }catch(error){
            console.error('Error in getAllDeliveredPurchases service',error);
            throw error;
        }finally {
            await connection.end()
        }
    },

    getLastDeliveredPurchaseId: async () => {
        const connection = await createConnection({})
        try{
            const [rows] = await connection.execute('SELECT MAX(purchase_id) AS purchase_id FROM purchases WHERE delivery_date != "en attente"')
            const purchaseId = rows[0]?.purchase_id || null
            return purchaseId
        }catch(error){
            console.error('Error getLastDeliveredPurchaseId service',error)
            throw error;
        }finally{
            await connection.end()
        }
    },

    //UPDATE
    updateTotalPurchase: async (purchase_id,totalPurchase) => {
        if (!purchase_id || totalPurchase === undefined ) {
            throw new Error('One or more parameters are undefined')
        }
        const connection = await createConnection({})
        try{
            const [updatedPurchase] = await connection.execute('UPDATE purchases SET totalPurchase = ? WHERE purchase_id = ?',[totalPurchase,purchase_id]);

            return updatedPurchase.affectedRows > 0;

        }catch(error){
            console.error('Error updateTotalPurchase service',error);
            throw error;
        }finally {
            await connection.end()
        }
    },

    updateDelDate: async (purchase_id,delivery_date) => {
        if (!purchase_id || delivery_date === undefined ) {
            throw new Error('One or more parameters are undefined')
        }
        const connection = await createConnection({})
        try{
            const [updatedDelDate] = await connection.execute('UPDATE purchases SET delivery_date = ? WHERE purchase_id = ?',[delivery_date,purchase_id]);

            return updatedDelDate.affectedRows > 0;

        }catch(error){
            console.error('Error updateDelDate service',error);
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