// Import the function to create a connection to the database
const createConnection = require('../database/database');

// Import the dayjs library to handle date formatting
const dayjs = require('dayjs');

// Define the bookingService object that will handle CRUD operations for bookings
const bookingService = {

    // CREATE: Function to add a new booking to the database
    addBooking: async ({date, hour, name, email, people}) => {
        // Establish a connection to the database
        const connection = await createConnection();

        try {
            // Execute an SQL INSERT statement to add a new booking record
            const [result] = await connection.execute(
                'INSERT INTO bookings (date, hour, name, email, people) VALUES (?, ?, ?, ?, ?)',
                [date, hour, name, email, people]
            );

            // Return the newly created booking with its generated ID
            return {id: result.insertId, date, hour, email, name, people};
        } catch (error) {
            // Log any errors that occur during the process
            console.error("Error in addBooking service:", error);
            throw error;
        } finally {
            // Close the database connection when done
            await connection.end();
        }
    },

    // READ: Function to retrieve all bookings from the database
    getAllBookings: async () => {
        // Establish a connection to the database
        const connection = await createConnection();

        try {
            // Execute an SQL SELECT statement to retrieve all bookings ordered by ID in descending order
            const [bookings] = await connection.execute('SELECT * FROM bookings ORDER BY id DESC');

            // Format the date of each booking using dayjs (e.g., format to DD/MM/YYYY)
            bookings.forEach(booking => {
                booking.date = dayjs(booking.date).format('DD/MM/YYYY');
            });

            // Return the list of formatted bookings
            return bookings;
        } catch (error) {
            // Log any errors that occur during the process
            console.error("Error in getAllBookings service:", error);
            throw error;
        } finally {
            // Close the database connection when done
            await connection.end();
        }
    },

    // UPDATE: Function to update an existing booking in the database
    updateBooking: async (id, date, hour, name, email, people) => {
        // Establish a connection to the database
        const connection = await createConnection();

        try {
            // Split the date string into day, month, and year
            const [day, month, year] = date.split('/');

            // Reformat the date to be in 'YYYY-MM-DD' format
            const formattedDate = `${year}-${month}-${day}`;

            // Execute an SQL UPDATE statement to update the booking with the provided ID
            const [updatedBooking] = await connection.execute(
                'UPDATE bookings SET date = ?, hour = ?, name = ?, email = ?, people = ? WHERE id = ?',
                [formattedDate, hour, name, email, people, id]
            );

            // Return true if the update was successful (affected rows > 0)
            return updatedBooking.affectedRows > 0;
        } catch (error) {
            // Log any errors that occur during the update process
            console.error("Error in updateBooking service:", error);
            throw error;
        } finally {
            // Close the database connection when done
            await connection.end();
        }
    },

    // DELETE: Function to delete a booking from the database
    deleteBooking: async (id) => {
        // Establish a connection to the database
        const connection = await createConnection();

        try {
            // Execute an SQL DELETE statement to remove the booking with the provided ID
            const [result] = await connection.execute('DELETE FROM bookings WHERE id = ?', [id]);

            // Return true if the delete was successful (affected rows > 0)
            return result.affectedRows > 0;
        } catch (error) {
            // Log any errors that occur during the deletion process
            console.error("Error in deleteBooking service:", error);
            throw error;
        } finally {
            // Close the database connection when done
            await connection.end();
        }
    }
};

// Export the bookingService object so it can be used in other parts of the application
module.exports = bookingService;
