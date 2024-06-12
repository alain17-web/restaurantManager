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
            const [categories] = await connection.execute('SELECT * FROM categories ORDER BY type ASC');
            return categories;
        } catch(error){
            console.error('Error getAllCategories service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //UPDATE
    updateCategory: async (id, cat_name, type) => {
        const connection = await createConnection({})
        try{
            const [updatedCat] = await connection.execute('UPDATE categories SET cat_name = ?,type= ?  WHERE id = ?', [cat_name,type, id]);
            return updatedCat.affectedRows > 0;
        }catch (error){
            console.error('Error updating category service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //DELETE
    deleteCategory: async (id) => {
        const connection = await createConnection();
        try{
            const [result] = await connection.execute('DELETE FROM categories WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch(error){
            console.error('Error deleting category service', error)
            throw error;
        } finally {
            await connection.end();
        }
    }
}
module.exports = categoryService;