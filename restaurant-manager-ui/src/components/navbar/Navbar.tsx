import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <nav className={"w-full h-[100px] flex items-center justify-around bg-transparent pt-12"}>

            <Link to={"/"} className={"w-auto h-32 flex items-center justify-between"}>
                <img
                    src={"./img/logo.png"}
                    alt={"olive branch"}
                    width={"80x"}
                    height={"80px"}
                    className={"border-2 border-[#013220] bg-amber-50 p-2 rounded-full"}
                />
                <h3 className={"font-inter text-[#013220] text-xl italic ml-5"}>La Branche d'Oliver</h3>
            </Link>

            <p className={"text-base text-[#013220] font-inter italic"}>Ouvert tous les jours de midi à 22h30</p>
            <p className={"text-base text-[#013220] font-inter italic"}>010/345 67 89</p>
            <p className={"text-base text-[#013220] font-inter italic"}>Louvain-la-Neuve</p>
        </nav>
    );
};

export default Navbar