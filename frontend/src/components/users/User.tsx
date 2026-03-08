import "./User.css";

import { FC, useState } from "react";

import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum";
import { IUser } from "../../interfaces/user.interface";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { authSliceActions } from "../../redux/slices/authSlice/authSlice";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice";

type TableRowPageProps = {
    user: IUser;
};

const User: FC<TableRowPageProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState<string | null>(null);

    const handleActivate = async (type: ActionTokenTypeEnum) => {
        const userId = user._id;
        try {
            const url = await dispatch(
                authSliceActions.getActionUserToken({ userId, type }),
            ).unwrap();

            // eslint-disable-next-line no-undef
            await navigator.clipboard.writeText(url);

            setMessage("URL copied to clipboard");

            setTimeout(() => {
                setMessage(null);
            }, 5000);
        } catch (e) {
            console.error(e);
            setMessage("Error coping URL");

            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    const handleBan = () => {
        const userId = user._id;
        dispatch(userSliceActions.banUser(userId));
    };

    const handleUnban = () => {
        const userId = user._id;
        dispatch(userSliceActions.unbanUser(userId));
    };

    return (
        <div className={"div_wrapper__user"}>
            <div className={"div_info__user"}>
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
            <div>
                <div className={"div_wrapper_buttons__user"}>
                    <button
                        className={"buttons__user"}
                        onClick={() =>
                            handleActivate(
                                user.isActive
                                    ? ActionTokenTypeEnum.RECOVERY
                                    : ActionTokenTypeEnum.ACTIVATE,
                            )
                        }
                    >
                        {user.isActive ? "RECOVERY PASSWORD" : "ACTIVATE"}
                    </button>
                    <button
                        className={"buttons__user"}
                        onClick={() => handleBan()}
                    >
                        BAN
                    </button>
                    <button
                        className={"buttons__user"}
                        onClick={() => handleUnban()}
                    >
                        UNBAN
                    </button>
                </div>
                {message && <div>{message}</div>}
            </div>
        </div>
    );
};

export { User };
