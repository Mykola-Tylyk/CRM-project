import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class CommentValidator {
    private static comment = joi.string().min(1).max(200).trim();
    private static orderId = joi.string().regex(RegexEnum.OBJECT_ID);

    public static create = joi.object({
        comment: this.comment.required(),
        orderId: this.orderId.required(),
    });
}
