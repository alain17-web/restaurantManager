const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const createConnection = require('./database/database');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
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
