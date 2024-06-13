const dishRouter = require('express').Router();
const dishController = require('../controllers/dish.controller');
const {authenticate, authorize} = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");


dishRouter.route('/addDish')
    .post(
        authenticate,
        authorize([1]),
        upload.single('img'),
        dishController.addDish
    )

dishRouter.route("/admin/getDishes")
    .get(authenticate,authorize([1]),dishController.getAllDishes)

dishRouter.route('/')
    .get(dishController.getAllDishes)


module.exports = dishRouter