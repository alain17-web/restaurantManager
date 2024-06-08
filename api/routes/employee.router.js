const express = require('express');
const employeeController = require('../controllers/employee.controller');
const {authenticate, authorize} = require("../middlewares/authenticate");

const router = express.Router();

router.post('/addEmployee',authenticate,authorize([1]), employeeController.addEmployee);


module.exports = router;