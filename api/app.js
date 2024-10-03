// Import required modules
const express = require('express'); // Express framework for creating the web server
const cors = require('cors'); // CORS middleware to enable Cross-Origin Resource Sharing
const router = require('./routes/router'); // Custom router to handle API routes
const createConnection = require('./database/database'); // Function to establish a database connection
require('dotenv').config(); // Loads environment variables from a .env file
const cookieParser = require('cookie-parser'); // Middleware to parse cookies
const path = require('path'); // Built-in Node.js module to handle file paths

// Define the port number from environment variables
const PORT = process.env.PORT;

// Initialize the Express app
const app = express();

// Define allowed origins for CORS
const allowedOrigins = ['http://localhost:5173']; // Frontend URL is allowed to access the server

// Use CORS middleware with custom configuration
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests from allowed origins or if no origin is provided (like server-to-server calls)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            // Block requests from disallowed origins
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies to be included in requests
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'] // Allowed HTTP methods
}));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Serve static files from the 'uploads/img' directory
app.use('/uploads/img', express.static(path.join(__dirname, 'uploads/img')));

// Use the router for handling API routes, prefixed with '/api'
app.use('/api', router);

// Define a simple route for the root URL ('/')
app.get('/', (req, res) => {
    res.send('RestoManager');
});

// Establish a connection to the database
createConnection()
    .then(() => {
        // If the connection is successful, start the server on the defined port
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });
