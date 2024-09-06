const bookingRouter = require("express").Router();
const bookingController = require("../controllers/booking.controller");
const {authenticate, authorize} = require("../middlewares/authenticate");

bookingRouter.route("/addBooking")
    .post(bookingController.addBooking)

bookingRouter.route("/admin/addBooking")
    .post(authenticate, authorize([1]), bookingController.addBooking);

bookingRouter.route("/")
    .get(authenticate,authorize([1,10]),bookingController.getAllBookings)

bookingRouter.route("/:id")
    .patch(authenticate,authorize([1]),bookingController.updateBooking)

bookingRouter.route("/:id")
    .delete(authenticate,authorize([1]),bookingController.deleteBooking)


module.exports = bookingRouter;