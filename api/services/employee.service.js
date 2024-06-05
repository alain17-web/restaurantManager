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
const addEmployee = async ({ username, password, role, email, tel, status, roster }) => {
    const connection = await createConnection();
    try {
        // Check if the username already exists
        const [existingUser] = await connection.execute(
            'SELECT * FROM employees WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            throw new Error('Cet identifiant existe déjà');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new employee into the database
        const [result] = await connection.execute(
            'INSERT INTO employees (username, password, role, email, tel, status, roster) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, role, email, tel, status, roster]
        );

        return { id: result.insertId, username, role, email, tel, status, roster };
    } catch (error) {
        console.error('Erreur ajout employé:', error);
        throw error;
    } finally {
        await connection.end();
    }
};

module.exports = {
    addEmployee,
};


