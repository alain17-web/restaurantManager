import { useState, useEffect } from 'react';

const useCurrentWeekDay = (): string => {
    const [currentDay, setCurrentDay] = useState<string>('');

    useEffect(() => {
        const currentDate = new Date();
        const dayIndex = currentDate.getDay();

        const weekDays: string[] = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        setCurrentDay(weekDays[dayIndex]);
    }, []);

    return currentDay;
};

export default useCurrentWeekDay;
