const createConnection = require('../database/database');

const orderItemService = {
    //CREATE
    addOrderItem: async ({order_id,type,name,price,validated,validatedBy}) => {
        const connection = await createConnection({})
        try{
           const [orderItem] = await connection.execute('INSERT INTO orderItems (order_id,type, name,price,validated,validatedBy) VALUES (?,?,?,?,?,?)',[order_id,type,name,price,validated,validatedBy]);

           return {order_item_id:orderItem.insertId,order_id,type,name,price,validated,validatedBy};
        } catch (error){
            console.error('Error in addOrderItem service',error)
            throw error;
        } finally {
            await connection.end()
        }
    },

    //READ
    getFirstUnvalidatedOrderItems: async () => {
        const connection = await createConnection({})
        try{
            const [firstUnvalidatedOrderItems] = await connection.execute(
                "SELECT * FROM orderItems WHERE validated = 'en attente' AND order_id = (SELECT MIN(order_id) FROM orderItems WHERE validated = 'en attente')"
            );
            return firstUnvalidatedOrderItems
        }catch(error){
            console.error('Error getting firstUnvalidatedOrderItems service', error)
            throw error;
        } finally {
            await connection.end()
        }
    },


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