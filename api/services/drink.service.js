const createConnection = require('../database/database');

const drinkService = {
    //CREATE
    addDrink: async ({name,cat_id,price,cost,min}) => {
        const connection = await createConnection({})
        try{
            const [existingDrink] = await connection.execute('SELECT * FROM drinks WHERE name = ?',[name]);

            if(existingDrink.length > 0){
                throw new Error('This drink already exists');
            }
            const [drink] = await connection.execute('INSERT INTO drinks (name,cat_id,price,cost,min) VALUES (?,?,?,?,?)',[name,cat_id,price,cost,min]);

            return {id:drink.insertId, name,cat_id,price,cost,min};

        } catch(error){
            console.error('Error addDrink service',error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    getAllDrinks: async () => {
        const connection = await createConnection();
        try{
           const  [drinks] = await connection.execute('SELECT * FROM drinks ORDER BY cat_id ASC');
           return drinks;
        } catch(error){
            console.error('Error getAllDrinks service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //UPDATE
    updateDrink: async (id, name, cat_id,price,cost,min) => {
        const connection = await createConnection();
        try{
            const [updatedDrink] = await connection.execute('UPDATE drinks SET name = ?, cat_id = ?, price = ?, cost = ?, min = ? WHERE id = ?',[name,cat_id,price,cost,min,id]);
            return updatedDrink.affectedRows > 0;
        } catch (error){
            console.error('Error updateDrink service', error.message);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //DELETE
    deleteDrink: async (id) => {
        const connection = await createConnection();
        try{
            const [result] = await connection.execute('DELETE FROM drinks WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch(error){
            console.error('Error deleteDrink service', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

}
module.exports = drinkService;