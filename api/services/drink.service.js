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
    }
}
module.exports = drinkService;