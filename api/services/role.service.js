const createConnection = require('../database/database');

const roleService = {
    //CREATE
    addRole: async ({role_name}) => {
        const connection = await createConnection();
        try{
            const [existingRole] = await connection.execute('SELECT * FROM roles WHERE role_name = ?', [role_name]);

            if (existingRole.length > 0) {
                throw new Error('Ce rôle existe déjà');
            }
            const [result] = await connection.execute('INSERT INTO roles (role_name) VALUES (?)',[role_name]);

            return {id:result.insertId,role_name}

        } catch (error) {
            console.error('Erreur ajout role service')
            throw error;
        } finally{
            await connection.end();
        }
    }
}

module.exports = roleService;