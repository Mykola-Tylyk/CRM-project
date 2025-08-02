import { IUser } from "../../interfaces/user.interface";
import { FC } from "react";

type TableRowPageProps = {
    user: IUser;
    index: number;
}

const TableUserRow:FC<TableRowPageProps> = ({user, index}) => {


    return (
        <tr style={{
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
        }}>
            <td style={{ padding: "10px" }}>{user._id}</td>
            <td style={{ padding: "10px" }}>{user.name}</td>
            <td style={{ padding: "10px" }}>{user.surname}</td>
            <td style={{ padding: "10px" }}>{user.age}</td>
            <td style={{ padding: "10px" }}>{new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}</td>
        </tr>
    );
};

export { TableUserRow };