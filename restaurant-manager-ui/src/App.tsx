import {  RouterProvider, createBrowserRouter } from "react-router-dom"
import {Home} from "./pages/home/Home.tsx";
import {Menu} from "./pages/menu/Menu.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/menu",
            element: <Menu />
        }

    ])
   return <RouterProvider router={router} />
}

export default App
