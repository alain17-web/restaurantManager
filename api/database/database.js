const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PWD, DB_NAME, DB_PORT } = process.env;

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PWD,
            database: DB_NAME,
            port: DB_PORT,
        });
        console.log('Database connection successful');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = createConnection;

