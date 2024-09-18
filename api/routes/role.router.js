//See comments in booking.router to understand the router
const roleRouter = require("express").Router();
const roleController = require('../controllers/role.controller');
const { authenticate,authorize } = require('../middlewares/authenticate');

roleRouter.route("/addRole")
    .post(authenticate, authorize([1]), roleController.addRole)

roleRouter.route("/")
    .get(authenticate,authorize([1,10]),roleController.getAllRoles)

roleRouter.route("/:id")
    .get(authenticate,authorize([1,10]),roleController.getRoleById)

roleRouter.route("/:id")
    .patch(authenticate,authorize([1]),roleController.updateRole)

roleRouter.route("/:id")
    .delete(authenticate,authorize([1]),roleController.deleteRole)

module.exports = roleRouter;

