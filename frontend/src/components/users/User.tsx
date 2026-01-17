import "./User.css";

import { FC } from "react";

import { IUser } from "../../interfaces/user.interface";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice";

type TableRowPageProps = {
    user: IUser;
};

const User: FC<TableRowPageProps> = ({ user }) => {
    const dispatch = useAppDispatch();

    const handleBan = async () => {
        const userId = user._id;
        dispatch(userSliceActions.banUser(userId));
    };

    const handleUnban = async () => {
        const userId = user._id;
        dispatch(userSliceActions.unbanUser(userId));
    };

    return (
        <div className={"div_wrapper_user"}>
            <div className={"div_info_user"}>
                <div>_id: {user._id}</div>
                <div>email: {user.email}</div>
                <div>name: {user.name}</div>
                <div>surname: {user.surname}</div>
                <div>is_active: {user.isActive ? "true" : "false"}</div>
                <div>
                    last_login:{" "}
                    {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                          })
                        : "null"}
                </div>
            </div>
            <div className={"div_wrapper_buttons_user"}>
                <button className={"buttons_user"}>ACTIVATE</button>
                <button className={"buttons_user"} onClick={() => handleBan()}>
                    BAN
                </button>
                <button
                    className={"buttons_user"}
                    onClick={() => handleUnban()}
                >
                    UNBAN
                </button>
            </div>
        </div>
    );
};

export { User };
