import {rosters as rosterData} from "../../tempData.ts";
import {useEffect, useState} from "react";
import {Roster} from "../../types/types.ts";

const RosterOptions = () => {

    const [rosters, setRosters] = useState<Roster[]>([]);

    useEffect(() => {
        getRosters()
    }, []);

    const getRosters = () => {
        setRosters(rosterData);
    }
    return (
        <>
            <option>Choisir un horaire</option>
            {rosters.map((roster) => (
                <option key={roster.id}>{roster.roster}</option>
            ))}
        </>
    );
};
export default RosterOptions;