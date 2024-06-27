import useCurrentWeekDay from "../../hooks/date/useCurrentWeekDay.tsx";
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";


const CurrentDate = () => {

    const { formattedDate} = useCurrentDate()
    const currentDay:string = useCurrentWeekDay()

    return (
        <div className={'w-full h-auto'}>
            <p className={"text-lg text-center font-inter"}> {currentDay} {formattedDate}</p>
        </div>
    );
};

export default CurrentDate;
