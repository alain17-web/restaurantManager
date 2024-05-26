import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableStockFood from "../../components/dataTableStockFood/DataTableStockFood.tsx";


const ListStockFood = () => {
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Stock nourriture</h1>
                <DataTableStockFood/>
            </div>
        </div>
    );
};
export default ListStockFood;