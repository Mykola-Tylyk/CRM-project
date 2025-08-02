import { createBrowserRouter, RouteObject } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { TableUsersPage } from "../pages/TableUsersPage";
import { TableOrdersPage } from "../pages/TableOrdersPage";

const routes: RouteObject[] = [
    {
        path:'',element:<MainLayout/>, children: [
            {path:'',element:<TableUsersPage/>},
            {path:'orders',element:<TableOrdersPage/>}
        ]
    }
]

export const router = createBrowserRouter(routes);