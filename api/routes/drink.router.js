const drinkRouter = require("express").Router();
const drinkController = require("../controllers/drink.controller");
const {authenticate,authorize} = require("../middlewares/authenticate");

drinkRouter.route("/addDrink")
    .post(authenticate, authorize([1]), drinkController.addDrink)

drinkRouter.route("/")
    .get(authenticate,authorize([1]),drinkController.getAllDrinks)

drinkRouter.route("/:id")
    .patch(authenticate,authorize([1]),drinkController.updateDrink)

module.exports = drinkRouter;