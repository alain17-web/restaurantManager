const express = require('express');
const employeeController = require('../controllers/employee.controller');

const router = express.Router();

router.post('/addEmployee', employeeController.addEmployee);
//router.post('/login', employeeController.login);

module.exports = router;