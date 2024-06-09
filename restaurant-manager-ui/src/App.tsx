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

function App() {

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
            element: <Dashboard/>
        },
        {
            path: "/restaurant",
            element: <Restaurant/>
        },
        {
            path: "/kitchen",
            element: <Kitchen/>
        },
        {
            path: "/listDishes",
            element: <ListDishes/>
        },
        {
            path: "/listDrinks",
            element: <ListDrinks/>
        },
        {
            path: "/listCategories",
            element: <ListCategories/>
        },
        {
            path: "/listActive",
            element: <ListActiveStaff/>
        },
        {
            path: "/listInactive",
            element: <ListInactiveStaff/>
        },
        {
            path: "/listRoles",
            element: <ListRoles/>
        },
        {
            path: "/listRosters",
            element: <ListRosters/>
        },
        {
            path: "/listOrders",
            element: <ListOrders/>
        },
        {
            path: "/listStockFood",
            element: <ListStockFood/>
        },
        {
            path: "/listStockDrinks",
            element: <ListStockDrinks/>
        },
        {
            path: "/listPurchases",
            element: <ListPurchases/>
        },
        {
            path: "/listFinances",
            element: <ListFinances/>
        },
        {
            path: "/listBookings",
            element: <ListBookings/>
        },


    ])
    return <RouterProvider router={router}/>
}

export default App
