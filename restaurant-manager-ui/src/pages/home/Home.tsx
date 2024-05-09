import { Link } from "react-router-dom"
import BookButton from "../../components/bookButton/BookButton.tsx";

export const Home = () => {
    return (

        <section className={"w-full h-[100vh] bg-[url('./img/dishes.jpg')] bg-no-repeat bg-center bg-cover flex flex-col items-center "}>
            <div className={"w-[80%] mt-5 flex justify-end"}>
                <BookButton/>
            </div>
            <h1 className={"font-inter text-6xl text-black text-center font-medium italic pt-[25%]"}>La Branche d'Olivier</h1>
            <Link to={"/menu"}>
                <button className={"w-[10vw] m-auto h-12 flex items-center justify-center rounded-2xl  px-12 py-auto mt-4 text-white bg-[#6B8E23] hover:text-[#013220] hover:bg-amber-50 hover: border-4 hover:border-[#013220]"}>Menu</button>
            </Link>
        </section>

    );
};