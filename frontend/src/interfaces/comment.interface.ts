import { IBase } from "./base.interface";

interface IComment extends IBase {
    _id: string;
    comments: string[];
    orderId: string;
}

interface ICommentCreateDTO {
    comment: string;
    orderId: string;
}

export type { IComment, ICommentCreateDTO };
