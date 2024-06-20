import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableStockDrinks from "../../components/dataTableStockDrinks/DataTableStockDrinks.tsx";


const ListStockDrinks = () => {
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Stock nourriture</h1>
                <DataTableStockDrinks/>
            </div>
        </div>
    );
};
export default ListStockDrinks;