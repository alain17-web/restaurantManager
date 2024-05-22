import {drinks} from "../../tempData.ts";

const Wines = () => {
    return (
        <>
            <p className={"mt-3 text-2xl font-inter italic font-semibold"}>Les Vins:</p>
            {drinks.map((drink) => (
                <div key={drink.idDrink} className={"flex items-center"}>
                    {drink.cat === "Vins" && (
                        <li className={"list-none"}>
                            <p className={"font-inter italic text-xl text-amber-100 font-medium"}>{drink.name} - <span className={"font-bold"}>{drink.price + "€"}</span> </p>
                        </li>
                    )}
                </div>
            ))}
        </>
    );
};
export default Wines;