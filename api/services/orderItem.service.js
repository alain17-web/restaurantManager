const createConnection = require('../database/database');

const orderItemService = {
    //CREATE
    addOrderItem: async ({order_id,type,name,price}) => {
        const connection = await createConnection({})
        try{
           const [orderItem] = await connection.execute('INSERT INTO orderItems (order_id,type, name,price) VALUES (?,?,?,?)',[order_id,type,name,price]);

           return {order_item_id:orderItem.insertId,order_id,type,name,price}
        } catch (error){
            console.error('Error in addOrderItem service',error)
            throw error;
        } finally {
            await connection.end()
        }
    },

    //READ
    getOrderItemByOrderId: async (order_id) => {
        const connection = await createConnection({})
        try{
            const [orderItemsById] = await connection.execute('SELECT * FROM orderItems WHERE order_id = ?', [order_id]);
            return orderItemsById;
        } catch(error){
            console.error('Error in getOrderItemByOrderId service', error)
            throw error;
        } finally {
            await connection.end()
        }
    }
}
module.exports = orderItemService;