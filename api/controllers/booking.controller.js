/*const bookingService = require("../services/booking.service");
const bookingValidator = require("../validators/bookingValidator");


const addBooking = async (req, res) => {
    try{
        const validationResult = await bookingValidator(req.body);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error});
        }
        const { date, hour, name, email, people } = validationResult;
        const bookingResult = await bookingService.addBooking({ date, hour, name, email, people });
        res.status(201).json({message:"Booking created successfully.", bookingResult});
    }
    catch(error){
        res.status(500).json({message:"Error controller creating the booking"});
    }
}

module.exports = {
    addBooking,
};*/

const bookingService = require("../services/booking.service");
const bookingValidator = require("../validators/bookingValidator");

const addBooking = async (req, res) => {
    try {
        // Validate the request body using Yup
        const validatedData = await bookingValidator.validate(req.body, { abortEarly: false });

        // Extract the validated data
        const { date, hour, name, email, people } = validatedData;

        // Proceed with the booking logic using the validated data
        const bookingResult = await bookingService.addBooking({ date, hour, name, email, people });

        // Send a success response
        res.status(201).json({ message: "Booking created successfully.", bookingResult });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // If validation fails, send a 400 response with the validation errors
            return res.status(400).json({ errors: error.errors });
        }
        // For other errors, send a 500 response
        res.status(500).json({ message: "Error controller creating the booking." });
    }
};

module.exports = {
    addBooking,
};

