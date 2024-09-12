import DashboardSidebar from "../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import DataTableBookings from "../../../components/dashboardComponents/dataTableBookings/DataTableBookings.tsx";
import {useState,useEffect} from "react";
import NewBooking from "../NewItemPages/newBooking/NewBooking.tsx";
import {Booking} from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";
import dayjs from "dayjs";
import useUsername from "../../../hooks/username/useUsername.tsx";



const ListBookings = () => {

    const {username} = useUsername()

    const [bookings, setBookings] = useState<Booking[]>([])
    const [bookingId, setBookingId] = useState<number | null>(null)
    const [open,setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const res = await axiosInstance.get('/bookings/')

                const formattedBookings = res.data.map((booking:Booking)  => ({
                    ...booking,
                    date: dayjs(booking.date).format('DD/MM/YYYY')
                }));
                setBookings(formattedBookings);
                setBookings(res.data)
            } catch (error) {
                console.error('Error in getBookings', error);
            }
        }
        getBookings()
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
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
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Réservations</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}
                {!open ? <DataTableBookings bookings={bookings} getBookingId={handleGetBookingId} open={show}/> :
                    <NewBooking id={bookingId}  bookings={bookings} onAddOrEdit={handleAddedOrEdited} close={close}/>}

            </div>
        </div>
    );
};
export default ListBookings;