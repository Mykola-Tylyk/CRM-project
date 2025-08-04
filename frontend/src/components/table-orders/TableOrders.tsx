import { useEffect, useState } from "react";
import { IOrder } from "../../interfaces/order.interface";
import { getAllOrders } from "../../services/order.service";
import { TableOrderRow } from "./TableOrderRow";

const TableOrders = () => {

    const [orders, setOrders] = useState<IOrder[]>([]);
    useEffect(() => {
        getAllOrders().then(data => setOrders(data));
    }, []);

    return (
        <div>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead style={{ backgroundColor: "#4CAF50", color: "white" }}>
                <tr>
                    <th style={{ padding: "10px", textAlign: "left" }}>_id</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>name</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>surname</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>email</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>age</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>course</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>course_format</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>course_type</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>status</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>sum</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>already_paid</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>created_at</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => <TableOrderRow key={order._id} order={order} index={index}/>)}
                </tbody>
            </table>
        </div>
    );
};

export { TableOrders };