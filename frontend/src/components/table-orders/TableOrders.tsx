import "./TableOrders.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { orderSliceActions } from "../../redux/slices/orderSlice/orderSlice";
import { Preloader } from "../preloader/Preloader";
import { TableOrderRow } from "./TableOrderRow";

const TableOrders = () => {
    const { orders, loadState } = useAppSelector((state) => state.orderSlice);
    const dispatch = useAppDispatch();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [query] = useSearchParams({ page: "1" });

    const pageSize = 25;
    const page = Number(query.get("page"));

    useEffect(() => {
        if (page) {
            dispatch(orderSliceActions.loadOrders({ pageSize, page }));
        }
    }, [dispatch, page]);

    const handleSelect = (id: string) => {
        setSelectedId((prev) => (prev === id ? null : id));
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
        "created_at",
    ];

    const colSpanLength = columns.length;

    if (!loadState) {
        return <Preloader />;
    }

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
                    {orders.data.map((order, index) => (
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
