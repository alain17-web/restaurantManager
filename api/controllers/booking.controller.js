// Import the booking service which handles business logic for bookings
const bookingService = require("../services/booking.service");

// Import the validator to validate booking data before processing
const bookingValidator = require("../validators/bookingValidator");

const bookingController = {

    // CREATE: Controller to handle creating a new booking
    addBooking: async (req, res) => {
        try {
            // Validate the request body using the booking validator, ensuring all fields are correct
            const validatedData = await bookingValidator.validate(req.body, {abortEarly: false});

            // Reformat the date from 'DD/MM/YYYY' to 'YYYY-MM-DD' for database storage
            const [day, month, year] = validatedData.date.split("/");
            const formattedDate = `${year}-${month}-${day}`;

            // Destructure the rest of the validated fields
            const {hour, name, email, people} = validatedData;

            // Call the booking service to add the new booking to the database
            const bookingResult = await bookingService.addBooking({
                date: formattedDate,
                hour,
                name,
                email,
                people
            });

            // Respond with success message and booking data
            res.status(200).json({message: "Booking created successfully.", bookingResult});
        } catch (error) {
            // Handle validation errors and return a 400 Bad Request response
            if (error.name === 'ValidationError') {
                console.error("Validation Error:", error.message);
                return res.status(400).json({error: error.message});
            }
            // Handle other errors and return a 500 Internal Server Error response
            console.error("Error in addBooking controller:", error);
            res.status(500).json({message: "Error creating the booking."});
        }
    },

    // READ: Controller to retrieve all bookings
    getAllBookings: async (req, res) => {
        try {
            // Call the booking service to get all bookings from the database
            const bookings = await bookingService.getAllBookings();

            // If bookings exist, return them, otherwise return a 404 Not Found response
            if (bookings.length > 0) {
                res.status(200).json(bookings);
            } else {
                res.status(404).json({message: "No booking found"});
            }
        } catch (error) {
            // Log and handle any errors, returning a 500 Internal Server Error response
            console.error('Error in getAllBookings controller:', error);
            res.status(500).json({message: 'Error retrieving bookings.'});
        }
    },

    // UPDATE: Controller to handle updating an existing booking
    updateBooking: async (req, res) => {
        try {
            // Validate the request body data
            const validatedData = await bookingValidator.validate(req.body);

            // Destructure the validated fields
            const {date, hour, name, email, people} = validatedData;

            // Call the booking service to update the booking with the provided ID
            const updatedBooking = await bookingService.updateBooking(
                req.params.id, date, hour, name, email, people
            );

            // If the update was successful, respond with a success message
            if (updatedBooking) {
                res.status(200).json({message: "Booking updated successfully."});
            } else {
                // If no changes were made or the booking wasn't found, return a 404 response
                res.status(404).json({error: 'Booking not found or no changes made.'});
            }
        } catch (error) {
            // Log and handle errors, returning a 500 Internal Server Error response
            console.error('Error in updateBooking controller:', error.message);
            res.status(500).json({message: 'Error updating booking.', error: error.message});
        }
    },

    // DELETE: Controller to handle deleting a booking by ID
    deleteBooking: async (req, res) => {
        try {
            // Extract the booking ID from the request parameters
            const bookingId = req.params.id;

            // Call the booking service to delete the booking from the database
            const deletedBooking = await bookingService.deleteBooking(bookingId);

            // If the booking was successfully deleted, respond with a success message
            if (deletedBooking) {
                res.status(200).json({message: "Booking deleted successfully."});
            } else {
                // If the booking wasn't found, return a 404 Not Found response
                res.status(404).json({error: 'Booking not found.'});
            }
        } catch (error) {
            // Log and handle errors, returning a 500 Internal Server Error response
            console.error('Error in deleteBooking controller:', error);
            res.status(500).json({message: 'Error deleting booking.'});
        }
    }
};

// Export the bookingController so it can be used in the routes
module.exports = bookingController;
