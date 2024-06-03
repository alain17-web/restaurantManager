const express = require('express');
const employeeRouter = require('./employee.router');

const router = express.Router();

router.use('/employees', employeeRouter);

module.exports = router;