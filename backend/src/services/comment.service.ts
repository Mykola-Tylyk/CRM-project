import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IComment,
    ICommentCreateDTO,
    ICommentQuery,
} from "../interfaces/comment.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { commentRepository } from "../repositories/comment.repository";
import { orderRepository } from "../repositories/order.repository";

class CommentService {
    public async getAll(
        query: ICommentQuery,
    ): Promise<IPaginatedResponse<IComment>> {
        const [data, totalItems] = await commentRepository.getAll(query);

        if (!data) {
            throw new ApiError("Comments not found", StatusCodesEnum.NOT_FOUND);
        }

        if (totalItems < query.pageSize) {
            throw new ApiError(
                `The specified page size comments ${query.pageSize} must be less than total items ${totalItems}`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        const totalPages = Math.ceil(totalItems / query.pageSize);

        if (totalPages < query.page) {
            throw new ApiError(
                `The specified comments page ${query.page} must be less than total pages ${totalPages}`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            data,
        };
    }
    public async getByOrderId(orderId: string): Promise<IComment> {
        const order = await orderRepository.getById(orderId);

        if (!order) {
            throw new ApiError("Order not found", StatusCodesEnum.NOT_FOUND);
        }

        return await commentRepository.getOne({
            orderId: orderId,
        });
    }

    public async create(body: ICommentCreateDTO): Promise<IComment> {
        const order = await orderRepository.getById(body.orderId);

        if (!order) {
            throw new ApiError("Order not found", StatusCodesEnum.NOT_FOUND);
        }

        const commentByOrderId = await commentRepository.getOne({
            orderId: body.orderId,
        });

        if (!commentByOrderId) {
            const data = await commentRepository.create(body);

            if (!data) {
                throw new ApiError(
                    "Comment not created",
                    StatusCodesEnum.BAD_REQUEST,
                );
            }

            return data;
        }

        return await commentRepository.addComment(
            commentByOrderId._id,
            body.comment,
        );
    }
}

export const commentService = new CommentService();
