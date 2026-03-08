import { Navigate, Outlet } from "react-router-dom";

import { NotFoundPage } from "../pages/not-found-page/NotFoundPage";
import { useAppSelector } from "../redux/hooks/useAppSelector";

export const AdminRoute = () => {
    const { user, status } = useAppSelector((state) => state.authSlice);

    if (status === "loading") return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <NotFoundPage />;
    }

    return <Outlet />;
};
