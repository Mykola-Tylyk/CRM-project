import "./TableOrderPage.css";

import { useState } from "react";

import { CommentsModal } from "../../components/comments-modal/CommentsModal";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Pagination } from "../../components/paginations/Pagination";
import { TableOrders } from "../../components/table-orders/TableOrders";
import { ToolbarOrder } from "../../components/toolbarOrder/ToolbarOrder";
import { useAppSelector } from "../../redux/hooks/useAppSelector";

const TableOrdersPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const {
        orders: { totalPages },
    } = useAppSelector((state) => state.orderSlice);

    return (
        <div className={"grid__table_orders_page"}>
            <header className="header_fixed_table_orders_page">
                <Header />
            </header>
            <div className={"toolbar_fixed__table_orders_page"}>
                <ToolbarOrder />
            </div>
            <div className={"table_scroll__table_orders_page"}>
                <TableOrders
                    onCommentsClick={(id) => {
                        setSelectedOrderId(id);
                        setShowModal(true);
                    }}
                />
            </div>
            <div className={"pagination_fixed__table_orders_page"}>
                <Pagination totalPages={totalPages} />
            </div>
            <footer className="footer_fixed__table_orders_page">
                <Footer />
            </footer>
            {showModal && (
                <CommentsModal
                    onClose={() => setShowModal(false)}
                    selectedOrderId={selectedOrderId}
                />
            )}
        </div>
    );
};

export { TableOrdersPage };
