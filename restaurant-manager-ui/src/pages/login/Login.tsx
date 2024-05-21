import Logo from "../../components/logo/Logo.tsx";
import {Link,useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
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
    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [allFieldsValid, setAllFieldsValid] = useState<boolean>(false)

    const validateUsername = () => {
        setUsernameError('')
        if (username === "" || !/^[A-Za-z0-9 ]{4,25}$/.test(username)) {
            setUsernameError("identifiant requis");
        } else {
            setUsernameError("");
        }
    }

    const validatePassword = () => {
        setPasswordError('')
        if (password === "" || !/^[A-Za-z0-9 ]{4,25}$/.test(password)) {
            setPasswordError("mdp requis");
        } else {
            setUsernameError("");
        }
    }

    const handlePwdFocus = () => {
        validateUsername()
    }

    const handlSubmitFocus = () => {
        validatePassword()
    }

    useEffect(() => {
        setAllFieldsValid(
            username !== "" && /^[A-Za-z]{3,25}$/.test(username) &&
            password !== "" && /^[A-Za-z]{4,25}$/.test(password)
        )
    },[username, password])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false)
        validateUsername()
        validatePassword()
        if(adminsArray.includes(username.toLowerCase()) && adminsArray.includes(password.toLowerCase())){
            localStorage.setItem("username",username)
            navigate("/dashboard");
        } else {
            setError(true)
        }

        if(waitersArray.includes(username.toLowerCase()) && waitersArray.includes(password.toLowerCase())){
            localStorage.setItem("username",username)
            navigate("/restaurant");
        } else {
            setError(true)
        }

        if(cooksArray.includes(username.toLowerCase()) && cooksArray.includes(password.toLowerCase())){
            localStorage.setItem("username",username)
            navigate("/kitchen");
        } else {
            setError(true)
        }
    }

    console.log(waitersArray)

    return (
        <section
            className={"w-full h-screen overflow-hidden bg-amber-50"}>
            <header className={"pl-10 pt-10"}>
                <Link to={"/"} className={"w-24 flex justify-start items-center"}>
                    <Logo/>
                    <p className={"font-inter text-center text-[#013220] hover:text-[#6B8E23] hover:underline text-base italic mt-12 ml-4"}>Accueil</p>
                </Link>
            <h3 className={"text-5xl text-[#013220] text-center font-inter font-medium italic mt-12"}>La Branche d'Olivier</h3>
                {error && <p className={"text-red-500 text-xl text-center font-inter mt-5"}>Identifiant ou mot de passe incorrect</p>}
            </header>
            <main
                className={"w-[40%] h-[40vh] mx-auto mt-[20vh] bg-[url('./img/logo.png')] bg-top bg-no-repeat bg-cover rounded-full"}
            >
                <form
                    className={"w-full flex flex-col items-center justify-around gap-8 pt-20"}
                    noValidate
                    autoComplete={"off"}
                    onSubmit={handleSubmit}
                >
                    <input
                        type={"text"}
                        placeholder={!usernameError ? "Identifiant" : usernameError}
                        className={usernameError ? "h-10 bg-white placeholder:text-red-500  placeholder:pl-2 rounded-md pl-2 border border-red-500" : "h-10 bg-white placeholder:pl-2 rounded-md pl-2"}
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={validateUsername}
                    />
                    <input
                        type={"password"}
                        placeholder={!passwordError ? "mot de passe" : passwordError}
                        className={passwordError ? "h-10 bg-white placeholder:text-red-500  placeholder:pl-2 rounded-md pl-2 border border-red-500" : "h-10 bg-white placeholder:pl-2 rounded-md pl-2"}
                        required
                        autoComplete={"new-password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePassword}
                        onFocus={handlePwdFocus}
                    />
                    <button
                        type={"submit"}
                        className={!allFieldsValid ? "h-10 bg-[#663399] hover:bg-amber-800 text-white px-16 cursor-not-allowed" : "h-10 bg-[#663399] hover:bg-amber-800 text-white px-16 cursor-pointer"}
                        disabled={!allFieldsValid ? true : false}
                        onFocus={handlSubmitFocus}

                    >
                        Connexion
                    </button>
                </form>
            </main>
        </section>
    );
};
export default Login;