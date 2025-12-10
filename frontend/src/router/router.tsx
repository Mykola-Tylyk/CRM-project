import { createBrowserRouter, RouteObject } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout";
import { TableOrdersPage } from "../pages/table-orders-page/TableOrdersPage";
import { UsersPage } from "../pages/users-page/UsersPage";

const routes: RouteObject[] = [
    {
        path: "",
        element: <MainLayout />,
        children: [
            { path: "adminPanel", element: <UsersPage /> },
            { path: "orders", element: <TableOrdersPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
