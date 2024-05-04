import { Link } from "react-router-dom"

export const Home = () => {
    return (

        <div className={"w-full h-[100vh] bg-[url('./img/dishes.jpg')] bg-no-repeat bg-center bg-cover flex flex-col items-center "}>
            <h1 className={"font-inter text-6xl text-[#013220] text-center font-medium italic pt-[25%]"}>The Olive branch</h1>
            <Link>
                <button className={"w-[10vw] m-auto h-12 flex items-center justify-center rounded-2xl  px-12 py-auto mt-4 text-white bg-[#013220] hover:text-[#013220] hover:bg-white hover: border-2 hover:border-[#013220]"}>Menu</button>
            </Link>
        </div>

    );
};