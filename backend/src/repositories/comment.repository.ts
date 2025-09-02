import { FilterQuery } from "mongoose";

import {
    IComment,
    ICommentCreateDTO,
    ICommentQuery,
} from "../interfaces/comment.interface";
import { Comment } from "../models/comment.model";

class CommentRepository {
    public getAll(query: ICommentQuery): Promise<[IComment[], number]> {
        const skip = query.pageSize * (query.page - 1);
        return Promise.all([
            Comment.find().limit(query.pageSize).skip(skip),
            Comment.find().countDocuments(),
        ]);
    }

    public create(comment: ICommentCreateDTO): Promise<IComment> {
        return Comment.create({
            comments: [comment.comment],
            orderId: comment.orderId,
        });
    }

    public getOne(filter: FilterQuery<IComment>): Promise<IComment> {
        return Comment.findOne(filter);
    }

    public addComment(commentId: string, comment: string): Promise<IComment> {
        return Comment.findByIdAndUpdate(
            commentId,
            {
                $addToSet: {
                    comments: comment,
                },
            },
            { new: true },
        );
    }
}

export const commentRepository = new CommentRepository();
