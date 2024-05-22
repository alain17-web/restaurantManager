import {dishes} from '../../tempData.ts'
import { Link } from "react-router-dom"
import Drinks from "../drinks/Drinks.tsx";

interface Props {
    onItemSelect: (item:string) => void
    selectedItem: string
}

const MenuSidebar = (props:Props) => {

    const categories:string[] = []
    dishes.forEach((dish) => {
        if(!categories.includes(dish.cat))
        categories.push(dish.cat)
    })

    const handleClick = (cat:string) => {
        props.onItemSelect(cat)
    }

    return (
        <main className={"w-[15%] h-auto flex flex-col ml-12"}>
            <h1 className={"text-2xl font-inter underline"}>Les plats</h1>
            {categories.map(cat => (
                <Link
                    className={props.selectedItem === cat ? "font-inter font-semibold italic text-amber-100 underline text-xl mt-3" : "font-inter font-semibold italic text-[#013220] text-xl mt-3"}
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

