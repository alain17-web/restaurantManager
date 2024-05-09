 import { drinks} from '../../tempData.ts'
 import Softs from "../softs/Softs.tsx";
 import Wines from "../wines/Wines.tsx";
 import Beers from "../beers/Beers.tsx";
 import WarmDrinks from "../warmDrinks/WarmDrinks.tsx";

const Drinks = () => {
    return (
        <main className={"w-full h-auto flex flex-col mt-20"}>
            <h3 className={"text-2xl font-inter underline"}>Boissons</h3>
            <Softs/>
            <Wines/>
            <Beers/>
            <WarmDrinks/>
        </main>
    );
};

 export default Drinks;