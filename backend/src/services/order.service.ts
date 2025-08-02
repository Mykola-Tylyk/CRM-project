import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IOrder } from "../interfaces/order.interface";
import { orderRepository } from "../repositories/order.repository";

class OrderService {
    public async getAll(): Promise<IOrder[]> {
        const orders = await orderRepository.getAll();

        if (!orders) {
            throw new ApiError("Orders not found", StatusCodesEnum.NOT_FOUND);
        }

        return orders;
    }
}

export const orderService = new OrderService();
