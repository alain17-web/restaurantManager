const createConnection = require('../database/database');

const orderService = {
    //CREATE
    addOrder: async ({people,username, order_date, total, validated, validatedBy}) => {
        const connection = await createConnection({})
        try {
            const [order] = await connection.execute('INSERT INTO orders (people,username,order_date,total,validated,validatedBy) VALUES (?,?,?,?,?,?)', [people,username, order_date, total, validated, validatedBy]);

            return {order_id:order.insertId,people,username,order_date,total,validated,validatedBy}
        } catch (error) {
            console.error('Error addOrder service', error)
            throw error;
        } finally {
            await connection.end()
        }
    },

    //READ
    getAllOrders: async () => {
        const connection = await createConnection({})
        try{
            const [orders] = await connection.execute('SELECT * FROM orders ORDER BY order_id DESC');
            return orders
        } catch(error){
            console.error('Error getAllOrders service', error)
            throw error;
        } finally {
            await connection.end()
        }
    },


    //UPDATE
    updateOrder: async (order_id, validated, validatedBy) => {
        if (order_id === undefined || validated === undefined || validatedBy === undefined) {
            throw new Error('One or more parameters are undefined');
        }
        const connection = await createConnection({})
        try{
           const [updatedOrder] = await connection.execute('UPDATE orders SET validated = ?, validatedBy = ? WHERE order_id = ?', [ validated, validatedBy,order_id]);
           return updatedOrder.affectedRows > 0;
        } catch(error){
            console.error('Error updateOrder service', error)
            throw error;
        } finally {
            await connection.end()
        }
    },



    //DELETE
    deleteOrder: async (order_id) => {
        const connection = await createConnection({})
        try{
            const [result] = await connection.execute('DELETE FROM orders WHERE order_id = ?', [order_id]);
            return result.affectedRows > 0;
        } catch(error){
            console.error('Error deleteOrder service', error)
            throw error;
        } finally {
            await connection.end()
        }
    }

}
module.exports = orderService;