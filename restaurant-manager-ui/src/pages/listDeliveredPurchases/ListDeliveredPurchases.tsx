import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
//import DataTablePurchases from "../../components/dataTablePurchases/DataTablePurchases.tsx";
import {useEffect, useState} from "react";
import {Purchase} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import DataTableDeliveredPurchases from "../../components/dataTableDeliveredPurchases/DataTableDeliveredPurchases.tsx";
import PurchaseDetail from "../purchaseDetail/PurchaseDetail.tsx";


const ListDeliveredPurchases = () => {

    const [deliveredPurchases, setDeliveredPurchases] = useState<Purchase[]>([]);
    const [_purchaseId, setPurchaseId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getDeliveredPurchases = async () => {
            try {
                const res = await axiosInstance.get('/purchases/delivered')
                setDeliveredPurchases(res.data)

            } catch (error) {
                console.error('Error in getDeliveredPurchases', error);
            }
        }
        getDeliveredPurchases();
    }, []);

    const handleGetPurchaseId = (purchase_id: number) => {
        setPurchaseId(purchase_id)
        setOpen(true);
    }

    const show = () => {
        setPurchaseId(null)
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
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Achats réceptionnés</h1>
                {!open ? <DataTableDeliveredPurchases deliveredPurchases={deliveredPurchases} getPurchaseId={handleGetPurchaseId} open={show}/> :
                    <PurchaseDetail />
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
export default ListDeliveredPurchases;