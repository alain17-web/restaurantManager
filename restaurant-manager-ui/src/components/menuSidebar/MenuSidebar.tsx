import {dishes} from '../../tempData.ts'
import { Link } from "react-router-dom"
import Drinks from "../drinks/Drinks.tsx";

const MenuSidebar = ({onItemSelect,selectedItem}) => {

    const categories:string[] = []
    dishes.forEach((dish) => {
        if(!categories.includes(dish.cat))
        categories.push(dish.cat)
    })

    const handleClick = (cat:string) => {
        onItemSelect(cat)
    }

    return (
        <main className={"w-[15%] h-auto flex flex-col ml-12"}>
            <h1 className={"text-2xl font-inter underline"}>Les plats</h1>
            {categories.map(cat => (
                <Link
                    className={selectedItem === cat ? "font-inter font-semibold italic text-amber-100 underline text-2xl mt-5" : "font-inter font-semibold italic text-[#013220] text-2xl mt-5"}
                    key={cat}
                    onClick={() =>handleClick(cat)}
                >
                    {cat}
                </Link>
            ))}
            <Drinks/>
        </main>
    );
};

export default MenuSidebar

