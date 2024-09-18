// Import the database connection utility
const createConnection = require('../database/database');

// Import bcrypt for password hashing and comparison
const bcrypt = require('bcrypt');

// Import jsonwebtoken for token creation and verification
const jwt = require('jsonwebtoken');

// Destructure JWT secret and expiration time from environment variables
const {JWT_SECRET, JWT_EXPIRES_IN} = process.env

// Define the authService object that will hold the authentication logic
const authService = {
//LOGIN
    login: async ({username, password}) => {
        // Establish a connection to the database
        const connection = await createConnection();
        try {
            // Query the database to find an employee with the given username and active status (status_id = 1)
            const [rows] = await connection.execute(
                'SELECT * FROM employees WHERE username = ? AND status_id = 1',
                [username]
            );

            if (rows.length === 0) {
                throw new Error('Username or password is empty');
            }

            // Extract the employee record from the result
            const employee = rows[0];

            // Compare the provided password with the stored hashed password using bcrypt
            const passwordMatch = await bcrypt.compare(password, employee.password);

            if (!passwordMatch) {
                throw new Error('Invalid username or password');
            }

            // Define the payload to be included in the JWT token
            const payload = {
                employeeId: employee.id,
                username: employee.username,
                role_id: employee.role_id,
                gender: employee.gender
            }

            // Generate a JWT token using the payload, secret, and expiration time
            const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}
            );
            // Return the token and the employee object, excluding the password for security
            return {token, employee: {...employee, password: undefined}};
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            // Close the database connection when the process is complete
            await connection.end();
        }
    },

    //LOGOUT
    logout: async () => {
        // simply returns a message indicating the logout was successful..
        return {message: 'Logout successfull'}
    }

}


module.exports = authService
