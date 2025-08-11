import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IComment, ICommentCreateDTO } from "../interfaces/comment.interface";
import { commentRepository } from "../repositories/comment.repository";
import { orderRepository } from "../repositories/order.repository";

class CommentService {
    public async getAll(): Promise<IComment[]> {
        const data = await commentRepository.getAll();

        if (!data) {
            throw new ApiError("Comments not found", StatusCodesEnum.NOT_FOUND);
        }

        return data;
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
