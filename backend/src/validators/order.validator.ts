import joi from "joi";

import { OrderQueryEnum } from "../enums/order-query.enum";

export class OrderValidator {
    public static query = joi.object({
        pageSize: joi.number().min(1).default(25),
        page: joi.number().min(1).default(1),
        searchName: joi.string().trim(),
        searchSurname: joi.string().trim(),
        searchEmail: joi.string().trim(),
        searchPhone: joi.string().trim(),
        searchAge: joi.number().min(1).max(120),
        order: joi
            .string()
            .valid(
                ...Object.values(OrderQueryEnum),
                ...Object.values(OrderQueryEnum).map((item) => `-${item}`),
            ),
    });
}
