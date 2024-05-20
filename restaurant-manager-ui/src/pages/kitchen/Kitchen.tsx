import {Link} from "react-router-dom"

const Kitchen = () => {
    return (
        <section className={'w-full h-screen bg-[url(\'./img/kitchen.jpg\')] bg-center bg-no-repeat bg-cover overflow-hidden'}>
            <Link to={"/connexion"}>Back to Login</Link>
        </section>
    );
};
export default Kitchen;