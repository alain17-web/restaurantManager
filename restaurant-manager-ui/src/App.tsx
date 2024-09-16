import 'react-confirm-alert/src/react-confirm-alert.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import {Home} from "./pages/publicPages/home/Home.tsx";
import {Menu} from "./pages/publicPages/menu/Menu.tsx";
import About from "./pages/publicPages/about/About.tsx";
import Login from "./pages/publicPages/login/Login.tsx";
import Dashboard from "./pages/dashboardPages/dashboard/Dashboard.tsx";
import Restaurant from "./pages/privatePages/restaurant/Restaurant.tsx";
import Kitchen from "./pages/privatePages/kitchen/Kitchen.tsx";
import ListDishes from "./pages/dashboardPages/listPages/listDishes/ListDishes.tsx";
import ListDrinks from "./pages/dashboardPages/listPages/listDrinks/ListDrinks.tsx";
import ListActiveStaff from "./pages/dashboardPages/listPages/listActiveStaff/ListActiveStaff.tsx";
import ListInactiveStaff from "./pages/dashboardPages/listPages/listInactiveStaff/ListInactiveStaff.tsx";
import ListOrders from "./pages/dashboardPages/listPages/listOrders/ListOrders.tsx";
import ListPurchases from "./pages/dashboardPages/listPages/listPurchases/ListPurchases.tsx";
import ListBookings from "./pages/dashboardPages/listPages/listBookings/ListBookings.tsx";
import ListStock from "./pages/dashboardPages/listPages/listStock/ListStock.tsx";
import ListCategories from "./pages/dashboardPages/listPages/listCategories/ListCategories.tsx";
import ListRoles from "./pages/dashboardPages/listPages/listRoles/ListRoles.tsx";
import ListRosters from "./pages/dashboardPages/listPages/listRosters/ListRosters.tsx";
import ListFinances from "./pages/dashboardPages/listPages/listFinances/ListFinances.tsx";
import ProtectedRoutes from "./components/generalComponents/protectedRoutes/ProtectedRoutes.tsx";
import {AuthProvider} from "./context/authContext/AuthContext.tsx";
import {NotifProvider} from "./context/notifContext/NotifContext.tsx";
import ListDeliveredPurchases from "./pages/dashboardPages/listPages/listDeliveredPurchases/ListDeliveredPurchases.tsx";
import GuestLogin from "./pages/publicPages/guestLogin/GuestLogin.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/menu",
        element: <Menu/>
    },
    {
        path: "/reservation-infos",
        element: <About/>
    },
    {
        path: "/connexion",
        element: <Login/>
    },
    {
        path: "/loginGuest",
        element: <GuestLogin/>
    },
    {

        path: "/dashboard",
        element:
            <ProtectedRoutes rolesAllowed={[1,10]}>
                <Dashboard/>
            </ProtectedRoutes>
    },
    {
        path: "/restaurant",
        element:
            <ProtectedRoutes rolesAllowed={[1, 2,10]}>
                <Restaurant/>
            </ProtectedRoutes>

    },
    {
        path: "/kitchen",
        element:
            <ProtectedRoutes rolesAllowed={[1, 9, 10]}>
                <Kitchen/>
            </ProtectedRoutes>

    },
    {
        path: "/listDishes",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListDishes/>
            </ProtectedRoutes>

    },
    {
        path: "/listDrinks",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListDrinks/>
            </ProtectedRoutes>

    },
    {
        path: "/listCategories",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListCategories/>
            </ProtectedRoutes>

    },
    {
        path: "/listActive",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListActiveStaff/>
            </ProtectedRoutes>

    },
    {
        path: "/listInactive",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListInactiveStaff/>
            </ProtectedRoutes>

    },
    {
        path: "/listRoles",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListRoles/>
            </ProtectedRoutes>

    },
    {
        path: "/listRosters",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListRosters/>
            </ProtectedRoutes>

    },
    {
        path: "/listOrders",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListOrders/>
            </ProtectedRoutes>

    },
    {
        path: "/listStock",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListStock/>
            </ProtectedRoutes>
    },

    {
        path: "/listPurchases",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListPurchases/>
            </ProtectedRoutes>

    },
    {
        path: "/listDeliveredPurchases",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListDeliveredPurchases/>
            </ProtectedRoutes>
    },
    {
        path: "/listFinances",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListFinances/>
            </ProtectedRoutes>

    },
    {
        path: "/listBookings",
        element:
            <ProtectedRoutes rolesAllowed={[1, 10]}>
                <ListBookings/>
            </ProtectedRoutes>

    },


])
const App = () => (
    <AuthProvider>
        <NotifProvider>
            <RouterProvider router={router}/>
        </NotifProvider>
    </AuthProvider>
)


export default App
