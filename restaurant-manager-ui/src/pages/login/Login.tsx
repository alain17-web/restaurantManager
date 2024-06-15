
import Logo from "../../components/logo/Logo.tsx";
import {Link, useNavigate} from "react-router-dom"
import {FormEvent, useEffect, useState} from "react";
import axios from "axios"
import { useAuth } from '../../context/AuthContext';

const Login = () => {

    const navigate = useNavigate();

    const { dispatch } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [failed, setFailed] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [allFieldsValid, setAllFieldsValid] = useState<boolean>(false)

    const validateUsername = () => {
        if (username === "" || !/^[A-Za-z0-9 ]{4,25}$/.test(username)) {
            setUsernameError("identifiant requis");
        } else {
            setUsernameError("");
        }
    }

    const validatePassword = () => {
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
    }, [username, password])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false)
        setFailed(false)
        validateUsername()
        validatePassword()

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            },{
                withCredentials: true
            })

            const { token, employee } = res.data;


            if (token) {
                dispatch({ type: 'LOGIN', payload: token });
                localStorage.setItem("token", token);
            } else {
                console.error('No token found in response');
            }

            if (employee && employee.role_id) {
                if (employee.role_id === 1) {
                    navigate("/dashboard")
                } else if (employee.role_id === 2) {
                    navigate('/restaurant')
                } else if (employee.role_id === 9) {
                    navigate("/kitchen")
                } else {
                    setFailed(true)
                }
            } else {
                setFailed(true);
            }
        } catch (error) {
            setError(true)
            console.error(error)
        }
    }

    return (
        <section
            className={"w-full h-screen overflow-hidden bg-amber-50"}>
            <header className={"pl-10 pt-10"}>
                <Link to={"/"} className={"w-24 flex justify-start items-center"}>
                    <Logo/>
                    <p className={"font-inter text-center text-[#013220] hover:text-[#6B8E23] hover:underline text-base italic mt-12 ml-4"}>Accueil</p>
                </Link>
                <h3 className={"text-5xl text-[#013220] text-center font-inter font-medium italic mt-12"}>La Branche
                    d'Olivier</h3>
                {error && <p className={"text-red-500 text-xl text-center font-inter mt-5"}> Identifiant ou mot de passe
                    incorrect</p>}
                {failed &&
                    <p className={"text-red-500 text-xl text-center font-inter mt-5"}> La connexion a échouée</p>}
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
