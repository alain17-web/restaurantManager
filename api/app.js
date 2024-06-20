const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const createConnection = require('./database/database');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path')


const PORT = process.env.PORT;

const app = express();

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: (origin,callback) => {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/uploads', express.static(path.join(__dirname, 'api/uploads')));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World');
});

createConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });
