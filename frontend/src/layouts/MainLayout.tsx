import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Preloader } from "../components/preloader/Preloader";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { authSliceActions } from "../redux/slices/authSlice/authSlice";

const MainLayout = () => {
    const { status } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (status === "idle") {
            dispatch(authSliceActions.me());
        }
    }, [dispatch]);

    if (status === "idle" || status === "loading") {
        return (
            <div>
                <Preloader mode={"global"} />
            </div>
        );
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export { MainLayout };
