import { IOrder } from "../interfaces/order.interface";
import { Order } from "../models/order.model";

class OrderRepository {
    public getAll(): Promise<IOrder[]> {
        return Order.find();
    }
}

export const orderRepository = new OrderRepository();
