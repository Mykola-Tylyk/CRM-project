import "./TableOrders.css";

import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { orderSliceActions } from "../../redux/slices/orderSlice/orderSlice";
import { Preloader } from "../preloader/Preloader";
import { TableOrderRow } from "./TableOrderRow";

type Props = {
    selectedOrderId: string | null;
    setSelectedOrderId: Dispatch<SetStateAction<string | null>>;
    onCommentsClick: () => void;
    onEditOrdersClick: () => void;
};

const TableOrders: FC<Props> = ({
    selectedOrderId,
    setSelectedOrderId,
    onCommentsClick,
    onEditOrdersClick,
}) => {
    const { user } = useAppSelector((state) => state.authSlice);
    const { orders, loadState, order, trigger } = useAppSelector(
        (state) => state.orderSlice,
    );
    const dispatch = useAppDispatch();
    const [disabledForm, setDisabledForm] = useState<boolean>(true);

    const [query, setQuery] = useSearchParams({
        page: "1",
        order: "-order_number",
    });

    useEffect(() => {
        setSelectedOrderId(null);
    }, [query]);

    const pageSize = 25;
    const page = Number(query.get("page"));
    const isPageValid = Number.isInteger(page) && page > 0;

    const selectedOrder = useMemo(() => {
        return orders.data.find((o) => o._id === selectedOrderId);
    }, [orders.data, selectedOrderId]);

    const status = selectedOrder?.status;
    const userId = selectedOrder?.user_id;

    useEffect(() => {
        if (!status || status === "new") {
            setDisabledForm(false);
        } else if (
            (status !== null && userId === user?._id) ||
            (status !== "new" && userId === user?._id)
        ) {
            setDisabledForm(false);
        } else {
            setDisabledForm(true);
        }
    }, [status, userId]);

    useEffect(() => {
        const orderParam = query.get("order") || undefined;
        const searchParamName = query.get("name") || undefined;
        const searchParamSurname = query.get("surname") || undefined;
        const searchParamEmail = query.get("email") || undefined;
        const searchParamPhone = query.get("phone") || undefined;
        const searchParamAge = query.get("age") || undefined;
        const searchParamCourse = query.get("course") || undefined;
        const searchParamFormat = query.get("course_format") || undefined;
        const searchParamType = query.get("course_type") || undefined;
        const searchParamStatus = query.get("status") || undefined;
        const searchParamGroup = query.get("group") || undefined;
        let searchParamMy = query.get("my") || undefined;

        if (searchParamMy === "true") {
            searchParamMy = user?._id;
        }

        const searchParamStartDate = query.get("start_date") || undefined;
        const searchParamEndDate = query.get("end_date") || undefined;

        const columnMap: Record<string, string> = { manager: "user_name" };

        if (isPageValid) {
            const apiField = orderParam
                ? orderParam.startsWith("-")
                    ? `-${columnMap[orderParam.replace("-", "")] || orderParam.replace("-", "")}`
                    : columnMap[orderParam] || orderParam
                : undefined;

            dispatch(
                orderSliceActions.loadOrders({
                    pageSize,
                    page,
                    order: apiField,
                    name: searchParamName,
                    surname: searchParamSurname,
                    email: searchParamEmail,
                    phone: searchParamPhone,
                    age: Number(searchParamAge),
                    course: searchParamCourse,
                    course_format: searchParamFormat,
                    course_type: searchParamType,
                    status: searchParamStatus,
                    group: searchParamGroup,
                    my: searchParamMy,
                    start_date: searchParamStartDate,
                    end_date: searchParamEndDate,
                }),
            );
            dispatch(orderSliceActions.setOrder(orderParam));
        } else {
            // dispatch(orderSliceActions.setError("Invalid page parameter"));
            setQuery({ page: "1" });
        }
    }, [dispatch, page, query, trigger]);

    const handleSelect = (id: string) => {
        setSelectedOrderId((prev) => (prev === id ? null : id));
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
            page: "1",
        });
    };

    const renderArrow = (column: string) => {
        if (order === column) return "▲";
        if (order === `-${column}`) return "▼";
        return "";
    };

    const columns = [
        "order_number",
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
        "group",
        "created_at",
        "manager",
    ];

    const colSpanLength = columns.length;

    if (!loadState) {
        return <Preloader mode={"global"} />;
    }

    return (
        <div className={"div_wrapper__table_orders"}>
            {orders.data.length !== 0 ? (
                <div className={"grid"}>
                    <table className={"table__table_orders"}>
                        <thead className={"table_thead__table_orders"}>
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={"table_header__table_orders"}
                                        onClick={() => handleSort(column)}
                                    >
                                        <span
                                            className={
                                                "table_header_span_column__table_orders"
                                            }
                                        >
                                            {column}
                                            <span
                                                className={
                                                    "table_header_span_arrow__table_orders"
                                                }
                                            >
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
                                    isSelected={selectedOrderId === order._id}
                                    onClick={() => handleSelect(order._id)}
                                    selectedOrderId={selectedOrderId}
                                    disabledForm={disabledForm}
                                    onCommentsClick={onCommentsClick}
                                    onEditOrdersClick={onEditOrdersClick}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={"div_no_orders__table_orders"}>No orders</div>
            )}
        </div>
    );
};

export { TableOrders };
