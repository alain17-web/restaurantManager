
import DishesSidebar from "../dishesSidebar/DishesSidebar.tsx";
import DrinksSidebar from "../drinksSidebar/DrinksSidebar.tsx";
import {Category} from "../../types/types.ts";

interface Props {
    onItemSelect: (item:string) => void
    selectedItem: string
    categories: Category[]
}

const MenuSidebar = (props:Props) => {

    return (
        <main className={"w-[15%] h-screen flex flex-col ml-12 pt-14"}>
           <DishesSidebar onItemSelect={props.onItemSelect} selectedItem={props.selectedItem} categories={props.categories}  />
            <DrinksSidebar onItemSelect={props.onItemSelect} selectedItem={props.selectedItem} categories={props.categories} />
        </main>
    );
};

export default MenuSidebar

