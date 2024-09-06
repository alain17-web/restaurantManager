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
    const [delivery_date, setDelivery_date] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1)

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
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    }

    const handleGetPurchaseIdAndDeliveryDate = (purchase_id: number, delivery_date: string) => {
        setPurchaseId(purchase_id)
        setDelivery_date(delivery_date)
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
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Achats en cours</h1>
                {!open ? <DataTablePurchases purchases={purchases} getPurchaseIdAndDeliveryDate={handleGetPurchaseIdAndDeliveryDate} open={show}/> :
                    <NewPurchase purchases={purchases} purchase_id={purchaseId} delivery_date={delivery_date} onAddOrEdit={handleAddedOrEdited} close={close}/>
                }
            </div>
        </div>
    );
};
export default ListPurchases;