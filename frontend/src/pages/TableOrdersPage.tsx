import { Pagination } from "../components/paginations/Pagination";
import { TableOrders } from "../components/table-orders/TableOrders";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { ErrorPage } from "./ErrorPage";

const TableOrdersPage = () => {
    const {
        orders: { totalPages },
        hasError,
    } = useAppSelector((state) => state.orderSlice);

    if (hasError) {
        return <ErrorPage />;
    }

    return (
        <div>
            <TableOrders />
            <Pagination totalPages={totalPages} />
        </div>
    );
};

export { TableOrdersPage };
