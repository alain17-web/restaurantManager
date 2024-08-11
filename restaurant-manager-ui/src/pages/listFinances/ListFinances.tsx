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
    }, []);

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
                    <NewFinanceSummary setFinanceSummaryId={setFinanceSummaryId} id={financeSummaryId} financeSummaries={financeSummaries}/>
                }
                {open ?
                    <div className={"mb-2 pl-6"}>
                        <button
                            className={"m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                            onClick={close}
                        >
                            Retour à la liste
                        </button>
                    </div> : ""
                }
            </div>
        </div>
    );
};
export default ListFinances;