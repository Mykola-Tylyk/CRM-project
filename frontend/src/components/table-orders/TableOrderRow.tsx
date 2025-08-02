import { FC } from "react";
import { IOrder } from "../../interfaces/order.interface";

type TableRowPageProps = {
    order: IOrder;
    index: number;
}

const TableOrderRow: FC<TableRowPageProps> = ({ order, index }) => {

    const displayValue = (value: any) => {
        if (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "")
        ) {
            return "null";
        }
        return value;
    };


    return (
        <tr style={{
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
        }}>
            <td style={{ padding: "5px" }}>{displayValue(order._id)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.name)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.surname)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.email)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.age)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.course)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.course_format)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.course_type)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.status)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.sum)}</td>
            <td style={{ padding: "5px" }}>{displayValue(order.already_paid)}</td>
            <td style={{ padding: "5px" }}>{new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}</td>
        </tr>
    );
};

export { TableOrderRow };