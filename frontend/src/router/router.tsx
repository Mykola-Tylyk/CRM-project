import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { MainLayout } from "../layouts/MainLayout";
import { ActivatePage } from "../pages/activate-page/ActivatePage";
import { LoginPage } from "../pages/login-page/LoginPage";
import { NotFoundPage } from "../pages/not-found-page/NotFoundPage";
import { TableOrdersPage } from "../pages/table-orders-page/TableOrdersPage";
import { UsersPage } from "../pages/users-page/UsersPage";
import { AdminRoute } from "./admin.router";
import { ProtectedRoute } from "./protected.router";

const routes: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            { path: "", element: <Navigate to="login" replace /> },
            { path: "login", element: <LoginPage /> },
            {
                path: "activate/:token",
                element: <ActivatePage type={ActionTokenTypeEnum.ACTIVATE} />,
            },
            {
                path: "recovery/:token",
                element: <ActivatePage type={ActionTokenTypeEnum.RECOVERY} />,
            },
            { path: "*", element: <NotFoundPage /> },

            {
                element: <ProtectedRoute />,
                children: [
                    { path: "orders", element: <TableOrdersPage /> },

                    {
                        element: <AdminRoute />,
                        children: [
                            { path: "adminPanel", element: <UsersPage /> },
                        ],
                    },
                ],
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
