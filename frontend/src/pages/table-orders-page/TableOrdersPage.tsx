import "./TableOrderPage.css";

import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Pagination } from "../../components/paginations/Pagination";
import { TableOrders } from "../../components/table-orders/TableOrders";
import { ToolbarOrder } from "../../components/toolbarOrder/ToolbarOrder";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { ErrorPage } from "../error-page/ErrorPage";

const TableOrdersPage = () => {
    const {
        orders: { totalPages },
        hasError,
    } = useAppSelector((state) => state.orderSlice);

    if (hasError) {
        return <ErrorPage />;
    }

    return (
        <div className={"grid_table_orders_page"}>
            <header className="header_fixed_table_orders_page">
                <Header />
            </header>
            <div className={"toolbar_fixed_table_orders_page"}>
                <ToolbarOrder />
            </div>
            <div className={"table_scroll_table_orders_page"}>
                <TableOrders />
            </div>
            <div className={"pagination_fixed_table_orders_page"}>
                <Pagination totalPages={totalPages} />
            </div>
            <footer className="footer_fixed_table_orders_page">
                <Footer />
            </footer>
        </div>
    );
};

export { TableOrdersPage };
