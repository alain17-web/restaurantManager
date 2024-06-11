const employeeRouter = require("express").Router();
const employeeController = require('../controllers/employee.controller');
const {authenticate, authorize} = require("../middlewares/authenticate");


employeeRouter.route("/addEmployee")
    .post(authenticate,authorize([1]), employeeController.addEmployee);

employeeRouter.route("/")
    .get(authenticate,authorize([1]),employeeController.getAllemployees)

employeeRouter.route("/:id")
    .patch(authenticate,authorize([1]),employeeController.updateEmployee)

employeeRouter.route("/:id")
    .delete(authenticate,authorize([1]),employeeController.deleteEmployee);


module.exports = employeeRouter;