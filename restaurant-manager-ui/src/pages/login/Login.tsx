import Logo from "../../components/logo/Logo.tsx";
import {Link} from "react-router-dom"

const Login = () => {
    return (
        <section
            className={"w-full h-screen overflow-hidden bg-amber-50"}>
            <header className={"pl-10 pt-10"}>
                <Link to={"/"} className={"flex justify-start items-center"}>
                    <Logo/>
                    <p className={"font-inter text-center text-[#013220] hover:text-[#6B8E23] hover:underline text-base italic mt-12"}>Accueil</p>
                </Link>
            <h3 className={"font-inter text-5xl text-[#013220] text-center font-medium italic mt-12"}>La Branche d'Olivier</h3>
            </header>
            <main
                className={"w-[40%] h-[40vh] mx-auto mt-[20vh] bg-[url('./img/logo.png')] bg-top bg-no-repeat bg-cover rounded-full"}
            >
                <form
                    className={"w-full flex flex-col items-center justify-around gap-8 pt-20"}
                    noValidate
                >
                    <input type={"text"} placeholder={"Nom d'utilisateur"} className={"h-10 bg-white  placeholder:pl-2 rounded-md pl-2"}/>
                    <input type={"password"} placeholder={"mot de passe"} className={"h-10 bg-white  placeholder:pl-2 rounded-md pl-2"} />
                    <button type={"submit"} className={"h-10 bg-[#663399] hover:bg-amber-800 text-white px-16 cursor-pointer"}>Connexion</button>
                </form>
            </main>
        </section>
    );
};
export default Login;