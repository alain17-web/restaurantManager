const createConnection = require('../database/database');

const roleService = {
    //CREATE
    addRole: async ({role_name}) => {
        const connection = await createConnection();
        try {
            const [existingRole] = await connection.execute('SELECT * FROM roles WHERE role_name = ?', [role_name]);

            if (existingRole.length > 0) {
                throw new Error('This role already exists');
            }
            const [result] = await connection.execute('INSERT INTO roles (role_name) VALUES (?)', [role_name]);

            return {id: result.insertId, role_name}

        } catch (error) {
            console.error('Error addRole service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    getAllRoles: async () => {
        const connection = await createConnection();
        try {
            const [existingRoles] = await connection.execute('SELECT * FROM roles ORDER BY id ASC');
            return existingRoles;
        } catch (error) {
            console.error('Error getAllRoles service', error)
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
            console.error('Error getRoleById service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //UPDATE
    updateRole: async (id,role_name) => {
        const connection = await createConnection();
        try{
            const [updatedRole] = await connection.execute('UPDATE roles SET role_name = ? WHERE id = ?', [role_name,id]);
            return updatedRole.affectedRows > 0;
        } catch (error){
            console.error('Error updateRole service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    //DELETE
    deleteRole: async (id) => {
        const connection = await createConnection();
        try{
            const [result] = await connection.execute('DELETE FROM roles WHERE id = ?', [id]);
            return result.affectedRows;
        } catch  (error){
            console.error('Error deleteRole service', error)
            throw error;
        } finally {
            await connection.end();
        }
    }
}

module.exports = roleService;