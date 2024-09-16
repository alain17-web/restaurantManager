import {memo, useEffect, useState} from "react";

// `TimeDisplay` is a memoized functional component, which prevents unnecessary re-renders if its props do not change
const TimeDisplay = memo(() => {

    const [time, setTime] =  useState<Date>( new Date())

    useEffect(() => {
        // Setting up an interval to update the `time` state every 60 seconds (60000 milliseconds)
        const intervalId = setInterval(() => {
            setTime(new Date())
        },60000)

        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(intervalId)
    },[]) // Empty dependency array means this effect runs only once, when the component mounts

    return (
        <div className={'w-full h-auto'}>
            {/* The current time is displayed, formatted to show only hours and minutes in a 2-digit format */}
            <p className={"text-center text-white text-5xl"}>{time.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}</p>
        </div>
    );
});

export default TimeDisplay;