//import {Link} from "react-router-dom"
import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import Widget from "../../components/widget/Widget.tsx";
import TimeDisplay from "../../components/timeDisplay/TimeDisplay.tsx";
import {useState} from "react";
import DateDisplay from "../../components/dateDisplay/DateDisplay.tsx";

const Dashboard = () => {

    return (
        <section className={"h-auto flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>

                <div className={"flex p-5 gap-5"}>
                    <Widget type={"commandes"}/>
                    <Widget type={"reappros"}/>
                    <Widget type={"reservations"}/>
                </div>
                <div className={"w-[10%] h-auto mx-auto mt-16 bg-[#008080] p-2 rounded-xl"}>
                    <TimeDisplay/>
                </div>
                <DateDisplay/>


            </div>
        </section>
    );
};
export default Dashboard;