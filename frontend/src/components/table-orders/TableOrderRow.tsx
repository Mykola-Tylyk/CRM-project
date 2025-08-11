import { FC, useState } from "react";
import { IOrder } from "../../interfaces/order.interface";
import "./TableOrderRow.css";
import { CommentsList } from "../comments/CommentsList";

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

    const tableRowHoveredOrSelected = `
     row_style 
         ${index % 2 === 0 ? "even" : "odd"} 
         ${isHovered ? "hovered" : ""} 
         ${isSelected ? "selected" : ""}
        `;

    const openDataWindowInTable = `
    table_data
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
                <td className={"table_data"}>{displayValue(order._id)}</td>
                <td className={"table_data"}>{displayValue(order.name)}</td>
                <td className={"table_data"}>{displayValue(order.surname)}</td>
                <td className={"table_data"}>{displayValue(order.email)}</td>
                <td className={"table_data"}>{displayValue(order.phone)}</td>
                <td className={"table_data"}>{displayValue(order.age)}</td>
                <td className={"table_data"}>{displayValue(order.course)}</td>
                <td className={"table_data"}>{displayValue(order.course_format)}</td>
                <td className={"table_data"}>{displayValue(order.course_type)}</td>
                <td className={"table_data"}>{displayValue(order.status)}</td>
                <td className={"table_data"}>{displayValue(order.sum)}</td>
                <td className={"table_data"}>{displayValue(order.already_paid)}</td>
                <td className={"table_data"}>
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                    })}
                </td>
            </tr>
            {isSelected && (
                <tr>
                    <td colSpan={colSpanLength} className={openDataWindowInTable}>
                        <div className={"div_wrapper_open_data_window"}>
                            <div>
                                <div className={"div_message_utm_open_data_window"}>Message: {displayValue(order.msg)}</div>
                                <div className={"div_message_utm_open_data_window"}>UTM: {displayValue(order.utm)}</div>
                            </div>
                            <div className={"div_wrapper_comments_list_open_data_window"}>
                                <CommentsList selectedOrderId={selectedOrderId} />
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export { TableOrderRow };
