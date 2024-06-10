const rosterRouter = require("express").Router();
const rosterController = require("../controllers/roster.controller");
const { authenticate,authorize } = require('../middlewares/authenticate');


rosterRouter.route("/addRoster")
    .post(authenticate, authorize([1]), rosterController.addRoster)

rosterRouter.route("/")
    .get(authenticate,authorize([1]), rosterController.getAllRosters)

rosterRouter.route("/:id")
    .patch(authenticate,authorize([1]),rosterController.updateRoster)

module.exports = rosterRouter;