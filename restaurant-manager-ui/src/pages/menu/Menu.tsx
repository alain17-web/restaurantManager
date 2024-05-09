import Navbar from "../../components/navbar/Navbar.tsx";
import {dishes} from '../../tempData.ts'
import MenuSidebar from "../../components/menuSidebar/MenuSidebar.tsx";


export const Menu = () => {
    return (
        <section className={"w-full h-screen bg-no-repeat bg-center bg-cover"}
                 style={{backgroundImage: `url('./img/scenery.jpg')`}}>
            <Navbar/>
            <h1 className={"text-center text-5xl font-inter italic text-[#013220] mt-16"}>Bienvenue - مَرْحَباً - ברוך
                הבא</h1>
           <section className={"w-full flex"}>
               <MenuSidebar/>
            <main className={"w-[80%] mx-auto mt-12"}>
                <ul className={"w-[60%] mx-auto"}>
                    <h3 className={"font-inter italic text-2xl text-amber-50 underline mb-5"}>Les Mezzes</h3>
                    {dishes.map((dish) => (
                        <div key={dish.id}>
                            {dish.cat === "Mezzes" ? (
                                <li className={"list-none"}>
                                    <h3 className={"font-inter italic text-xl text-[#013220] font-bold"}>{dish.name} - {dish.price + "€"}</h3>
                                    <p className={"mb-4 text-lg text-[#013220] font-inter italic semibold"}>{dish.desc}</p>
                                </li>
                            ) : ""}
                        </div>
                    ))}

                </ul>
            </main>
           </section>
        </section>
    );
};