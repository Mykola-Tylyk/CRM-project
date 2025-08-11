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

export type { IComment, ICommentCreateDTO };
