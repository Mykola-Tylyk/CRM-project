import "./TableOrderRow.css";

import { FC, useState } from "react";

import { IOrder } from "../../interfaces/order.interface";
import { CommentsList } from "../comments/commentsList/CommentsList";

type TableRowPageProps = {
    order: IOrder;
    index: number;
    colSpanLength: number;
    isSelected: boolean;
    onClick: () => void;
    selectedOrderId: string | null;
};

const TableOrderRow: FC<TableRowPageProps> = ({
    order,
    index,
    colSpanLength,
    isSelected,
    onClick,
    selectedOrderId,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const displayValue = (value: string | number | null | undefined) => {
        if (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "")
        ) {
            return "null";
        }
        return value;
    };

    const tableRowHoveredOrSelected = `
     row_style__table_order_row 
         ${index % 2 === 0 ? "even" : "odd"} 
         ${isHovered ? "hovered" : ""} 
         ${isSelected ? "selected" : ""}
        `;

    const openDataWindowInTable = `
    table_data__table_order_row
        ${index % 2 === 0 ? "even" : "odd"}
    `;

    return (
        <>
            <tr
                className={tableRowHoveredOrSelected}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
            >
                <td className={"table_data__table_order_row"}>
                    {displayValue(order._id)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.name)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.surname)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.email)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.phone)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.age)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.course)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.course_format)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.course_type)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.status)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.sum)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.already_paid)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.group)}
                </td>
                <td className={"table_data__table_order_row"}>
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                    })}
                </td>
                <td className={"table_data__table_order_row"}>
                    {displayValue(order.user_name)}
                </td>
            </tr>
            {isSelected && (
                <tr>
                    <td
                        colSpan={colSpanLength}
                        className={openDataWindowInTable}
                    >
                        <div
                            className={
                                "div_wrapper_open_data_window__table_order_row"
                            }
                        >
                            <div>
                                <div
                                    className={
                                        "div_message_utm_open_data_window__table_order_row"
                                    }
                                >
                                    Message: {displayValue(order.msg)}
                                </div>
                                <div
                                    className={
                                        "div_message_utm_open_data_window__table_order_row"
                                    }
                                >
                                    UTM: {displayValue(order.utm)}
                                </div>
                            </div>
                            <div
                                className={
                                    "div_wrapper_comments_list_open_data_window__table_order_row"
                                }
                            >
                                <CommentsList
                                    selectedOrderId={selectedOrderId}
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export { TableOrderRow };
