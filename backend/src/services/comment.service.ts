import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IComment,
    ICommentCreateDTO,
    ICommentQuery,
    ICommentResponse,
} from "../interfaces/comment.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { commentRepository } from "../repositories/comment.repository";
import { orderRepository } from "../repositories/order.repository";
import { userRepository } from "../repositories/user.repository";
import { orderService } from "./order.service";

class CommentService {
    private mappedData(data: IComment[]) {
        return data.map((c) => ({
            _id: c._id,
            text: c.text,
            user_name: c.userId.name,
            user_surname: c.userId.surname,
            createdAt: c.createdAt,
        }));
    }

    public async getAll(
        query: ICommentQuery,
    ): Promise<IPaginatedResponse<ICommentResponse>> {
        const [data, totalItems] = await commentRepository.getAll(query);

        const newData = this.mappedData(data);

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            data: newData,
        };
    }

    public async create(body: ICommentCreateDTO): Promise<ICommentResponse> {
        const order = await orderRepository.getById(body.orderId);

        if (!order) {
            throw new ApiError("Order not found", StatusCodesEnum.NOT_FOUND);
        }

        const user = await userRepository.getById(body.userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const comment = await commentRepository.create(body);

        const query: ICommentQuery = {
            pageSize: 3,
            page: 1,
            order: "-createdAt",
            orderId: body.orderId,
        };

        const { data } = await this.getAll(query);

        if (!data) {
            throw new ApiError("Comment not found", StatusCodesEnum.NOT_FOUND);
        }

        await orderService.update({
            data: {
                _id: body.orderId,
                user_id: body.userId,
                last_comments: data,
            },
            createComment: true,
        });

        const [mappedData] = this.mappedData([comment]);

        return mappedData;
    }
}

export const commentService = new CommentService();
