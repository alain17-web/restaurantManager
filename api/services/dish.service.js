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
            const [dish] = await connection.execute('INSERT INTO dishes (name,\`desc\`,cat_id,allerg,price,cost,min,img) VALUES (?,?,?,?,?,?,?,?)',[name, desc, cat_id, allerg, price, cost, min, img])

            return {id:dish.insertId, name,desc,cat_id,allerg,price,cost,min,img};
        } catch(error){
            console.error('Error addDish service',error)
            throw error;
        } finally {
            await connection.end();
        }
    }
}
module.exports = dishService