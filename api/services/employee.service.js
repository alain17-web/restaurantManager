const createConnection = require('../database/database');
const bcrypt = require('bcrypt');
const salt = 10;


//GET
async function getEmployees() {
    const connection = await createConnection();
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM employees');
        return rows;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

//CREATE - REGISTER
const addEmployee = async ({ username, password, role_id, email, tel, status_id, roster_id }) => {
    const connection = await createConnection();
    try {

        const [existingUser] = await connection.execute(
            'SELECT * FROM employees WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            throw new Error('Cet identifiant existe déjà');
        }


        const hashedPassword = await bcrypt.hash(password, salt);


        const [result] = await connection.execute(
            `INSERT INTO employees (username, password, role_id, email, tel, status_id, roster_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [username, hashedPassword, role_id, email, tel, status_id, roster_id]
        );

        return { id: result.insertId, username, role_id, email, tel, status_id, roster_id };
    } catch (error) {
        console.error('Erreur ajout service employé:', error);
        throw error;
    } finally {
        await connection.end();
    }
};

module.exports = {
    addEmployee,
};


