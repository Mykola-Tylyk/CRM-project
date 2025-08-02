import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { orderRepository } from "../repositories/order.repository";
class OrderService {
    async getAll() {
        const orders = await orderRepository.getAll();
        if (!orders) {
            throw new ApiError("Orders not found", StatusCodesEnum.NOT_FOUND);
        }
        return orders;
    }
}
export const orderService = new OrderService();
