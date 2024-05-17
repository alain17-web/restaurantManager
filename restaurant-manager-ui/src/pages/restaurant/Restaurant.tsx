import {Link} from "react-router-dom"

const Restaurant = () => {
    return (
        <div>
            <h1>Restaurant</h1>
            <Link to={"/connexion"}>Back to Login</Link>
        </div>
    );
};
export default Restaurant;