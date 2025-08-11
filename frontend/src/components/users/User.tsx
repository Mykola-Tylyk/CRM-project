import { IUser } from "../../interfaces/user.interface";
import { FC } from "react";
import "./User.css"

type TableRowPageProps = {
    user: IUser;
}

const User: FC<TableRowPageProps> = ({ user }) => {


    return (
        <div className={"div_wrapper_user"}>
            <div>_id: {user._id}</div>
            <div>email: {user.email}</div>
            <div>name: {user.name}</div>
            <div>surname: {user.surname}</div>
            <div>is_active: {user.isActive ? "true" : "false"}</div>
            <div>last_login: {user.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })
            : "null"}</div>
        </div>
    );
};

export { User };