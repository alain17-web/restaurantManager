import {Link} from "react-router-dom"

const Kitchen = () => {
    return (
        <div>
            <h1>Kitchen</h1>
            <Link to={"/connexion"}>Back to Login</Link>
        </div>
    );
};
export default Kitchen;