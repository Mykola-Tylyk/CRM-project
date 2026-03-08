import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IOrder, IOrderQuery } from "../interfaces/order.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { orderRepository } from "../repositories/order.repository";

class OrderService {
    public async getAll(
        query: IOrderQuery,
    ): Promise<IPaginatedResponse<IOrder>> {
        const [data, totalItems] = await orderRepository.getAll(query);

        if (!data || data.length === 0) {
            throw new ApiError("Orders not found", StatusCodesEnum.NOT_FOUND);
        }

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            data,
        };
    }
}

export const orderService = new OrderService();
