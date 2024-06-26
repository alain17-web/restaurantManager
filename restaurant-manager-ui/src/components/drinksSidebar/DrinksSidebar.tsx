import {Link} from "react-router-dom"
import {Category} from "../../types/types.ts";

interface Props {
    onItemSelect: (item: string) => void
    selectedItem: string
    categories:Category[]
}

const DrinksSidebar = (props: Props) => {


    const handleClick = (cat: string) => {
        props.onItemSelect(cat)
    }

    return (
        <>
            <h1 className={"text-2xl font-inter underline"}>Les boissons</h1>
            {props.categories.map(cat => {
                if(cat.type === "beverage") {
                    return <Link
                        className={props.selectedItem === cat.cat_name ? "w-[33%] font-inter font-semibold italic text-white bg-[#6B8E23] underline text-center text-lg mt-3 rounded-md p-1" : "w-[25%] font-inter font-semibold italic text-[#013220] hover:text-white text-lg text-center mt-3 no-underline"}
                        key={cat.id}
                        onClick={() => handleClick(cat.cat_name)}
                    >
                        {cat.cat_name}
                    </Link>
                }
            })}
        </>
    );
};

export default DrinksSidebar