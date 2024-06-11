const employeeRouter = require("express").Router();
const employeeController = require('../controllers/employee.controller');
const {authenticate, authorize} = require("../middlewares/authenticate");
const bookingController = require("../controllers/booking.controller");

employeeRouter.route("/addEmployee")
    .post(authenticate,authorize([1]), employeeController.addEmployee);

employeeRouter.route("/")
    .get(authenticate,authorize([1]),employeeController.getAllemployees)

employeeRouter.route("/:id")
    .patch(authenticate,authorize([1]),employeeController.updateEmployee)


module.exports = employeeRouter;