import { Link } from "react-router-dom"
import {DishSidebarData} from "../../../types/types.ts";



const DishesSidebar = (props:DishSidebarData) => {

    // Function to handle click events on categories
    // It calls the onItemSelect callback passed through props and passes the selected category name
    const handleClick = (cat:string) => {
        props.onItemSelect(cat)
    }

    return (
        <section className={"flex flex-col lg:mb-16"}>
            <h1 className={"text-sm md:text-lg lg:text-2xl font-inter underline"}>Les plats</h1>
            {props.categories.map(cat => {
                if (cat.type === "food") {
                    return <Link
                        className={props.selectedItem === cat.cat_name ? "w-[33%] mr-2 lg:mr-0 font-inter font-semibold italic text-white lg:bg-[#6B8E23] underline text-left text-xs md:text-base lg:text-lg mt-1 lg:mt-3 rounded-md p-1" : ":w-[25%] font-inter font-semibold italic text-[#013220] hover:text-white text-xs md:text-base lg:text-lg text-left  lg:mt-3 no-underline"}
                        key={cat.id}
                        onClick={() =>handleClick(cat.cat_name)}
                    >
                        {cat.cat_name}
                    </Link>
                }

            })}
        </section>
    );
};
export default DishesSidebar;