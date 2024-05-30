import {dishes} from '../../tempData.ts'
import { Link } from "react-router-dom"

interface Props {
    onItemSelect: (item:string) => void
    selectedItem: string
}

const DishesSidebar = (props:Props) => {

    const categories:string[] = []
    dishes.forEach((dish) => {
        if(!categories.includes(dish.cat))
            categories.push(dish.cat)
    })

    const handleClick = (cat:string) => {
        props.onItemSelect(cat)
    }

    return (
        <section className={"flex flex-col mb-16"}>
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
        </section>
    );
};
export default DishesSidebar;