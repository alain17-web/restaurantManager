import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useState,useEffect} from "react";
import {Roster} from "../../types/types.ts";
import DataTableRosters from "../../components/dataTableRosters/DataTableRosters.tsx";
import NewRoster from "../newRoster/NewRoster.tsx";
import axiosInstance from "../../axios/axiosInstance.tsx";

const ListRosters = () => {

    const [rosters,setRosters] = useState<Roster[]>([]);
    const [rosterId, setRosterId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const getRosters = async () => {
            try {
                const res = await axiosInstance.get('/rosters/')
                setRosters(res.data)
            } catch (error) {
                console.error('Error in getRosters', error);
            }
        }
        getRosters()
    }, []);

    const handleGetRosterId = (id: number) => {
        setRosterId(id)
        setOpen(true);
    }

    const show = () => {
        setRosterId(null)
        setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }

    return (
        <div className={"w-full flex"}>o
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Horaires staff</h1>
                {!open ? <DataTableRosters rosters={rosters} getRosterId={handleGetRosterId} open={show}/> :
                    <NewRoster id={rosterId} setRosterId={setRosterId} rosters={rosters}/>}
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
export default ListRosters;