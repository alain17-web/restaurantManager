import { useState, useEffect } from 'react';

// Custom hook to get the current day of the week as a string
const useCurrentWeekDay = (): string => {
    const [currentDay, setCurrentDay] = useState<string>('');

    // useEffect hook to set the current day when the component mounts
    useEffect(() => {
        const currentDate = new Date();

        // Get the day of the week as an index (0 = Sunday, 6 = Saturday)
        const dayIndex = currentDate.getDay();

        const weekDays: string[] = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        // Set the current day based on the dayIndex (e.g., "mardi" for 2)
        setCurrentDay(weekDays[dayIndex]);
    }, []);

    return currentDay;
};

export default useCurrentWeekDay;
