import {Link} from "react-router-dom"

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to={"/connexion"}>Back to Login</Link>
        </div>
    );
};
export default Dashboard;