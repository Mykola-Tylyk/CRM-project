import { createBrowserRouter, RouteObject } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { UsersPage } from "../pages/UsersPage";
import { TableOrdersPage } from "../pages/TableOrdersPage";

const routes: RouteObject[] = [
    {
        path:'',element:<MainLayout/>, children: [
            {path:'adminPanel',element:<UsersPage/>},
            {path:'orders',element:<TableOrdersPage/>}
        ]
    }
]

export const router = createBrowserRouter(routes);