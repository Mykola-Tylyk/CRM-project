import { FilterQuery, Types } from "mongoose";

import {
    IComment,
    ICommentCreateDTO,
    ICommentQuery,
} from "../interfaces/comment.interface";
import { Comment } from "../models/comment.model";

class CommentRepository {
    public getAll(query: ICommentQuery): Promise<[IComment[], number]> {
        const skip = query.pageSize * (query.page - 1);

        const filterObject: FilterQuery<IComment> = {};

        if (query.orderId) {
            filterObject.orderId = new Types.ObjectId(query.orderId);
        }

        return Promise.all([
            Comment.find(filterObject)
                .populate("userId", "name surname")
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order),
            Comment.find(filterObject).countDocuments(),
        ]);
    }

    public create(comment: ICommentCreateDTO): Promise<IComment> {
        return Comment.create({
            text: comment.text,
            orderId: comment.orderId,
            userId: comment.userId,
        });
    }
}

export const commentRepository = new CommentRepository();
