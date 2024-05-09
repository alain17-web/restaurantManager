import {drinks} from "../../tempData.ts";

const Beers = () => {
    return (
        <>
            <p className={"mt-5 text-2xl font-inter italic font-semibold"}>Les Bières:</p>
            {drinks.map((drink) => (
                <div key={drink.idDrink} className={"flex items-center"}>
                    {drink.cat === "Bières" && (
                        <li className={"list-none"}>
                            <p className={"font-inter italic text-xl text-amber-100 font-medium"}>{drink.name} - <span className={"font-bold"}>{drink.price + "€"}</span> </p>
                        </li>
                    )}
                </div>
            ))}
        </>
    );
};
export default Beers;