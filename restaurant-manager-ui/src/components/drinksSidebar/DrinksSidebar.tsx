import { Link } from "react-router-dom"
import {drinks} from "../../tempData.ts";

interface Props {
    onItemSelect: (item:string) => void
    selectedItem: string
}

const DrinksSidebar = (props:Props) => {

    const categories:string[] = []
    drinks.forEach((drink) => {
        if(!categories.includes(drink.cat))
            categories.push(drink.cat)
    })

    const handleClick = (cat:string) => {
        props.onItemSelect(cat)
    }

    return (
        <>
            <h1 className={"text-2xl font-inter underline"}>Les boissons</h1>
            {categories.map(cat => (
                <Link
                    className={props.selectedItem === cat ? "font-inter font-semibold italic text-amber-100 underline text-xl mt-3" : "font-inter font-semibold italic text-[#013220] text-xl mt-3"}
                    key={cat}
                    onClick={() =>handleClick(cat)}
                >
                    {cat}
                </Link>
            ))}
        </>
    );
};

export default DrinksSidebar

