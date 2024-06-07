const createConnection = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRES_IN} = process.env

const authService = {
//LOGIN
    login: async ({username, password}) => {
        const connection = await createConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM employees WHERE username = ? AND status_id = 1',
                [username]
            );

            if (rows.length === 0) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }

            const employee = rows[0];

            const passwordMatch = await bcrypt.compare(password, employee.password);

            if (!passwordMatch) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }

            const payload = {
                employeeId: employee.id,
                username: employee.username,
                role_id: employee.role_id,
            }

            const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}
            );
            return {token, employee: {...employee, password: undefined}};
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //LOGOUT
    logout: async () => {
        return {message: 'Déconnexion réussie'}
    }

}


module.exports = authService
