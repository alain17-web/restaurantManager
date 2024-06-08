const roleRouter = require("express").Router();
const roleController = require('../controllers/role.controller');
const { authenticate,authorize } = require('../middlewares/authenticate');

roleRouter.route("/addRole")
    .post(authenticate, authorize([1]), roleController.addRole)

roleRouter.route("/")
    .get(authenticate,authorize([1]),roleController.getAllRoles)

module.exports = roleRouter;

