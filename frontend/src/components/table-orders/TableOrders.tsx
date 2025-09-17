import "./TableOrders.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { orderSliceActions } from "../../redux/slices/orderSlice/orderSlice";
import { Preloader } from "../preloader/Preloader";
import { TableOrderRow } from "./TableOrderRow";

const TableOrders = () => {
    const { orders, loadState, order } = useAppSelector(
        (state) => state.orderSlice,
    );
    const dispatch = useAppDispatch();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [query, setQuery] = useSearchParams({ page: "1" });

    const pageSize = 25;
    const page = Number(query.get("page"));
    const isPageValid = Number.isInteger(page) && page > 0;

    useEffect(() => {
        const orderParam = query.get("order") || undefined;

        if (isPageValid) {
            dispatch(
                orderSliceActions.loadOrders({
                    pageSize,
                    page,
                    order: orderParam,
                }),
            );
            dispatch(orderSliceActions.setOrder(orderParam));
        } else {
            dispatch(orderSliceActions.setError("Invalid page parameter"));
        }
    }, [dispatch, page, query]);

    const handleSelect = (id: string) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };

    const handleSort = (column: string) => {
        const currentParams = Object.fromEntries(query.entries());
        const currentOrder = query.get("order");

        let newOrder = column;

        if (currentOrder === column) {
            newOrder = `-${column}`;
        } else if (currentOrder === `-${column}`) {
            newOrder = column;
        }

        setQuery({
            ...currentParams,
            order: newOrder,
        });
    };

    const renderArrow = (column: string) => {
        if (order === column) return "▲";
        if (order === `-${column}`) return "▼";
        return "";
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
                            <th
                                key={index}
                                className={"table_header"}
                                onClick={() => handleSort(column)}
                            >
                                <span className={"table_header_span_column"}>
                                    {column}
                                    <span className={"table_header_span_arrow"}>
                                        {renderArrow(column)}
                                    </span>
                                </span>
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
