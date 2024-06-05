const employeeService = require('../services/employee.service');
const addEmployeeValidator = require('../validators/employeeValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addEmployee = async (req, res) => {
    try {
        const validationResult = await addEmployeeValidator.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error });
        }

        const { username, password, role, email, tel, status, roster } = validationResult;
        const registrationResult = await employeeService.addEmployee({ username, password, role, email, tel, status, roster });

        res.status(201).json({ message: "L'employé a bien été créé", registrationResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur création employé' });
    }
};

/*const login = async (req, res) => {
    const { username, password } = req.body;
    const connection = await createConnection();
    try {
        const [user] = await connection.execute('SELECT * FROM employees WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    } finally {
        await connection.end();
    }
};*/

module.exports = {
    addEmployee,
    // login,
};
