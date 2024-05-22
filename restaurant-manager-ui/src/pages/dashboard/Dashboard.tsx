//import {Link} from "react-router-dom"
import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import Widget from "../../components/widget/Widget.tsx";

const Dashboard = () => {
    return (
        <section className={"flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>

                <div className={"flex p-5 gap-5"}>
                <Widget type={"commandes"}/>
                <Widget type={"reappros"}/>
                <Widget type={"reservations"}/>
                </div>
            </div>
        </section>
    );
};
export default Dashboard;