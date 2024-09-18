//See comments in booking.router to understand this router
const categoryRouter = require("express").Router();
const categoryController = require("../controllers/category.controller");
const { authenticate, authorize } = require('../middlewares/authenticate');

categoryRouter.route("/addCategory")
    .post(authenticate, authorize([1]), categoryController.addCategory)

categoryRouter.route("/admin/getCategories")
    .get(authenticate,authorize([1]),categoryController.getAllCategories)

categoryRouter.route("/")
    .get(categoryController.getAllCategories)

categoryRouter.route("/:id")
    .patch(authenticate,authorize([1]),categoryController.updateCategory)

categoryRouter.route("/:id")
    .delete(authenticate,authorize([1]),categoryController.deleteCategory)

module.exports = categoryRouter;