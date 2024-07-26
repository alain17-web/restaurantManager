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
import ListStockFood from "./pages/listStockFood/ListStockFood.tsx";
import ListStockDrinks from "./pages/listStockDrinks/ListStockDrinks.tsx";
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
            <ProtectedRoutes rolesAllowed={[1]}>
                <Dashboard/>
            </ProtectedRoutes>
    },
    {
        path: "/restaurant",
        element:
            <ProtectedRoutes rolesAllowed={[1, 2]}>
                <Restaurant/>
            </ProtectedRoutes>

    },
    {
        path: "/kitchen",
        element:
            <ProtectedRoutes rolesAllowed={[1, 9]}>
                <Kitchen/>
            </ProtectedRoutes>

    },
    {
        path: "/listDishes",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListDishes/>
            </ProtectedRoutes>

    },
    {
        path: "/listDrinks",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListDrinks/>
            </ProtectedRoutes>

    },
    {
        path: "/listCategories",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListCategories/>
            </ProtectedRoutes>

    },
    {
        path: "/listActive",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListActiveStaff/>
            </ProtectedRoutes>

    },
    {
        path: "/listInactive",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListInactiveStaff/>
            </ProtectedRoutes>

    },
    {
        path: "/listRoles",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListRoles/>
            </ProtectedRoutes>

    },
    {
        path: "/listRosters",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListRosters/>
            </ProtectedRoutes>

    },
    {
        path: "/listOrders",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListOrders/>
            </ProtectedRoutes>

    },
    {
        path: "/listStockFood",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListStockFood/>
            </ProtectedRoutes>
    },
    {
        path: "/listStockDrinks",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListStockDrinks/>
            </ProtectedRoutes>

    },
    {
        path: "/listPurchases",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListPurchases/>
            </ProtectedRoutes>

    },
    {
        path: "/listDeliveredPurchases",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListDeliveredPurchases/>
            </ProtectedRoutes>
    },
    {
        path: "/listFinances",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
                <ListFinances/>
            </ProtectedRoutes>

    },
    {
        path: "/listBookings",
        element:
            <ProtectedRoutes rolesAllowed={[1]}>
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
