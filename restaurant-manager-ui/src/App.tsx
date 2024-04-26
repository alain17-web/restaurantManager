import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import {Home} from "./pages/home/Home.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
    ])
   return <RouterProvider router={router} />
}

export default App
