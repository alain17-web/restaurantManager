//See comments on booking.service to understand this file called in controller
const createConnection = require('../database/database');
const salt = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRES_IN} = process.env


const employeeService = {
    //CREATE - REGISTER
    addEmployee: async ({username, password, role_id, email, tel, status_id, roster_id,gender}) => {
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
                `INSERT INTO employees (username, password, role_id, email, tel, status_id, roster_id,gender) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [username, hashedPassword, role_id, email, tel, status_id, roster_id,gender]
            );

            return {id: result.insertId, username, role_id, email, tel, status_id, roster_id,gender};
        } catch (error) {
            console.error('Error addEmployee service:', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    getAllActiveEmployees: async () => {
        const connection = await createConnection();

        try{
            const [employees] = await connection.execute('SELECT * FROM employees WHERE status_id = 1 ORDER BY role_id ASC');
            return employees;
        } catch(error){
            console.error('Error getAllActiveEmployees service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },
    getAllInactiveEmployees: async () => {
        const connection = await createConnection();

        try{
            const [employees] = await connection.execute('SELECT * FROM employees WHERE status_id = 2');
            return employees;
        } catch(error){
            console.error('Error getAllInactiveEmployees service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //UPDATE
    updateEmployee: async (id,username, password, role_id,email, tel, status_id, roster_id,gender) => {
        const connection = await createConnection();

        try{
            const newHashedPassword = await bcrypt.hash(password, salt);

            const [updatedEmployee] = await connection.execute('UPDATE employees SET username = ?, password = ?, role_id = ?, email = ?, tel = ?, status_id = ?, roster_id = ?, gender = ?  WHERE id = ?', [username, newHashedPassword, role_id,email, tel, status_id, roster_id,gender,id]);

            return updatedEmployee.affectedRows > 0;
        } catch(error){
            console.error('Error updateEmployee service:', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //DELETE
    deleteEmployee: async (id) => {
        const connection = await createConnection();

        try{
            const [result] = await connection.execute('DELETE FROM employees WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error){
            console.error('Error deleteEmployee service', error);
            throw error;
        } finally {
            await connection.end();
        }
    }


}
module.exports = employeeService


