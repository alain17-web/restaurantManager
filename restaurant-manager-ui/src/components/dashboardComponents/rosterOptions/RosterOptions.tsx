import {useEffect, useState} from "react";
import {Roster} from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";

const RosterOptions = () => {

    const [rosters, setRosters] = useState<Roster[]>([]);

    // fetches all rosters from server when component mounts
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

    return (

        <>
            <option>Choisir un horaire</option>
            {/*map over all rosters and displays them */}
            {rosters.map((roster) => (
                <option key={roster.id} value={roster.id}>{roster.roster}</option>
            ))}
        </>
    );
};
export default RosterOptions;