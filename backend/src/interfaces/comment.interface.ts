import { Types } from "mongoose";

import { IBase } from "./base.interface";

interface IComment extends IBase {
    _id: string;
    orderId: Types.ObjectId;
    text: string;
    userId: {
        _id: Types.ObjectId;
        name: string;
        surname: string;
    };
}

interface ICommentResponse {
    _id: string;
    text: string;
    user_name: string;
    user_surname: string;
    createdAt: Date;
}

interface ICommentCreateDTO {
    text: string;
    orderId: string;
    userId: string;
}

interface ICommentQuery {
    pageSize: number;
    page: number;
    order?: string;
    orderId?: string;
}

export type { IComment, ICommentCreateDTO, ICommentQuery, ICommentResponse };
