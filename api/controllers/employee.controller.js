const employeeService = require('../services/employee.service');
const addEmployeeValidator = require('../validators/employeeValidator');
const employeeValidator = require("../validators/employeeValidator");
require('dotenv').config();

//See comments in booking.controller to understand the logic on this controller called in the router
const employeeController = {
    addEmployee: async (req, res) => {
        try {
            const validationResult = await addEmployeeValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json({error: validationResult.error});
            }

            const {username, password, role_id, email, tel, status_id, roster_id,gender} = validationResult;
            const registrationResult = await employeeService.addEmployee({
                username,
                password,
                role_id,
                email,
                tel,
                status_id,
                roster_id,
                gender
            });

            res.status(200).json({message: "Employee created successfully", registrationResult});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Error addEmployee controller employé'});
        }
    },

    //READ
    getAllActiveEmployees: async (req, res) => {
        try {
            const employees = await employeeService.getAllActiveEmployees();
            res.status(200).json(employees);
        } catch (error) {
            console.error('Error getAllActiveEmployees controller', error);
            res.status(500).json({message: 'Error getAllActiveEmployees controller'});
        }
    },

    getAllInactiveEmployees: async (req, res) => {
        try {
            const employees = await employeeService.getAllInactiveEmployees();
            res.status(200).json(employees);
        } catch (error) {
            console.error('Error getAllInactiveEmployees controller', error);
            res.status(500).json({message: 'Error getAllInactiveEmployees controller'});
        }
    },

    //UPDATE
    updateEmployee: async (req, res) => {
        try {
            const validateEmployee = await employeeValidator.validate(req.body);

            const {username, password, role_id, email, tel, status_id, roster_id,gender} = validateEmployee;

            const updatedEmployee = await employeeService.updateEmployee(req.params.id, username, password, role_id, email, tel, status_id, roster_id,gender)

            if (updatedEmployee) {
                res.status(200).json({message: "Employee updated successfully."});
            } else {
                res.status(404).json({error: 'Employee not found or no change made'});
            }
        } catch (error) {
            console.error('Error updateEmployee controller', error)
            res.status(500).json({message: 'Error updateEmployee controller'});
        }
    },

    //DELETE
    deleteEmployee: async (req, res) => {
        try {
            const employeeId = req.params.id;

            const deletedEmployee = await employeeService.deleteEmployee(employeeId);

            if (deletedEmployee > 0) {
                res.status(200).json({message: "Employee deleted successfully."});
            } else {
                res.status(404).json({error: 'Employee not found'});
            }
        } catch (error) {
            console.error('Error deleteEmployee controller', error);
            res.status(500).json({message: 'Error deleteEmployee controller'});
        }
    }
}


module.exports = employeeController
