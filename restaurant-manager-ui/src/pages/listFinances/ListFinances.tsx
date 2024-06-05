import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableFinances from "../../components/dataTableFinances/DataTableFinances.tsx";

const ListFinances = () => {
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Comptabilité</h1>
                <DataTableFinances/>
            </div>
        </div>
    );
};
export default ListFinances;