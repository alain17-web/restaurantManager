const categoryRouter = require("express").Router();
const categoryController = require("../controllers/category.controller");
const { authenticate, authorize } = require('../middlewares/authenticate');

categoryRouter.route("/addCategory")
    .post(authenticate, authorize([1]), categoryController.addCategory)

categoryRouter.route("/")
    .get(authenticate,authorize([1]),categoryController.getAllCategories)

categoryRouter.route("/:id")
    .patch(authenticate,authorize([1]),categoryController.updateCategory)

module.exports = categoryRouter;