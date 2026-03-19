import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
    private static pageSize = joi.number().min(1).default(25);
    private static page = joi.number().min(1).default(1);
    private static order = joi.string().valid("createdAt", "-createdAt");
    private static name = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static email = joi.string().email().trim();

    public static create = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        email: this.email.required(),
    });

    public static query = joi.object({
        pageSize: this.pageSize,
        page: this.page,
        order: this.order,
    });
}
