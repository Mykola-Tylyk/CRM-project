import { Types } from "mongoose";

import { IBase } from "./base.interface";

interface IComment extends IBase {
    _id: string;
    comments: string[];
    orderId: Types.ObjectId;
}

interface ICommentCreateDTO {
    comment: string;
    orderId: string;
}

interface ICommentQuery {
    pageSize: number;
    page: number;
}

export type { IComment, ICommentCreateDTO, ICommentQuery };
