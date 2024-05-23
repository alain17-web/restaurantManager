import {Link} from "react-router-dom"


const MenuButton = () => {
    return (
        <Link to={"/menu"} className={"no-underline"}>
            <button
                className={"w-[10vw] m-auto h-12 flex items-center justify-center rounded-2xl px-12 py-auto text-white  bg-[#6B8E23] hover:bg-[#008080] border-4 border-white hover:border-4 hover:border-[#013220]"}>Menu
            </button>
        </Link>
    );
};
export default MenuButton;




