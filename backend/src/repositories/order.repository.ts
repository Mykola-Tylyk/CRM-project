import { IOrder } from "../interfaces/order.interface";
import { Order } from "../models/order.model";

class OrderRepository {
    public getAll(): Promise<IOrder[]> {
        return Order.find();
    }

    public getById(id: string): Promise<IOrder> {
        return Order.findById(id);
    }
}

export const orderRepository = new OrderRepository();
