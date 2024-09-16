const useCurrentDate = () => {
    const currentDate = new Date(); // Create a new Date object representing the current date and time

    // Extract the day of the month and month, and ensure it's always two digits by padding with a leading zero if necessary
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

    // Get the full year (4 digits)
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return { formattedDate };
};

export default useCurrentDate;