const createConnection = require('../database/database');

const roleService = {
    //CREATE
    addRole: async ({role_name}) => {
        const connection = await createConnection();
        try {
            const [existingRole] = await connection.execute('SELECT * FROM roles WHERE role_name = ?', [role_name]);

            if (existingRole.length > 0) {
                throw new Error('Ce rôle existe déjà');
            }
            const [result] = await connection.execute('INSERT INTO roles (role_name) VALUES (?)', [role_name]);

            return {id: result.insertId, role_name}

        } catch (error) {
            console.error('Erreur ajout role service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    getAllRoles: async () => {
        const connection = await createConnection();
        try {
            const [existingRoles] = await connection.execute('SELECT * FROM roles');
            return existingRoles;
        } catch (error) {
            console.error('Erreur getAllRoles service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    getRoleById: async (id) => {
        const connection = await createConnection();
        try {
            const [role] = await connection.execute('SELECT * FROM roles WHERE id = ?', [id]);
            return role
        } catch (error) {
            console.error('Erreur getRoleById service', error)
            throw error;
        } finally {
            await connection.end();
        }
    }
}

module.exports = roleService;