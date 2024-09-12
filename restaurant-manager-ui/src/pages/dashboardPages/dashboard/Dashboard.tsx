import DashboardSidebar from "../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import Widget from "../../../components/dashboardComponents/widget/Widget.tsx";
import TimeDisplay from "../../../components/generalComponents/timeDisplay/TimeDisplay.tsx";
import DateDisplay from "../../../components/generalComponents/dateDisplay/DateDisplay.tsx";
import RosterCard from "../../../components/dashboardComponents/rosterCard/RosterCard.tsx";

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
                <h2 className={"text-center text-gray-500 text-2xl font-inter font-bold my-5"}>Shift du jour</h2>
                <div className={"flex p-5 gap-5"}>
                    <RosterCard/>
                </div>
            </div>
        </section>
    );
};
export default Dashboard;