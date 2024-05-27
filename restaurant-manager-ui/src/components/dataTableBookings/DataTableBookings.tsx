import { bookings as bookingData} from "../../tempData.ts";
import {bookingsColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"

interface Booking {
    id:number
    date:string
    hour: string
    name:string
    email:string
    numberOfPeople: number
}

interface Props{
    open:() => void
}


const DataTableBookings = (props:Props) => {

    const [bookings, setBookings] = useState<Booking[]>([])

    useEffect(() => {
        getBookings()
    }, []);


    const getBookings = () => {
        setBookings(bookingData);
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <div className={"w-full flex items-center justify-between text-[24px] mb-[10px]"}>
                <button
                    onClick={props.open}
                    className={"no-underline text-green-600 text-xl font-normal bg-[#F0F8FF p-[5px] border-1 border-green-600 rounded-md cursor-pointer"}>
                    Ajouter une réservation
                </button>
            </div>
            <DataGrid
                rows={bookings}
                columns={bookingsColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableBookings;