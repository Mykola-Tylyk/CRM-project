import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/hooks/useAppSelector";

export const ProtectedRoute = () => {
    const { user, status } = useAppSelector((state) => state.authSlice);

    if (status === "loading" || status === "idle") {
        return null;
    }

    if (!user) {
        return <Navigate to="/login?sessionExpired=true" replace />;
    }

    return <Outlet />;
};
