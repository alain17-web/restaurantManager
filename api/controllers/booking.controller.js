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

        const validatedData = await bookingValidator.validate(req.body, { abortEarly: false });

        const { date, hour, name, email, people } = validatedData;

        const bookingResult = await bookingService.addBooking({ date, hour, name, email, people });

        res.status(201).json({ message: "Booking created successfully.", bookingResult });
    } catch (error) {
        if (error.name === 'ValidationError') {

            return res.status(400).json({ errors: error.errors });
        }

        res.status(500).json({ message: "Error controller creating the booking." });
    }
};

module.exports = {
    addBooking,
};

