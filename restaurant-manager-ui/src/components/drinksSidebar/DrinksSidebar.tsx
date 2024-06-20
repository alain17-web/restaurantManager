import {Link} from "react-router-dom"
import {drinks} from "../../tempData.ts";

interface Props {
    onItemSelect: (item: string) => void
    selectedItem: string
}

const DrinksSidebar = (props: Props) => {

    const categories: string[] = []
    drinks.forEach((drink) => {
        if (!categories.includes(drink.cat))
            categories.push(drink.cat)
    })

    const handleClick = (cat: string) => {
        props.onItemSelect(cat)
    }

    return (
        <>
            <h1 className={"text-2xl font-inter underline"}>Les boissons</h1>
            {categories.map(cat => (
                <Link
                    className={props.selectedItem === cat ? "w-[33%] font-inter font-semibold italic text-white bg-[#6B8E23] underline text-center text-lg mt-3 rounded-md p-1" : "w-[25%] font-inter font-semibold italic text-[#013220] hover:text-white text-lg text-center mt-3 no-underline"}
                    key={cat}
                    onClick={() => handleClick(cat)}
                >
                    {cat}
                </Link>
            ))}
        </>
    );
};

export default DrinksSidebar