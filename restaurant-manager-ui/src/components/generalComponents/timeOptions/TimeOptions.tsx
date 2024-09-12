const TimeOptions = () => {

    const hours = ["midi", "12h30", "13h", "13h30", "14h", "14h30", "15h", "16h", "17h", "18h", "18h30", "19h", "19h30", "20h30", "21h", "21h30", "22h"];
    return (
        <>
            <option>Sélectionner l'heure</option>
            {hours.map((hour) => (
                <option key={hour} value={hour}>{hour}</option>
            ))}
        </>
    );
};

export default TimeOptions;