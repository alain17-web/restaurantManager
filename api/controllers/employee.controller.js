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

            res.status(201).json({message: "L'employé a bien été créé", registrationResult});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Erreur création controller employé'});
        }
    },


    /*login: async (req, res) => {
        try {
            await authValidator.validate(req.body); // Validate the request body

            const {username, password} = req.body;
            const {token, employee} = await loginEmployee({username, password});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });

            res.json({message: 'Login successful', employee});
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({message: error.message});
            }
            res.status(401).json({message: error.message});
        }
    }*/
}


module.exports = employeeController
