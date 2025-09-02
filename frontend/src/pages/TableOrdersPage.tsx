import { Pagination } from "../components/paginations/Pagination";
import { TableOrders } from "../components/table-orders/TableOrders";
import { useAppSelector } from "../redux/hooks/useAppSelector";

const TableOrdersPage = () => {
    const totalPages = useAppSelector(
        (state) => state.orderSlice.orders.totalPages,
    );

    return (
        <div>
            <TableOrders />
            <Pagination totalPages={totalPages} />
        </div>
    );
};

export { TableOrdersPage };
