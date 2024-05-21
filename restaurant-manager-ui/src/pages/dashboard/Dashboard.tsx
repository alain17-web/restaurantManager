//import {Link} from "react-router-dom"
import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";

const Dashboard = () => {
    return (
        <section className={"flex"}>
            <DashboardSidebar/>
            {/*<Link to={"/connexion"}>Back to Login</Link>*/}
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
            </div>
        </section>
    );
};
export default Dashboard;