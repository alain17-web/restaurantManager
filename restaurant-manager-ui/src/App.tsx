import 'react-confirm-alert/src/react-confirm-alert.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import {Home} from "./pages/home/Home.tsx";
import {Menu} from "./pages/menu/Menu.tsx";
import About from "./pages/about/About.tsx";
import Login from "./pages/login/Login.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Restaurant from "./pages/restaurant/Restaurant.tsx";
import Kitchen from "./pages/kitchen/Kitchen.tsx";
import ListDishes from "./pages/listDishes/ListDishes.tsx";
import ListDrinks from "./pages/listDrinks/ListDrinks.tsx";
import ListActiveStaff from "./pages/listActiveStaff/ListActiveStaff.tsx";
import ListInactiveStaff from "./pages/listInactiveStaff/ListInactiveStaff.tsx";
import ListOrders from "./pages/listOrders/ListOrders.tsx";
import ListPurchases from "./pages/listPurchases/ListPurchases.tsx";
import ListBookings from "./pages/listBookings/ListBookings.tsx";
import ListStock from "./pages/listStock/ListStock.tsx";
import ListCategories from "./pages/listCategories/ListCategories.tsx";
import ListRoles from "./pages/listRoles/ListRoles.tsx";
import ListRosters from "./pages/listRosters/ListRosters.tsx";
import ListFinances from "./pages/listFinances/ListFinances.tsx";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes.tsx";
import {AuthProvider} from "./context/authContext/AuthContext.tsx";
import {NotifProvider} from "./context/notifContext/NotifContext.tsx";
import ListDeliveredPurchases from "./pages/listDeliveredPurchases/ListDeliveredPurchases.tsx";


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
