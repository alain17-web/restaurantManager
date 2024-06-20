const createConnection = require('../database/database');

const dishService = {
    //CREATE
    addDish: async ({ name,desc,cat_id,allerg,price,cost,min,img}) => {
        const connection = await createConnection({})
        try{
            const [existingDish] = await connection.execute('SELECT * FROM dishes WHERE name=?', [name]);
            if(existingDish.length > 0){
                throw new Error('This dish already exists');
            }
            const [dish] = await connection.execute('INSERT INTO dishes (name,`desc`,cat_id,allerg,price,cost,min,img) VALUES (?,?,?,?,?,?,?,?)',[name, desc, cat_id, allerg, price, cost, min, img])

            return {id:dish.insertId, name,desc,cat_id,allerg,price,cost,min,img};
        } catch(error){
            console.error('Error addDish service',error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    getAllDishes: async () => {
        const connection = await createConnection();
        try{
            const  [dishes] = await connection.execute('SELECT * FROM dishes ORDER BY cat_id ASC');
            return dishes;
        } catch(error){
            console.error('Error getAllDishes service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    getDishById : async (id) => {
        const connection = await createConnection();
        try {
            const [dishes] = await connection.execute('SELECT * FROM dishes WHERE id = ?', [id]);
            return dishes[0];
        } catch (error) {
            console.error('Error getDishById service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //UPDATE
    updateDish: async (id,name,desc,cat_id,allerg,price,cost,min,img) => {
        const connection = await createConnection();
        try{
            const [updatedDish] = await connection.execute('UPDATE dishes SET name = ?, `desc` = ?, cat_id= ?, allerg = ?, price = ?, cost = ?, min = ?, img = ? WHERE id = ? ',[name, desc,cat_id,allerg,price,cost,min,img,id]);

            return updatedDish.affectedRows > 0;
        } catch(error){
            console.error('Error updateDish service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //DELETE
    deleteDish: async (id) => {
        const connection = await createConnection();
        try{
            const [result] = await connection.execute('DELETE FROM dishes WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch(error){
            console.error('Error deleteDish service', error);
            throw error;
        } finally {
            await connection.end();
        }
    }
}
module.exports = dishService