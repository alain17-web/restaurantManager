
import {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";


const useTotalOnHand = () => {
    const [totalOnHand, setTotalOnHand] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
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

