import useCurrentWeekDay from "../../hooks/useCurrentWeekDay.tsx";
import useCurrentDate from "../../hooks/useCurrentDate.tsx";


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
