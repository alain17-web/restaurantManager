const createConnection = require('../database/database');

const purchaseItemService = {
    //CREATE
    addOrderItem: async ({purchase_id,name,type,cost}) => {
        const connection = await createConnection({})
        try{
            const [purchaseItem] = await connection.execute('INSERT INTO purchaseItems (purchase_id,name,type,cost) VALUES (?,?,?,?)',[purchase_id,name,type,cost]);
            return {id:purchaseItem.insertId,purchase_id,name,type,cost};
        }catch(error){
            console.error('Error in addPurchaseItem service',error)
            throw error;
        }finally {
            await connection.end()
        }
    }
}
module.exports = purchaseItemService;
