import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableFinances from "../../components/dataTableFinances/DataTableFinances.tsx";
import axiosInstance from "../../axios/axiosInstance.tsx";
import {useEffect, useState} from "react";
import {Finance} from "../../types/types.ts";
import NewFinanceSummary from "../newFinanceSummary/NewFinanceSummary.tsx";

const ListFinances = () => {

    const [financeSummaries, setFinanceSummaries] = useState<Finance[]>([]);
    const [financeSummaryId, setFinanceSummaryId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

    useEffect(() => {
        const getFinanceSummaries = async () => {
            try {
                const res = await axiosInstance.get('/finances/')
                setFinanceSummaries(res.data)
            } catch (error) {
                console.error('Error in getFinanaceSummaries', error);
            }
        }
        getFinanceSummaries()
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    };

    const handleGetFinanceSummaryId = (id: number) => {
        setFinanceSummaryId(id)
        setOpen(true);
    }

    const show = () => {
        setFinanceSummaryId(null)
        setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }


    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Comptabilité</h1>
                {!open ?
                    <DataTableFinances
                        financeSummaries={financeSummaries}
                        getFinanceSummaryId={handleGetFinanceSummaryId}
                        open={show}
                    /> :
                    <NewFinanceSummary id={financeSummaryId} financeSummaries={financeSummaries} onAddOrEdit={handleAddedOrEdited} close={close}/>
                }
            </div>
        </div>
    );
};
export default ListFinances;