import "./TableOrderPage.css";

import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Pagination } from "../../components/paginations/Pagination";
import { TableOrders } from "../../components/table-orders/TableOrders";
import { ToolbarOrder } from "../../components/toolbarOrder/ToolbarOrder";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
// import { ErrorPage } from "../error-page/ErrorPage";

const TableOrdersPage = () => {
    const {
        orders: { totalPages },
        // errorMessage,
    } = useAppSelector((state) => state.orderSlice);

    // if (errorMessage) {
    //     return <ErrorPage errorMessage={errorMessage} />;
    // }

    return (
        <div className={"grid__table_orders_page"}>
            <header className="header_fixed_table_orders_page">
                <Header />
            </header>
            <div className={"toolbar_fixed__table_orders_page"}>
                <ToolbarOrder />
            </div>
            <div className={"table_scroll__table_orders_page"}>
                <TableOrders />
            </div>
            <div className={"pagination_fixed__table_orders_page"}>
                <Pagination totalPages={totalPages} />
            </div>
            <footer className="footer_fixed__table_orders_page">
                <Footer />
            </footer>
        </div>
    );
};

export { TableOrdersPage };
