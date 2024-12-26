import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";

import Login from "./routes/dashboard/login/Login";
import DashboardPage from "./component/page";
import Service from "./component/service/Service";
import Servicefront from "./component/service/Servicefront";
import Client from "./component/Client";
import { SiBlogger } from "react-icons/si";
import Blog from "./component/blog/Blog";
import Clientfront from "./component/client/Clientfront";
import Featurefront from "./component/feature/Featurefront";
import Featureform from "./component/feature/Featureform";
import Investment from "./component/investment/Investment";
import Investmentform from "./component/investment/Investmentform";



function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/blogform",
                    element: <DashboardPage />,
                },
                {
                    path: "/blogfront",
                    element: <Blog />,
                },
             
                {
                    path: "/servicesfront",
                    element: <Servicefront />,
                },
                {
                    path: "/serviceform",
                    element: <Service />,
                },
                {
                    path: "/clientfront",
                    element: <Clientfront />,
                },
                {
                    path: "/clientform",
                    element: <Client />,
                },


                {
                    path: "/featurefront",
                    element: <Featurefront />,
                },
                {
                    path: "/featureform",
                    element: <Featureform />,
                },

                {
                    path: "/investmentfront",
                    element: <Investment />,
                },
                {
                    path: "/investmentform",
                    element: <Investmentform />,
                },

            ],
        },
        {
            path: "/login",
            element: <Login />,
        },

       
    ]);



    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
