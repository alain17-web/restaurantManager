const createConnection = require('../database/database');
const salt = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRES_IN} = process.env


const employeeService = {
//CREATE - REGISTER
    addEmployee: async ({username, password, role_id, email, tel, status_id, roster_id}) => {
        const connection = await createConnection();
        try {

            const [existingUser] = await connection.execute(
                'SELECT * FROM employees WHERE username = ?',
                [username]
            );

            if (existingUser.length > 0) {
                throw new Error('This username is already in use');
            }

            const hashedPassword = await bcrypt.hash(password, salt);

            const [result] = await connection.execute(
                `INSERT INTO employees (username, password, role_id, email, tel, status_id, roster_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [username, hashedPassword, role_id, email, tel, status_id, roster_id]
            );

            return {id: result.insertId, username, role_id, email, tel, status_id, roster_id};
        } catch (error) {
            console.error('Error addEmployee service:', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

//READ

}
module.exports = employeeService


