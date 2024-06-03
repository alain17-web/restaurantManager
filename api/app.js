const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
