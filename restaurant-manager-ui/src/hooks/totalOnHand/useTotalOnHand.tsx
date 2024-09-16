
import {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";

// Custom hook to fetch the total amount on hand (e.g., from financial records)
const useTotalOnHand = () => {
    const [totalOnHand, setTotalOnHand] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    // useEffect hook to fetch the data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            // Async function to fetch the total on hand from the backend
            try{
                const res = await axiosInstance.get('/finances/lastTotalOnHand')
                setTotalOnHand(res.data)
            }catch(error){
                console.error('Error in getTotalOnHand hook', error);
                setError('Failed to fetch totalOnHand');
            }
        }
        fetchData()
    }, []);
    return { totalOnHand,error }
};
export default useTotalOnHand;

