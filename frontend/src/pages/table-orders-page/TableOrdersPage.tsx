import "./TableOrderPage.css";

import { useState } from "react";

import { CommentsModal } from "../../components/comments-modal/CommentsModal";
import { EditOrdersModal } from "../../components/edit-orders-modal/EditOrdersModal";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Pagination } from "../../components/paginations/Pagination";
import { TableOrders } from "../../components/table-orders/TableOrders";
import { ToolbarOrder } from "../../components/toolbarOrder/ToolbarOrder";
import { useAppSelector } from "../../redux/hooks/useAppSelector";

const TableOrdersPage = () => {
    const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);
    const [showEditOrdersModal, setShowEditOrdersModal] =
        useState<boolean>(false);
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
                    selectedOrderId={selectedOrderId}
                    setSelectedOrderId={setSelectedOrderId}
                    onCommentsClick={() => setShowCommentsModal(true)}
                    onEditOrdersClick={() => setShowEditOrdersModal(true)}
                />
            </div>
            <div className={"pagination_fixed__table_orders_page"}>
                <Pagination totalPages={totalPages} />
            </div>
            <footer className="footer_fixed__table_orders_page">
                <Footer />
            </footer>
            {showCommentsModal && selectedOrderId && (
                <CommentsModal
                    onClose={() => setShowCommentsModal(false)}
                    selectedOrderId={selectedOrderId}
                />
            )}
            {showEditOrdersModal && selectedOrderId && (
                <EditOrdersModal
                    onClose={() => setShowEditOrdersModal(false)}
                    selectedOrderId={selectedOrderId}
                />
            )}
        </div>
    );
};

export { TableOrdersPage };
