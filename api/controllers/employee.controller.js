const employeeService = require('../services/employee.service');
const addEmployeeValidator = require('../validators/employeeValidator');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
require('dotenv').config();

const employeeController = {
    addEmployee: async (req, res) => {
        try {
            const validationResult = await addEmployeeValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json({error: validationResult.error});
            }

            const {username, password, role_id, email, tel, status_id, roster_id} = validationResult;
            const registrationResult = await employeeService.addEmployee({
                username,
                password,
                role_id,
                email,
                tel,
                status_id,
                roster_id
            });

            res.status(201).json({message: "Employee created successfully", registrationResult});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Error addEmployee controller employé'});
        }
    },

    //READ
    getAllemployees: async (req, res) => {
        try{
            const employees = await employeeService.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            console.error('Error getAllRoles controller',error);
            res.status(500).json({message: 'Error getAllRoles controller'});
        }
    }



}


module.exports = employeeController
