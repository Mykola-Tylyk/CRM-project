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
        searchCourse: joi
            .string()
            .trim()
            .valid("FS", "QACX", "JCX", "JSCX", "FE", "PCX")
            .insensitive()
            .messages({
                "any.only":
                    "The course can only be one of: FS, QACX, JCX, JSCX, FE, PCX",
                "string.base": "The course must be a string",
            }),
        searchFormat: joi
            .string()
            .trim()
            .valid("static", "online")
            .insensitive()
            .messages({
                "any.only":
                    "The course_format can only be one of: static, online",
                "string.base": "The course_format must be a string",
            }),
        searchType: joi
            .string()
            .trim()
            .valid("pro", "minimal", "premium", "incubator", "vip")
            .insensitive()
            .messages({
                "any.only":
                    "The course_format can only be one of: pro, minimal, premium, incubator, vip",
                "string.base": "The course_format must be a string",
            }),
        searchStatus: joi
            .string()
            .trim()
            .valid("in work", "new", "aggre", "disaggre", "dubbing")
            .insensitive()
            .messages({
                "any.only":
                    "The course_format can only be one of: in work, new, aggre, disaggre, dubbing",
                "string.base": "The course_format must be a string",
            }),

        order: joi
            .string()
            .valid(
                ...Object.values(OrderQueryEnum),
                ...Object.values(OrderQueryEnum).map((item) => `-${item}`),
            ),
    });
}
