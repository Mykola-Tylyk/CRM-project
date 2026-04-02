import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class CommentValidator {
    private static text = joi.string().min(1).max(200).trim();
    private static orderId = joi.string().regex(RegexEnum.OBJECT_ID);
    private static userId = joi.string().regex(RegexEnum.OBJECT_ID);
    private static order = joi.string().valid("createdAt", "-createdAt");

    public static create = joi.object({
        text: this.text.required(),
        orderId: this.orderId.required(),
        userId: this.userId.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).default(25),
        page: joi.number().min(1).default(1),
        order: this.order,
        orderId: this.orderId,
    });
}
