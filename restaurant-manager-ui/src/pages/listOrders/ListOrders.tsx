import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableOrders from "../../components/dataTableOrders/DataTableOrders.tsx";

const ListOrders = () => {
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Commandes clients</h1>
                <DataTableOrders/>
            </div>
        </div>
    );
};
export default ListOrders;