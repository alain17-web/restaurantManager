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
    }
}
module.exports = purchaseItemService;
