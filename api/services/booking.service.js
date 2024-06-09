const createConnection = require('../database/database');

const bookingService = {
//CREATE
    addBooking: async ({date, hour, name, email, people}) => {
        const connection = await createConnection();

        try {
            const [result] = await connection.execute(
                'INSERT INTO bookings (date, hour, name, email,people) VALUES (?, ?, ?, ?, ?)',
                [date, hour, name, email, people]
            );

            return {id: result.insertId, date, hour, name, people};
        } catch (error) {
            console.error("Error addBooking service", error);
        }
    }
}

module.exports = bookingService;

//READ