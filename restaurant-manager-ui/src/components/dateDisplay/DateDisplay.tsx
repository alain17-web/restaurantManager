import useCurrentWeekDay from "../../hooks/useCurrentWeekDay.tsx";


const CurrentDate = () => {
    const currentDate = new Date();

    const currentDay:string = useCurrentWeekDay()

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();


    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div className={'w-full h-auto'}>
            <p className={"text-lg text-center font-inter"}> {currentDay} {formattedDate}</p>
        </div>
    );
};

export default CurrentDate;
