import {Link} from "react-router-dom"

const MenuButton = () => {
    return (
        <Link to={"/menu"}>
            <button className={"w-[10vw] m-auto h-12 flex items-center justify-center rounded-2xl  px-12 py-auto mt-4 text-white bg-[#6B8E23] hover:text-[#013220] hover:bg-amber-50 hover: border-4 hover:border-[#013220]"}>Menu</button>
        </Link>
    );
};
export default MenuButton;