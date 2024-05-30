import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableBookings from "../../components/dataTableBookings/DataTableBookings.tsx";
import {useState,useEffect} from "react";
import NewBooking from "../newBooking/NewBooking.tsx";
import { bookings as bookingData} from "../../tempData.ts";
import {Booking} from "../../types/types.ts";


const ListBookings = () => {

    const [_bookings, setBookings] = useState<Booking[]>([])
    const [bookingId, setBookingId] = useState<number | null>(null)
    const [open,setOpen] = useState<boolean>(false);

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        setBookings(bookingData);
    };


    const handleGetBookingId = (id: number) => {
        setBookingId(id)
        setOpen(true);
    }

    const show = () => {
        setBookingId(null)
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
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Réservations</h1>
                {!open ? <DataTableBookings getBookingId={handleGetBookingId} open={show}/> : <NewBooking id={bookingId} setBookingId={setBookingId}/>}
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
export default ListBookings;