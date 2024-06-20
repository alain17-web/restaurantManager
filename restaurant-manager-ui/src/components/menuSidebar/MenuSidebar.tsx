
import DishesSidebar from "../dishesSidebar/DishesSidebar.tsx";
import DrinksSidebar from "../drinksSidebar/DrinksSidebar.tsx";

interface Props {
    onItemSelect: (item:string) => void
    selectedItem: string
}

const MenuSidebar = (props:Props) => {

    return (
        <main className={"w-[15%] h-screen flex flex-col ml-12 pt-14"}>
           <DishesSidebar onItemSelect={props.onItemSelect} selectedItem={props.selectedItem} />
            <DrinksSidebar onItemSelect={props.onItemSelect} selectedItem={props.selectedItem} />
        </main>
    );
};

export default MenuSidebar

