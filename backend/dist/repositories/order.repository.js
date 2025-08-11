import { Order } from "../models/order.model";
class OrderRepository {
    getAll() {
        return Order.find();
    }
    getById(id) {
        return Order.findById(id);
    }
}
export const orderRepository = new OrderRepository();
