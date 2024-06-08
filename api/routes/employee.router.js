const employeeRouter = require("express").Router();
const employeeController = require('../controllers/employee.controller');
const {authenticate, authorize} = require("../middlewares/authenticate");

employeeRouter.route("/addEmployee")
    .post(authenticate,authorize([1]), employeeController.addEmployee);


module.exports = employeeRouter;