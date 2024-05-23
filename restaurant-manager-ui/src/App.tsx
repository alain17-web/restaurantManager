import {  RouterProvider, createBrowserRouter } from "react-router-dom"
import {Home} from "./pages/home/Home.tsx";
import {Menu} from "./pages/menu/Menu.tsx";
import About from "./pages/about/About.tsx";
import Login from "./pages/login/Login.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Restaurant from "./pages/restaurant/Restaurant.tsx";
import Kitchen from "./pages/kitchen/Kitchen.tsx";
import Dishes from "./pages/dishes/Dishes.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/menu",
            element: <Menu />
        },
        {
            path: "/reservation-infos",
            element: <About />
        },
        {
            path: "/connexion",
            element: <Login />
        },
        {
            path: "/dashboard",
            element: <Dashboard />
        },
        {
            path: "/restaurant",
            element: <Restaurant />
        },
        {
            path: "/kitchen",
            element: <Kitchen />
        },
        {
            path: "/dishes",
            element: <Dishes />
        },


    ])
   return <RouterProvider router={router} />
}

export default App
