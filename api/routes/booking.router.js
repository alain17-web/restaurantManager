const bookingRouter = require("express").Router();
const bookingController = require("../controllers/booking.controller");

bookingRouter.route("/addBooking")
    .post(bookingController.addBooking)
module.exports = bookingRouter;