import Logo from "../../components/logo/Logo.tsx";
import {Link,useNavigate} from "react-router-dom"
import {useState} from "react";
import {users} from '../../tempData.ts'

const Login = () => {

    const navigate = useNavigate();

    const adminsArray:string[] = []
    const waitersArray:string[] = []
    const cooksArray:string[] = []


        users.map((user) => {
            if(user.role === "admin"){
                adminsArray.push(user.username,user.password)
            }
            if(user.role === "waiter"){
                waitersArray.push(user.username,user.password)
            }
            if(user.role === "cook"){
                cooksArray.push(user.username,user.password)
            }

        })


    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false)
        console.log(username, password, adminsArray,waitersArray,cooksArray)
        if(adminsArray.includes(username.toLowerCase()) && adminsArray.includes(password.toLowerCase())){
            navigate("/dashboard");
        } else {
            setError(true)
        }

        if(waitersArray.includes(username.toLowerCase()) && waitersArray.includes(password.toLowerCase())){
            navigate("/restaurant");
        } else {
            setError(true)
        }

        if(cooksArray.includes(username.toLowerCase()) && cooksArray.includes(password.toLowerCase())){
            navigate("/kitchen");
        } else {
            setError(true)
        }
    }

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
                    onSubmit={handleSubmit}
                >
                    <input
                        type={"text"}
                        placeholder={"Nom d'utilisateur"}
                        className={"h-10 bg-white  placeholder:pl-2 rounded-md pl-2"}
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type={"password"}
                        placeholder={"mot de passe"}
                        className={"h-10 bg-white  placeholder:pl-2 rounded-md pl-2"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type={"submit"} className={"h-10 bg-[#663399] hover:bg-amber-800 text-white px-16 cursor-pointer"}>Connexion</button>
                </form>
            </main>
        </section>
    );
};
export default Login;