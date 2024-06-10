const createConnection = require('../database/database');
const dayjs = require('dayjs');

const bookingService = {
    //CREATE
    addBooking: async ({date, hour, name, email, people}) => {
        const connection = await createConnection();

        try {
            const [result] = await connection.execute(
                'INSERT INTO bookings (date, hour, name, email,people) VALUES (?, ?, ?, ?, ?)',
                [date, hour, name, email, people]
            );

            return {id: result.insertId, date, hour, email, name, people};
        } catch (error) {
            console.error("Error addBooking service", error);
            throw error;
        } finally {
            await connection.end();
        }
    },


    getAllBookings: async () => {
        const connection = await createConnection();

        try {
            const [bookings] = await connection.execute('SELECT * FROM bookings');

            bookings.forEach(booking => {
                booking.date = dayjs(booking.date).format('DD/MM/YYYY');
            });
            return bookings;
        } catch (error) {
            console.error("Error in getAllBookings service:", error);
            throw error;
        } finally {
            await connection.end();
        }
    },

    //UPDATE
    updateBooking: async (id, date, hour, name, email, people) => {
        const connection = await createConnection();
        try {
            const [day, month, year] = date.split('/');
            const formattedDate = `${year}-${month}-${day}`;

            const [updatedBooking] = await connection.execute(
                'UPDATE bookings SET date = ?, hour = ?, name = ?, email = ?, people = ? WHERE id = ?',
                [formattedDate, hour, name, email, people, id]
            );
            return updatedBooking.affectedRows > 0;
        } catch (error) {
            console.error("Error updatingBooking service:", error);
            throw error;
        } finally {
            await connection.end();
        }
    }

}

module.exports = bookingService;


