const createConnection = require('../database/database');

const purchaseItemService = {
    //CREATE
    addOrderItem: async ({purchase_id,name,type,cost,qty,delivery_date}) => {
        const connection = await createConnection({})
        try{
            const [purchaseItem] = await connection.execute('INSERT INTO purchaseItems (purchase_id,name,type,cost,qty,delivery_date) VALUES (?,?,?,?,?,?)',[purchase_id,name,type,cost,qty,delivery_date]);
            return {id:purchaseItem.insertId,purchase_id,name,type,cost,qty,delivery_date};
        }catch(error){
            console.error('Error in addPurchaseItem service',error)
            throw error;
        }finally {
            await connection.end()
        }
    },

    //READ
    getPurchaseItemByPurchaseId: async (purchase_id) => {
        const connection = await createConnection({})
        try{
           const [purchaseItem] = await connection.execute('SELECT * FROM purchaseItems WHERE purchase_id=?',[purchase_id])
            return purchaseItem
        }catch(error){
            console.error('Error getPurchaseItemByPurchaseId service',error)
            throw error;
        }finally {
            await connection.end()
        }
    },

    //UPDATE
    updateDeliveryDate: async (id,purchase_id,delivery_date) => {
        if (id=== undefined || purchase_id === undefined || delivery_date === undefined ) {
            throw new Error('One or more parameters are undefined');
        }
        const connection = await createConnection({})
        try{
            const [updatedDelDate] = await connection.execute('UPDATE purchaseItems SET delivery_date = ? WHERE id = ? AND purchase_id=?',[delivery_date,purchase_id,id]);

            return updatedDelDate.affectedRows > 0;
        }catch(error){
            console.error('Error updateDeliveryDate service',error)
            throw error;
        }finally {
            await connection.end()
        }

    },

    updateQtyByIdAndPurchaseId: async (purchase_id, id, qty) => {
        if (purchase_id === undefined || id === undefined || qty === undefined ){
            throw new Error('One or more parameters are undefined in the service');
        }

        const connection = await createConnection({})
        try{
            const [rows] = await connection.execute('SELECT * FROM purchaseItems WHERE id = ? AND purchase_id = ?', [id, purchase_id]);
            if (rows.length > 0) {
                const [updatedQty] = await connection.execute('UPDATE purchaseItems SET qty = ? WHERE id=? AND purchase_id=?',[qty,id,purchase_id]);
                return updatedQty.affectedRows > 0;
            }

        }catch(error){
            console.error('Error updateQtyByPurchaseId service',error)
            throw error;
        }finally {
            await connection.end()
        }
    },

    //DELETE
    deletePurchaseItem: async (purchase_id) => {
        const connection = await createConnection({})
        try{
            const [deletedItem] = await connection.execute('DELETE FROM purchaseItems WHERE purchase_id=?', [purchase_id])
            return deletedItem.affectedRows > 0;
        }catch(error){
            console.error('Error deletePurchaseItem service',error)
            throw error;
        }finally {
            await connection.end()
        }
    }
}
module.exports = purchaseItemService;
