import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableDrinks from "../../components/dataTableDrinks/DataTableDrinks.tsx";

interface Drink {
    idDrink: number;
    name: string;
    price: number;
    cat: string;
    cost: number;
    min: number;
}

const ListDrinks = () => {
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Boissons</h1>
                <DataTableDrinks/>
            </div>
        </div>
    );
};
export default ListDrinks;
