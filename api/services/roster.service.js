const createConnection = require('../database/database');

const rosterService = {
    //CREATE
    addRoster: async ({roster}) => {
        const connection = await createConnection();
        try{
           const [existingRoster] = await connection.execute(`SELECT * FROM rosters WHERE roster = ?`, [roster]);

           if (existingRoster.length > 0) {
               throw new Error('This roster already exists');
           }
           const [result] = await connection.execute('INSERT INTO rosters (roster) VALUES (?)', [roster]);

           return {id: result.insertId, roster}

        } catch(error){
            console.error('Error addRoster service',error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    getAllRosters: async () => {
        const connection = await createConnection();
        try{
           const [existingRosters] = await connection.execute('SELECT * FROM rosters ORDER BY id ASC');
               return existingRosters;
        } catch(error){
            console.error('Error getAllRosters service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //UPDATE
    updateRoster: async (id,roster) => {
        const connection = await createConnection();
        try{
           const [updatedRoster] = await connection.execute('UPDATE rosters SET roster = ? WHERE id = ?', [roster,id]);
           return updatedRoster.affectedRows > 0;
        } catch(error){
            console.error('Error updateRoster service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //DELETE
    deleteRoster: async (id) => {
        const connection = await createConnection();
        try{
            const [result] = await connection.execute('DELETE FROM rosters WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch(error){
            console.error('Error deleteRoster service', error);
            throw error;
        } finally {
            await connection.end();
        }
    }
}

module.exports = rosterService;