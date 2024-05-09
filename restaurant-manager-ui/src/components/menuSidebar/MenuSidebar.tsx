import {dishes} from '../../tempData.ts'
import { Link } from "react-router-dom"
import Drinks from "../drinks/Drinks.tsx";

const MenuSidebar = () => {

    const categories:string[] = []
    dishes.forEach((dish) => {
        if(!categories.includes(dish.cat))
        categories.push(dish.cat)
    })
    return (
        <main className={"w-[15%] h-auto flex flex-col ml-12"}>
            <h1 className={"text-2xl font-inter underline"}>Les plats</h1>
            {categories.map(cat => (
                <Link className={"font-inter font-semibold italic text-[#013220] text-2xl mt-5"} key={cat}>
                    {cat}
                </Link>
            ))}
            <Drinks/>
        </main>
    );
};

export default MenuSidebar

