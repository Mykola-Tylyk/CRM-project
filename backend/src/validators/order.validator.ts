import joi from "joi";

import { OrderQueryEnum } from "../enums/order-query.enum";
import { RegexEnum } from "../enums/regex.enum";

export class OrderValidator {
    private static _id = joi.string().regex(RegexEnum.OBJECT_ID);
    private static already_paid = joi.number();
    private static age = joi.number().min(1).max(120);
    private static course = joi
        .string()
        .trim()
        .valid("FS", "QACX", "JCX", "JSCX", "FE", "PCX")
        .insensitive()
        .messages({
            "any.only":
                "The course can only be one of: FS, QACX, JCX, JSCX, FE, PCX",
            "string.base": "The course must be a string",
        });
    private static course_format = joi
        .string()
        .trim()
        .valid("static", "online")
        .insensitive()
        .messages({
            "any.only": "The course_format can only be one of: static, online",
            "string.base": "The course_format must be a string",
        });
    private static course_type = joi
        .string()
        .trim()
        .valid("pro", "minimal", "premium", "incubator", "vip")
        .insensitive()
        .messages({
            "any.only":
                "The course_format can only be one of: pro, minimal, premium, incubator, vip",
            "string.base": "The course_format must be a string",
        });
    private static email = joi.string().email().trim();
    private static searchEmail = joi.string().trim();
    private static msg = joi.string();
    private static name = joi.string().trim();
    private static phone = joi.string().trim();
    private static status = joi
        .string()
        .trim()
        .valid("in work", "new", "aggre", "disaggre", "dubbing")
        .insensitive()
        .messages({
            "any.only":
                "The course_format can only be one of: in work, new, aggre, disaggre, dubbing",
            "string.base": "The course_format must be a string",
        });
    private static sum = joi.number();
    private static surname = joi.string().trim();
    private static utm = joi.string();
    private static group = joi.string().max(10);
    private static user_id = joi.string().regex(RegexEnum.OBJECT_ID);

    public static query = joi.object({
        pageSize: joi.number().min(1).default(25),
        page: joi.number().min(1).default(1),
        searchName: this.name,
        searchSurname: this.surname,
        searchEmail: this.searchEmail,
        searchPhone: this.phone,
        searchAge: this.age,
        searchCourse: this.course,
        searchFormat: this.course_format,
        searchType: this.course_type,
        searchStatus: this.status,
        searchGroup: this.group,
        searchMy: this.user_id,
        order: joi
            .string()
            .valid(
                ...Object.values(OrderQueryEnum),
                ...Object.values(OrderQueryEnum).map((item) => `-${item}`),
            ),
    });

    public static queryForExport = joi.object({
        searchName: this.name,
        searchSurname: this.surname,
        searchEmail: this.searchEmail,
        searchPhone: this.phone,
        searchAge: this.age,
        searchCourse: this.course,
        searchFormat: this.course_format,
        searchType: this.course_type,
        searchStatus: this.status,
        searchGroup: this.group,
        searchMy: this.user_id,
        order: joi
            .string()
            .valid(
                ...Object.values(OrderQueryEnum),
                ...Object.values(OrderQueryEnum).map((item) => `-${item}`),
            ),
    });

    public static update = joi.object({
        _id: this._id.required(),
        age: this.age,
        already_paid: this.already_paid,
        course: this.course,
        course_format: this.course_format,
        course_type: this.course_type,
        email: this.email,
        msg: this.msg,
        name: this.name,
        phone: this.phone,
        status: this.status,
        sum: this.sum,
        surname: this.surname,
        utm: this.utm,
        group: this.group,
        user_id: this.user_id,
    });
}
