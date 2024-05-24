import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableInactive from "../../components/dataTableInactive/DataTableInactive.tsx";

const ListInactiveStaff = () => {
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Anciens employés</h1>
                <DataTableInactive/>
            </div>
        </div>
    );
};
export default ListInactiveStaff;