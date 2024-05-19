import {dishes} from "../../tempData.ts";
import {useState} from "react";

 const NewOrder = () => {

     const [number,setNumber] = useState<Number>(0)

     setNumber(Math.floor(Math.random() * 11))

    return (
        <div>

        </div>
    );
};
export default NewOrder;