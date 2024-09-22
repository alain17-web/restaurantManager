
import DishesSidebar from "../dishesSidebar/DishesSidebar.tsx";
import DrinksSidebar from "../drinksSidebar/DrinksSidebar.tsx";
import {MenuSidebarData} from "../../../types/types.ts";



const MenuSidebar = (props:MenuSidebarData) => {

    return (
        <main className={"w-[15%] h-screen flex flex-col mr-12 lg:ml-12 pt-14"}>
            {/* Render DishesSidebar, passing down props like onItemSelect, selectedItem, and categories */}
           <DishesSidebar onItemSelect={props.onItemSelect} selectedItem={props.selectedItem} categories={props.categories}  />

            {/* Render DrinksSidebar with the same props passed down */}
            <DrinksSidebar onItemSelect={props.onItemSelect} selectedItem={props.selectedItem} categories={props.categories} />
        </main>
    );
};

export default MenuSidebar

