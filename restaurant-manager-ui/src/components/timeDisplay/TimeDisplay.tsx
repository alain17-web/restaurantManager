import {memo, useEffect, useState} from "react";

const TimeDisplay = memo(() => {

    const [time, setTime] =  useState<Date>( new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        },60000)

        return () => clearInterval(intervalId)
    },[])

    return (
        <div className={'w-full h-auto'}>
            <p className={"text-center text-white text-3xl"}>{time.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}</p>
        </div>
    );
});

export default TimeDisplay;