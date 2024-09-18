//See comments in booking.router to understand the router
const drinkRouter = require("express").Router();
const drinkController = require("../controllers/drink.controller");
const {authenticate,authorize} = require("../middlewares/authenticate");

drinkRouter.route("/addDrink")
    .post(authenticate, authorize([1]), drinkController.addDrink)

drinkRouter.route("/admin/getDrinks")
    .get(authenticate,authorize([1]),drinkController.getAllDrinks)

drinkRouter.route("/")
    .get(drinkController.getAllDrinks)

drinkRouter.route("/:id")
    .patch(authenticate,authorize([1]),drinkController.updateDrink)

drinkRouter.route("/:id")
    .delete(authenticate,authorize([1]),drinkController.deleteDrink)

module.exports = drinkRouter;