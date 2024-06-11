const categoryRouter = require("express").Router();
const categoryController = require("../controllers/category.controller");
const { authenticate, authorize } = require('../middlewares/authenticate');

categoryRouter.route("/addCategory")
    .post(authenticate, authorize([1]), categoryController.addCategory)


module.exports = categoryRouter;