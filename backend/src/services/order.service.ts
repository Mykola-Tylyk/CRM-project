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

        if (!data) {
            throw new ApiError("Orders not found", StatusCodesEnum.NOT_FOUND);
        }

        // if (totalItems < query.pageSize) {
        //     throw new ApiError(
        //         `The specified page size orders ${query.pageSize} must be less than total items ${totalItems}`,
        //         StatusCodesEnum.BAD_REQUEST,
        //     );
        // }

        const totalPages = Math.ceil(totalItems / query.pageSize);

        // if (totalPages < query.page) {
        //     throw new ApiError(
        //         `The specified orders page ${query.page} must be less than total pages ${totalPages}`,
        //         StatusCodesEnum.BAD_REQUEST,
        //     );
        // }

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
