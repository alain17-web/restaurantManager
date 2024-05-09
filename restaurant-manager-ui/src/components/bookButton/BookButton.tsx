import {Link} from "react-router-dom"

const BookButton = () => {
    return (
        <Link to={"/about"}>
            <button className={"text-xl text-[#013220] hover:text-amber-50 hover:bg-[#013220] font-inter italic outline outline-2 outline-offset-1 outline-[#013220] px-4 py-2 rounded-md"}
            >
                Réserver
            </button>
        </Link>
    );
};

export default BookButton;