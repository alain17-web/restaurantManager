import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableInactive from "../../components/dataTableInactive/DataTableInactive.tsx";
import {useEffect, useState} from "react";
import {formerEmployees as formerEmployeeData} from "../../tempData.ts";
import {FormerEmployee} from "../../types/types.ts";


const ListInactiveStaff = () => {

    const [formerEmployees, setFormerEmployees] = useState<FormerEmployee[]>([])

    useEffect(() => {
        getFormerEmployees()
    }, []);

    const getFormerEmployees = () => {
        setFormerEmployees(formerEmployeeData)

    }

    const[_formerEmployeeId, setFormerEmployeeId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const handleGetFormerEmployeeId = (id: number) => {
        setFormerEmployeeId(id)
        setOpen(true);
    }

    const show = () => {
       formerEmployees && setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }


    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Anciens employés</h1>
                {!open ? <DataTableInactive getFormerEmployeeId={handleGetFormerEmployeeId} open={show}/> :
                    <div className={"mb-2 pl-6"}>
                        <button
                            className={"m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                            onClick={close}
                        >
                            Retour à la liste
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};
export default ListInactiveStaff;