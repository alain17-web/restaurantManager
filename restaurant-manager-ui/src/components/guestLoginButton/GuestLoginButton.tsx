import {Link} from "react-router-dom"

const GuestLoginButton = () => {
    return (
        <>
            <Link to="/loginGuest" className={"no-underline"}>
                <button
                    className={"text-base text-amber-50 bg-[#013220] hover:bg-[#008080] font-inter italic px-4 py-2 rounded-md mt-12"}
                >
                    Connexion guest
                </button>
            </Link>
        </>
    );
};
export default GuestLoginButton;
