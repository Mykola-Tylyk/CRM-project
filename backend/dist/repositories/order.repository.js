import { Order } from "../models/order.model";
class OrderRepository {
    getAll() {
        return Order.find();
    }
}
export const orderRepository = new OrderRepository();
