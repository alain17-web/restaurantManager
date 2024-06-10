const bookingService = require("../services/booking.service");
const bookingValidator = require("../validators/bookingValidator");

const bookingController = {
    //CREATE
    addBooking: async (req, res) => {
        try {

            const validatedData = await bookingValidator.validate(req.body, { abortEarly: false });

            const [day, month, year] = validatedData.date.split("/");
            const formattedDate = `${year}-${month}-${day}`;

            const { hour, name, email, people } = validatedData;

            const bookingResult = await bookingService.addBooking({ date: formattedDate, hour, name, email, people });

            res.status(201).json({ message: "Booking created successfully.", bookingResult });
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.error("Validation Error:", error.errors);
                return res.status(400).json({ errors: error.errors });
            }
            console.error("Error in addBooking controller:", error);
            res.status(500).json({ message: "Error creating the booking." });
        }
    },

    //READ
    getAllBookings: async(req,res)=>{
        try{
            const bookings = await bookingService.getAllBookings();

            if(bookings.length > 0){
                res.status(200).json(bookings);
            } else {
                res.status(404).json({message: "No booking found"});
            }
        } catch (error){
            console.error('Error getAllBookings controller',error)
            res.status(500).json({message: 'Error getAllBookings controller'});
        }
    }
}

module.exports = bookingController;

