// Import the mysql2 library's promise-based API for working with MySQL databases
const mysql = require('mysql2/promise');

// Load environment variables from the .env file (such as database credentials)
require('dotenv').config();

// Destructure the environment variables for the database connection details
const { DB_HOST, DB_USER, DB_PWD, DB_NAME, DB_PORT } = process.env;

// Function to create a connection to the MySQL database
async function createConnection() {
    try {
        // Create a connection to the MySQL database using the credentials from environment variables
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PWD,
            database: DB_NAME,
            port: DB_PORT,
            decimalNumbers: true, // Ensure decimal numbers are handled properly (without precision loss)
            connectTimeout: 10000 // Connection timeout of 10 seconds (1000 ms)
        });
        console.log('Database connection successful');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = createConnection;

