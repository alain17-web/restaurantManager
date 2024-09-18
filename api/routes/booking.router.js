// Import the Express Router to define routes for booking-related operations
const bookingRouter = require("express").Router();

// Import the booking controller, which contains the logic for handling bookings
const bookingController = require("../controllers/booking.controller");

// Import authentication and authorization middleware to protect routes
const { authenticate, authorize } = require("../middlewares/authenticate");

// Route to add a new booking (public access)
// POST /addBooking will trigger the addBooking function from the bookingController
bookingRouter.route("/addBooking")
    .post(bookingController.addBooking);

// Route to add a new booking (admin access only)
// POST /admin/addBooking requires the user to be authenticated and authorized with role ID 1 (Admin)
// Only users with admin role can access this route
bookingRouter.route("/admin/addBooking")
    .post(authenticate, authorize([1]), bookingController.addBooking);

// Route to get all bookings (admin or role 10, such as a manager)
// GET / will trigger the getAllBookings function from the bookingController
// This route requires authentication and authorization for users with roles 1 (Admin) or 10 (Manager)
bookingRouter.route("/")
    .get(authenticate, authorize([1, 10]), bookingController.getAllBookings);

// Route to update a booking by its ID (admin access only)
// PATCH /:id allows updating a specific booking
// This route requires authentication and authorization for Admin (role 1) only
bookingRouter.route("/:id")
    .patch(authenticate, authorize([1]), bookingController.updateBooking);

// Route to delete a booking by its ID (admin access only)
// DELETE /:id allows deleting a specific booking
// This route requires authentication and authorization for Admin (role 1) only
bookingRouter.route("/:id")
    .delete(authenticate, authorize([1]), bookingController.deleteBooking);

// Export the bookingRouter so it can be used in the main application
module.exports = bookingRouter;
