const createConnection = require('../database/database');
const moment = require("moment");

const bookingService = {
    //CREATE
    addBooking: async ({date, hour, name, email, people}) => {
        const connection = await createConnection();

        try {
            const [result] = await connection.execute(
                'INSERT INTO bookings (date, hour, name, email,people) VALUES (?, ?, ?, ?, ?)',
                [date, hour, name, email, people]
            );

            return {id: result.insertId, date, hour,email, name, people};
        } catch (error) {
            console.error("Error addBooking service", error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //READ
    /*getAllBookings: async () => {
        const connection = await createConnection();

        try {
            const [bookings] = await connection.execute('SELECT * FROM bookings');
            return bookings;
        } catch (error) {
            console.error("Error getAllBookings service", error);
            throw error;
        } finally {
            await connection.end();
        }
    }*/
    getAllBookings: async () => {
        const connection = await createConnection();

        try {
            const [bookings] = await connection.execute('SELECT * FROM bookings');

            bookings.forEach(booking => {
                booking.date = moment(booking.date).format('DD/MM/YYYY');
            });
            return bookings;
        } catch (error) {
            console.error("Error in getAllBookings service:", error);
            throw error;
        } finally {
            await connection.end();
        }
    }

}

module.exports = bookingService;


