import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTablePurchases from "../../components/dataTablePurchases/DataTablePurchases.tsx";
import {useEffect, useState} from "react";
import {Purchase} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import NewPurchase from "../newPurchase/NewPurchase.tsx";

const ListPurchases = () => {

    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [purchaseId, setPurchaseId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const handleGetPurchaseId = (id: number) => {
        setPurchaseId(id)
        setOpen(true);
    }

    const show = () => {
        setPurchaseId(null)
        setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }

    useEffect(() => {
        const getPurchases = async () => {
            try {
                const res = await axiosInstance.get('/purchases/')
                setPurchases(res.data)
            } catch (error) {
                console.error('Error in getPurchases', error);
            }
        }
        getPurchases();
    }, []);

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Achats</h1>
                {!open ? <DataTablePurchases purchases={purchases} getPurchaseId={handleGetPurchaseId} open={show}/> :
                    <NewPurchase setPurchaseId={setPurchaseId} purchases={purchases} id={purchaseId} />
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
export default ListPurchases;