const roleRouter = require("express").Router();
const roleController = require('../controllers/role.controller');
const { authenticate,authorize } = require('../middlewares/authenticate');

roleRouter.route("/addRole")
    .post(authenticate, authorize([1]), roleController.addRole)

module.exports = roleRouter;

