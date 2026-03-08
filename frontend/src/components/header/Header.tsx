import "./Header.css";

import { Link, useNavigate } from "react-router-dom";

import { RoleEnum } from "../../enums/role.enum";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { authSliceActions } from "../../redux/slices/authSlice/authSlice";

const Header = () => {
    const { user } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await dispatch(authSliceActions.logout());
        navigate("/login");
    };

    const admin = () => {
        navigate("/adminPanel");
    };

    return (
        <div className={"header_div"}>
            <div className={"header_div_logo"}>
                <Link to="/orders" className={"header_link_logo"}>
                    <h3>Logo</h3>
                </Link>
            </div>
            <div className={"header_buttons_div"}>
                {user && <p>{user.name}</p>}
                {user && user.role === RoleEnum.ADMIN && (
                    <button className={"header_button"} onClick={admin}>
                        <img src="/img/Admin.png" alt="Admin" />
                    </button>
                )}
                <button className={"header_button"} onClick={logout}>
                    <img src="/img/LogOut.png" alt="LogOut" />
                </button>
            </div>
        </div>
    );
};

export { Header };
