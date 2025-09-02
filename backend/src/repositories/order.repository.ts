import { IOrder, IOrderQuery } from "../interfaces/order.interface";
import { Order } from "../models/order.model";

class OrderRepository {
    public getAll(query: IOrderQuery): Promise<[IOrder[], number]> {
        const skip = query.pageSize * (query.page - 1);
        return Promise.all([
            Order.find().limit(query.pageSize).skip(skip),
            Order.find().countDocuments(),
        ]);
    }

    public getById(id: string): Promise<IOrder> {
        return Order.findById(id);
    }
}

export const orderRepository = new OrderRepository();
