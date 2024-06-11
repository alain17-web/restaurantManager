const createConnection = require('../database/database');

const categoryService = {
    //CREATE
    addCategory: async ({cat_name,type}) => {
        const connection = await createConnection({})
        try{
            const [existingCategory] = await connection.execute('SELECT * FROM categories WHERE cat_name = ?', [cat_name]);

            if(existingCategory.length > 0){
                throw new Error('This category already exists');
            }
            const [result] = await connection.execute('INSERT INTO categories (cat_name,type) VALUES (?,?)', [cat_name,type]);
            return {id: result.insertId, cat_name,type}
        } catch(error){
            console.error('Error addCategory service',error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    getAllCategories: async () => {
        const connection = await createConnection();
        try{
            const [categories] = await connection.execute('SELECT * FROM categories ORDER BY id ASC');
            return categories;
        } catch(error){
            console.error('Error getAllCategories service', error)
            throw error;
        } finally {
            await connection.end();
        }
    }
}
module.exports = categoryService;