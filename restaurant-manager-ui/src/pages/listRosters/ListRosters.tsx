import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useState,useEffect} from "react";
import {Roster} from "../../types/types.ts";
import DataTableRosters from "../../components/dataTableRosters/DataTableRosters.tsx";
import NewRoster from "../newRoster/NewRoster.tsx";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useUsername from "../../hooks/username/useUsername.tsx";

const ListRosters = () => {

    const [rosters,setRosters] = useState<Roster[]>([]);
    const [rosterId, setRosterId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

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
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    };

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

    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>o
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Horaires staff</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}
                {!open ? <DataTableRosters rosters={rosters} getRosterId={handleGetRosterId} open={show}/> :
                    <NewRoster id={rosterId}  rosters={rosters} onAddOrEdit={handleAddedOrEdited} close={close}/>}
            </div>
        </div>
    );
};
export default ListRosters;