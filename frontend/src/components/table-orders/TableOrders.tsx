import { useEffect, useState } from "react";
import { IOrder } from "../../interfaces/order.interface";
import { getAllOrders } from "../../services/order.service";
import { TableOrderRow } from "./TableOrderRow";
import "./TableOrders.css";

const TableOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        getAllOrders().then((data) => setOrders(data));
    }, []);

    const handleSelect = (id: string) => {
        setSelectedId(prev => (prev === id ? null : id));
    };

    const columns = [
        "_id",
        "name",
        "surname",
        "email",
        "phone",
        "age",
        "course",
        "course_format",
        "course_type",
        "status",
        "sum",
        "already_paid",
        "created_at"
    ]

    const colSpanLength = columns.length;

    return (
        <div>
            <table className={"table"}>
                <thead className={"table_thead"}>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className={"table_header"}>
                            {column}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <TableOrderRow
                        key={order._id}
                        order={order}
                        index={index}
                        colSpanLength={colSpanLength}
                        isSelected={selectedId === order._id}
                        onClick={() => handleSelect(order._id)}
                        selectedOrderId={selectedId}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export { TableOrders };
